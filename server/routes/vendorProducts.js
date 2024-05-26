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
    };
  
    connection.query(
        'INSERT INTO `product`(ProductName, Price, QuantityAvailable, ProductCategoryID) VALUES (?, ?, ?, ?)',
        [newProduct.ProductName, newProduct.Price, newProduct.QuantityAvailable, newProduct.ProductCategoryID],
        function(err, results) {
            if (err) {
                return res.json({ status: 'error', message: err });
            }
            const insertedProductId = results.insertId;
            const insertedProduct = {
                ...newProduct,
                ProductID: insertedProductId
            };
            return res.json({ status: 'ok', message: 'Product added successfully', product: insertedProduct });
        }
    );
});

router.get('/see', function (req, res, next) {
  connection.query(
    'SELECT p.*, pc.ProductCategoryName, pi.ProductImageID, pi.ProductImageBlob ' +
    'FROM product p ' +
    'INNER JOIN productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID ' +
    'LEFT JOIN productimage pi ON p.ProductID = pi.ProductID ' +
    'GROUP BY p.ProductID, pi.ProductImageID',
    function (err, results, fields) {
      if (err) {
        return res.json({ status: 'error', message: err });
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
            ProductImageBlob: row.ProductImageBlob ? row.ProductImageBlob.toString('base64') : null
          });
        }
        return acc;
      }, {});

      const productList = Object.values(productsWithImages);
      res.json(productList);
    }
  );
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
    console.log('Deleting products with IDs:', productIDs);
    connection.query(
      'DELETE FROM `product` WHERE ProductID IN (?)',
      [productIDs],
      function (err, results) {
        if (err) {
          console.error('Error deleting products:', err);
          res.json({ status: 'error', message: err });
        } else {
          console.log('Delete results:', results);
          res.json({ status: 'ok', message: 'Products deleted successfully' });
        }
      }
    );
  });
  
  router.post('/add-image', function (req, res, next) {
    const { productId, imageUrl, imageBlob } = req.body;
  
    if (!productId || !imageBlob) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }
  
    try {
      const imageBuffer = Buffer.from(imageBlob, 'base64');
      connection.query(
        'INSERT INTO `productimage` (ProductID, ProductImageBlob) VALUES (?, ?)',
        [productId, imageBuffer],
        function (err, results) {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ status: 'error', message: err.message });
          }
          const insertedImage = {
            ProductImageID: results.insertId,
            ProductID: productId,
            ProductImageBlob: imageBlob,
          };
          return res.json({ status: 'ok', message: 'Image added successfully', image: insertedImage });
        }
      );
    } catch (error) {
      console.error('Error processing image:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to process image' });
    }
  });

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
