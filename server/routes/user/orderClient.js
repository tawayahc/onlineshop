const express = require('express');
const router = express.Router();
const connection = require('../../db');

// Get orders for a user
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    "SELECT * FROM `orders` WHERE ClientID = ?",
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: results });
    }
  );
});

// Process orde
router.post("/checkout", async (req, res) => {
  const { userId, selectedAddress, selectedPayment, cart, status, expectedDate } = req.body;
  console.log(req.body);
  console.log(selectedPayment);
  console.log(selectedAddress);
  // Start a transaction
  connection.beginTransaction(err => {
    if (err) {
      return res.json({ status: 'error', message: err });
    }

    // Insert order
    const insertOrderQuery = `
      INSERT INTO orders (ClientID, Status, ExpectedDate, ShippingAddressID, PaymentMethodID) 
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.execute(insertOrderQuery, [userId, status, expectedDate, selectedAddress.ShippingAddressID, selectedPayment.PaymentMethodID], (err, results) => {
      if (err) {
        return connection.rollback(() => {
          res.json({ status: 'error', message: err });
        });
      }

      const orderId = results.insertId;

      // Insert order items
      const insertOrderItemsQuery = `
        INSERT INTO orderitem (ProductID, OrderID, Count) 
        VALUES ?
      `;
      const orderItems = cart.map(item => [item.ProductID, orderId, item.Count]);

      connection.query(insertOrderItemsQuery, [orderItems], (err, results) => {
        if (err) {
          return connection.rollback(() => {
            res.json({ status: 'error', message: err });
          });
        }

        // Delete cart items
        const cartId = cart[0].CartID;  // Assuming all items in the cart have the same CartID
        const deleteCartItemsQuery = `
          DELETE FROM cartitem 
          WHERE CartID = ?
        `;

        connection.query(deleteCartItemsQuery, [cartId], (err, results) => {
          if (err) {
            return connection.rollback(() => {
              res.json({ status: 'error', message: err });
            });
          }

          // Delete the cart
          const deleteCartQuery = `
            DELETE FROM cart 
            WHERE CartID = ?
          `;

          connection.query(deleteCartQuery, [cartId], (err, results) => {
            if (err) {
              return connection.rollback(() => {
                res.json({ status: 'error', message: err });
              });
            }

            // Commit the transaction
            connection.commit(err => {
              if (err) {
                return connection.rollback(() => {
                  res.json({ status: 'error', message: err });
                });
              }

              res.json({ status: 'ok', message: 'Order and order items created successfully, cart cleared' });
            });
          });
        });
      });
    });
  });
});


module.exports = router;
