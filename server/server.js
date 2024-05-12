var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'onlineshop-login'

var app = express();

app.use(cors());


// create application/json parser
var jsonParser = bodyParser.json();

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'onlineshop'
});
 
app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'INSERT INTO `users` (email, password, fname, lname) VALUES (?, ?, ?, ?)',
            [req.body.email, hash, req.body.fname, req.body.lname],
            function(err, results, fields) {
                if (err) {
                    res.json({status: 'error', message: err});
                    return
                }
                res.json({status: 'ok'})
            }
        );
    });
});

app.post('/login', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM `users` WHERE email = ?',
        [req.body.email],
        function(err, users, fields) {
            if (err) {
                res.json({status: 'error', message: err});
                return;
            }
            if (users.length == 0) {
                res.json({status: 'error', message: 'no user found'});
                return;
            }
            bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
                    res.json({status: 'ok', message: 'login success', token});
                } else {
                    res.json({status: 'error', message: 'login failed'});
                }
            });
        }
    );
});

app.post('/authentication', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, secret);
        res.json({status: 'ok', decoded: decoded});
    } catch (err) {
        res.json({status: 'error', message: err.message});
    }
    
});

// app.post('/add', jsonParser, function (req, res, next) {
//     const newProduct = {
//         ProductID: ProductID,
//         ProductName: ProductName,
//         Price: Price,
//         QuantityAvailable: QuantityAvailable,
//     };

//     connection.query(
//         'INSERT INTO `product`(ProductID, ProductName, 	Price, QuantityAvailable) VALUES (?, ?, ?, ?)',
//         [newProduct.ProductID, newProduct.ProductName, newProduct.Price, newProduct.QuantityAvailable],
//         function(err, results) {
//           res.json(results);
//         }
//       );
// })
// 'INSERT INTO `product`(ProductName, Price, QuantityAvailable, ProductCategoryID) VALUES (?, ?, ?, ?)',
//  [newProduct.ProductName, newProduct.Price, newProduct.QuantityAvailable, newProduct.ProductCategoryID],

app.post('/add', jsonParser, function (req, res, next) {
  const newProduct = {
      ProductName: req.body.ProductName,
      Price: req.body.Price,
      QuantityAvailable: req.body.QuantityAvailable,
      ProductCategoryID: req.body.ProductCategoryID,
      Productimagecode: req.body.Productimagecode
  };

  connection.query(
      'INSERT INTO `product`(ProductName, Price, QuantityAvailable, ProductCategoryID) VALUES (?, ?, ?, ?)',
      [newProduct.ProductName, newProduct.Price, newProduct.QuantityAvailable, newProduct.ProductCategoryID],
      function(err, results) {
          if (err) {
              return res.json({ status: 'error', message: err });
          }
          connection.query(
              'INSERT INTO `productimage`(Productimagecode) VALUES (?)',
              [newProduct.Productimagecode],
              function(err, results) {
                  if (err) {
                      return res.json({ status: 'error', message: err });
                  }
                  const insertedProduct = {
                      ...newProduct
                  };
                  return res.json({ status: 'ok', message: 'Product added successfully', product: insertedProduct });
              }
          );
      }
  );
});

app.post('/add-image', jsonParser, function (req, res, next) {
  const newProduct = {
    Productimagecode: req.body.Productimagecode
  };

  connection.query(
    'INSERT INTO `productimage`(Productimagecode) VALUES (?)',
    [newProduct.Productimagecode],
    function(err, results) {
        if (err) {
            res.json({ status: 'error', message: err });
        } else {
            res.json({ status: 'ok', message: 'Product image added successfully'});
        }
    }
  );
})


// app.get('/see', function (req, res, next) {
//     connection.query(
//       'SELECT * FROM `product`',
//       function(err, results, fields) {
//         res.json(results);
//       }
//     );
// })

app.get('/see', function (req, res, next) {
  connection.query(
    'SELECT product.*, productcategory.*, productimage.ProductImageID, productimage.ProductimageName, productimage.Productimagecode ' +
    'FROM product ' +
    'INNER JOIN productcategory ON product.productcategoryid = productcategory.productcategoryid ' +
    'LEFT JOIN productimage ON product.productid = productimage.productid ' +
    'GROUP BY product.productid, productimage.ProductImageID',
    function(err, results, fields) {
      if (err) {
        res.json({status: 'error', message: err});
      } else {
        const productsWithImages = results.reduce((acc, row) => {
          const productId = row.ProductID;
          if (!acc[productId]) {
            acc[productId] = {
              ...row,
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
      }
    }
  );
});

app.get('/category-see', function (req, res, next) {
    connection.query(
        'SELECT * FROM ProductCategory',
        function(err, results, fields) {
          res.json(results);
        }
      );
})

app.get('/see-one', jsonParser, function (req, res, next) {
    const newProduct = {
        ProductID: ProductID,
    };
    connection.query(
      'SELECT * FROM `product` WHERE Id = ?',
      [newProduct.ProductID],
      function(err, results, fields) {
          res.json(results);
      }
    )
})

app.put('/update', jsonParser, function (req, res, next) {
    const newProduct = {
        ProductName: req.body.ProductName,
        Price: req.body.Price,
        QuantityAvailable: req.body.QuantityAvailable,
        ProductID: req.body.ProductID,
        ProductCategoryID: req.body.ProductCategoryID
    };
    console.log(newProduct.ProductCategoryID);

    connection.query(
        'UPDATE `product` SET ProductName = ?, Price = ?, QuantityAvailable = ?, ProductCategoryID = ? WHERE ProductID = ?',
        [newProduct.ProductName, newProduct.Price, newProduct.QuantityAvailable, newProduct.ProductCategoryID, newProduct.ProductID],
        function(err, results) {
            if (err) {
                res.json({status: 'error', message: err});
            } else {
                res.json({status: 'ok', message: 'Product updated successfully'});
            }
        }
    );
});


// app.put('/update', jsonParser, function (req, res, next) {
//     const newProduct = {
//         ProductName: req.body.ProductName,
//         Price: req.body.Price,
//         QuantityAvailable: req.body.QuantityAvailable,
//         ProductID: req.body.ProductID
//     };

//     connection.query(
//         'UPDATE products p, productcategory c, productimage i \
//         SET p.ProductName = ?, p.Price = ?, p.QuantityAvailable = ?, c.ProductCategoryName = ?, i.Productimagecode = ? \
//         WHERE p.ProductCategoryID = c.ProductCategoryID AND p.ProductID = i.ProductID',
//         [newProduct.ProductName, newProduct.Price, newProduct.QuantityAvailable, newProduct.ProductID],
//         function(err, results) {
//             if (err) {
//                 res.json({status: 'error', message: err});
//             } else {
//                 res.json({status: 'ok', message: 'Product updated successfully'});
//             }
//         }
//     );
// });

app.delete('/delete', jsonParser, function (req, res, next) {
    const productIDs = req.body.productIDs;
    connection.query(
      'DELETE FROM `product` WHERE ProductID IN (?)',
      [productIDs],
      function(err, results) {
        if (err) {
          res.json({status: 'error', message: err});
        } else {
          res.json({status: 'ok', message: 'Products deleted successfully'});
        }
      }
    );
  });


app.listen(3333, jsonParser, function () {
  console.log('CORS-enabled web server listening on port 3333')
});

// const addProduct = async (name, price, category, count, published) => {
//   const newProduct = {
//     ProductID: ProductID,
//     ProductName: ProductName,
//     Price: Price,
//     QuantityAvailable: QuantityAvailable,
    // inStock: true,
    // published: published,
//   };

//   // Send a POST request to the mock API to add the new product
//   try {
//     const response = await fetch('http://localhost:3001/products', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newProduct),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add product');
//     }
    
//     // Update the local state with the new product
//     setProducts([...products, newProduct]);
//   } catch (error) {
//     console.error(error);
//   }
// };


// Assuming you have already imported necessary modules and set up your server

// // Add a new product
// app.post('/products', jsonParser, function (req, res, next) {
//     const newProduct = req.body;
//     connection.query(
//         'INSERT INTO `product`(ProductName, Price, QuantityAvailable) VALUES (?, ?, ?)',
//         [newProduct.name, newProduct.price, newProduct.count],
//         function(err, results) {
//             if (err) {
//                 res.json({status: 'error', message: err});
//             } else {
//                 res.json({status: 'ok', message: 'Product added successfully'});
//             }
//         }
//     );
// });

// // Get all products
// app.get('/products', function (req, res, next) {
//     connection.query(
//         'SELECT * FROM `product`',
//         function(err, results, fields) {
//             if (err) {
//                 res.json({status: 'error', message: err});
//             } else {
//                 res.json(results);
//             }
//         }
//     );
// });

// // Get a single product by ID
// app.get('/products/:id', function (req, res, next) {
//     const productId = req.params.id;
//     connection.query(
//         'SELECT * FROM `product` WHERE ProductID = ?',
//         [productId],
//         function(err, results, fields) {
//             if (err) {
//                 res.json({status: 'error', message: err});
//             } else {
//                 if (results.length > 0) {
//                     res.json(results[0]);
//                 } else {
//                     res.json({status: 'error', message: 'Product not found'});
//                 }
//             }
//         }
//     );
// });

// // Update a product by ID
// app.put('/products/:id', jsonParser, function (req, res, next) {
//     const productId = req.params.id;
//     const updatedProduct = req.body;
//     connection.query(
//         'UPDATE `product` SET ProductName = ?, Price = ?, QuantityAvailable = ? WHERE ProductID = ?',
//         [updatedProduct.name, updatedProduct.price, updatedProduct.count, productId],
//         function(err, results) {
//             if (err) {
//                 res.json({status: 'error', message: err});
//             } else {
//                 res.json({status: 'ok', message: 'Product updated successfully'});
//             }
//         }
//     );
// });

// // Delete a product by ID
// app.delete('/products/:id', function (req, res, next) {
//     const productId = req.params.id;
//     connection.query(
//         'DELETE FROM `product` WHERE ProductID = ?',
//         [productId],
//         function(err, results) {
//             if (err) {
//                 res.json({status: 'error', message: err});
//             } else {
//                 res.json({status: 'ok', message: 'Product deleted successfully'});
//             }
//         }
//     );
// });

// // Assuming you already have other routes in your server

