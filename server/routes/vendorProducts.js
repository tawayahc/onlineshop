const express = require('express');
const connection = require('../db');

const router = express.Router();

router.post('/add', function (req, res, next) {
    const newProduct = {
        ProductName: req.body.ProductName,
        Price: req.body.Price,
        QuantityAvailable: req.body.QuantityAvailable,
        ProductCategoryID: req.body.ProductCategoryID,
        Productimagecode: req.body.Productimagecode,
        ProductimageName: req.body.ProductimageName
    };
  
    connection.query(
        'INSERT INTO `product`(ProductName, Price, QuantityAvailable, ProductCategoryID) VALUES (?, ?, ?, ?)',
        [newProduct.ProductName, newProduct.Price, newProduct.QuantityAvailable, newProduct.ProductCategoryID],
        function(err, results) {
            if (err) {
                return res.json({ status: 'error', message: err });
            }
            const insertedProductId = results.insertId;
            connection.query(
                'INSERT INTO `productimage`(ProductID, Productimagecode, ProductimageName) VALUES (?, ?, ?)',
                [insertedProductId, newProduct.Productimagecode, newProduct.ProductimageName],
                function(err, results) {
                    if (err) {
                        return res.json({ status: 'error', message: err });
                    }
                    const insertedProduct = {
                        ...newProduct,
                        ProductID: insertedProductId
                    };
                    return res.json({ status: 'ok', message: 'Product added successfully', product: insertedProduct });
                }
            );
        }
    );
});

router.get('/see', (req, res) => {
    const { search, sortBy, sortOrder } = req.query;
  
    let query = `
      SELECT p.*, pc.ProductCategoryName, pi.ProductImageID, pi.ProductimageName, pi.Productimagecode
      FROM product p
      INNER JOIN productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
      LEFT JOIN productimage pi ON p.ProductID = pi.ProductID
    `;
  
    if (search) {
      query += `
        WHERE p.ProductName LIKE '%${search}%'
        OR pc.ProductCategoryName LIKE '%${search}%'
      `;
    }
  
    if (sortBy) {
      const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
      query += ` ORDER BY ${sortBy} ${order}`;
    }
  
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      const productsWithImages = results.reduce((acc, row) => {
        const productId = row.ProductID;
        if (!acc[productId]) {
          acc[productId] = {
            ProductID: row.ProductID,
            ProductName: row.ProductName,
            ProductDescription: row.ProductDescription,
            Price: row.Price,
            QuantityAvailable: row.QuantityAvailable,
            RatingAvg: row.RatingAvg,
            Date: row.Date,
            ProductCategoryID: row.ProductCategoryID,
            ShopID: row.ShopID,
            PromotionID: row.PromotionID,
            StaffID: row.StaffID,
            ProductCategoryName: row.ProductCategoryName,
            Published: row.Published,
            ProductImages: []
          };
        }
        if (row.ProductImageID) {
          acc[productId].ProductImages.push({
            ProductImageID: row.ProductImageID,
            ProductimageName: row.ProductimageName,
            Productimagecode: row.Productimagecode
          });
        }
        return acc;
      }, {});
  
      const productList = Object.values(productsWithImages);
      res.json(productList);
    });
  });

router.get('/category-see', function (req, res, next) {
    connection.query(
        'SELECT * FROM ProductCategory',
        function(err, results, fields) {
            res.json(results);
        }
    );
});

router.get('/see-one', function (req, res, next) {
    const newProduct = {
        ProductID: ProductID,
    };
    connection.query(
        'SELECT * FROM `product` WHERE Id = ?',
        [newProduct.ProductID],
        function(err, results, fields) {
            res.json(results);
        }
    );
});

router.put('/update', function (req, res, next) {
  const newProduct = {
      ProductName: req.body.ProductName,
      Price: req.body.Price,
      QuantityAvailable: req.body.QuantityAvailable,
      ProductID: req.body.ProductID,
      ProductCategoryID: req.body.ProductCategoryID,
      Published: req.body.Published
  };

  connection.query(
      'UPDATE `product` SET ProductName = ?, Price = ?, QuantityAvailable = ?, ProductCategoryID = ?, Published = ? WHERE ProductID = ?',
      [newProduct.ProductName, newProduct.Price, newProduct.QuantityAvailable, newProduct.ProductCategoryID, newProduct.Published, newProduct.ProductID],
      function(err, results) {
          if (err) {
              res.json({ status: 'error', message: err });
          } else {
              res.json({ status: 'ok', message: 'Product updated successfully' });
          }
      }
  );
});

router.delete('/delete', function (req, res, next) {
    const productIDs = req.body.productIDs;
    connection.query(
        'DELETE FROM `product` WHERE ProductID IN (?)',
        [productIDs],
        function(err, results) {
            if (err) {
                res.json({ status: 'error', message: err });
            } else {
                res.json({ status: 'ok', message: 'Products deleted successfully' });
            }
        }
    );
});

// Add Image Route
router.post('/add-image', function (req, res, next) {
    const { productId, imageUrl } = req.body;
    console.log('add-image', productId, imageUrl);
    connection.query(
        'INSERT INTO `productimage` (ProductID, Productimagecode) VALUES (?, ?)',
        [productId, imageUrl],
        function(err, results) {
            if (err) {
                return res.json({ status: 'error', message: err });
            }
            const insertedImage = {
                ProductImageID: results.insertId,
                ProductID: productId,
                Productimagecode: imageUrl,
            };
            return res.json({ status: 'ok', message: 'Image added successfully', image: insertedImage });
        }
    );
});

// Remove Image Route
router.delete('/remove-image', function (req, res, next) {
    const { imageId } = req.body;
    connection.query(
        'DELETE FROM `productimage` WHERE ProductImageID = ?',
        [imageId],
        function(err, results) {
            if (err) {
                return res.json({ status: 'error', message: err });
            }
            return res.json({ status: 'ok', message: 'Image removed successfully' });
        }
    );
});

module.exports = router;
