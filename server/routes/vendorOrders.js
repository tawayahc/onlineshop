const express = require('express');
const connection = require('../db');

const router = express.Router();

router.get('/see', function (req, res, next) {
  const { searchTerm, selectedStatus, sortBy } = req.query;

  let query = `
    SELECT orders.OrderID, orders.Status, orders.ExpectedDate, orders.totalprice AS OrderTotalPrice,
           orderitem.ProductID, orderitem.Quantity, orderitem.totalprice AS ItemTotalPrice,
           product.ProductName, product.Price, productimage.Productimageblob,
           client.FirstName, client.LastName
    FROM orders 
    LEFT JOIN orderitem ON orders.OrderID = orderitem.OrderID 
    LEFT JOIN product ON orderitem.ProductID = product.ProductID 
    LEFT JOIN productimage ON product.ProductID = productimage.ProductID
    LEFT JOIN client ON orders.ClientID = client.ClientID
  `;

  let conditions = [];
  let params = [];

  if (selectedStatus && selectedStatus !== 'All') {
    conditions.push('orders.Status = ?');
    params.push(selectedStatus);
  }

  if (searchTerm) {
    conditions.push('(orders.ExpectedDate LIKE ? OR product.ProductName LIKE ? OR CONCAT(client.FirstName, " ", client.LastName) LIKE ?)');
    params.push(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  switch (sortBy) {
    case 'orderIdAsc':
      query += ' ORDER BY orders.OrderID ASC';
      break;
    case 'orderIdDesc':
      query += ' ORDER BY orders.OrderID DESC';
      break;
    case 'dateAsc':
      query += ' ORDER BY orders.ExpectedDate ASC';
      break;
    case 'dateDesc':
      query += ' ORDER BY orders.ExpectedDate DESC';
      break;
    default:
      query += ' ORDER BY orders.OrderID ASC';
  }

  connection.query(query, params, function (err, results) {
    if (err) {
      return res.json({ status: 'error', message: err });
    }

    const orders = results.reduce((acc, row) => {
      const orderId = row.OrderID;
      if (!acc[orderId]) {
        acc[orderId] = {
          id: row.OrderID,
          status: row.Status,
          expectedDate: row.ExpectedDate,
          totalprice: row.OrderTotalPrice,
          customer: `${row.FirstName} ${row.LastName}`,
          products: []
        };
      }
      if (row.ProductID) {
        const productIndex = acc[orderId].products.findIndex(product => product.id === row.ProductID);
        if (productIndex > -1) {
          // Product already exists, just add the image blob
          acc[orderId].products[productIndex].images.push(row.Productimageblob ? row.Productimageblob.toString('base64') : null);
        } else {
          // Add new product with images array
          acc[orderId].products.push({
            id: row.ProductID,
            name: row.ProductName,
            price: row.Price,
            totalprice: row.ItemTotalPrice,
            images: [row.Productimageblob ? row.Productimageblob.toString('base64') : null],
            quantity: row.Quantity
          });
        }
      }
      return acc;
    }, {});

    res.json(Object.values(orders));
  });
});

router.put('/update', function (req, res, next) {
  const { orderId, status } = req.body;
  connection.query(
    'UPDATE orders SET Status = ? WHERE OrderID = ?',
    [status, orderId],
    function (err) {
      if (err) {
        return res.json({ status: 'error', message: err });
      }
      res.json({ status: 'ok', message: 'Order status updated successfully' });
    }
  );
});

router.delete('/delete', function (req, res, next) {
  const orderIDs = req.body.orderIDs;
  connection.query(
    'DELETE FROM orders WHERE OrderID IN (?)',
    [orderIDs],
    function (err) {
      if (err) {
        return res.json({ status: 'error', message: err });
      }
      res.json({ status: 'ok', message: 'Orders deleted successfully' });
    }
  );
});

module.exports = router;
