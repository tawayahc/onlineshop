const express = require("express");
const db = require("../db");

const router = express.Router();

// FIX: cart + cartitem
// Get cart items for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const query = `
    SELECT 
      cart.CartID,
      cartitem.Count AS Quantity,
      cartitem.ProductID,
      product.ProductName,
      product.Price,
      productimage.Productimagecode
    FROM 
      cart
    INNER JOIN 
      cartitem ON cart.CartID = cartitem.CartID
    INNER JOIN 
      product ON cartitem.ProductID = product.ProductID
    LEFT JOIN 
      productimage ON product.ProductID = productimage.ProductID
    WHERE 
      cart.ClientID = ?
  `;

  db.query(query, [userId], function (err, results, fields) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }

    const cartWithProducts = results.reduce((acc, row) => {
      const cartId = row.CartID;
      if (!acc[cartId]) {
        acc[cartId] = {
          CartID: row.CartID,
          Products: []
        };
      }

      const product = acc[cartId].Products.find(p => p.ProductID === row.ProductID);
      if (product) {
        if (row.Productimagecode) {
          product.ProductImages.push({
            Productimagecode: row.Productimagecode
          });
        }
        product.Quantity = row.Quantity; 
      } else {
        acc[cartId].Products.push({
          ProductID: row.ProductID,
          ProductName: row.ProductName,
          Price: row.Price,
          Quantity: row.Quantity,
          ProductImages: row.Productimagecode ? [{
            Productimagecode: row.Productimagecode
          }] : []
        });
      }

      return acc;
    }, {});

    const cartList = Object.values(cartWithProducts);

    res.json({ status: "ok", data: cartList });
  });
});

// Add a product to the cart
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Check if the user exists in the database
  const checkUserQuery = `
    SELECT 1 FROM Client WHERE ClientID = ?
  `;

  db.execute(checkUserQuery, [userId], function (err, results, fields) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }

    if (results.length === 0) {
      res.json({ status: "error", message: "User does not exist" });
      return;
    }

    // Find the cart for the user
    const findCartQuery = "SELECT CartID FROM cart WHERE ClientID = ?";

    db.query(findCartQuery, [userId], function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

      const cartId = results[0]?.CartID;

      if (!cartId) {
        res.json({ status: "error", message: "Cart not found" });
        return;
      }

      // Insert or update cart item
      const insertOrUpdateCartItemQuery = `
        INSERT INTO cartitem (CartID, ProductID, Count) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE Count = Count + VALUES(Count)
      `;

      db.execute(insertOrUpdateCartItemQuery, [cartId, productId, quantity], function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      });
    });
  });
});



// Remove a product from the cart
router.delete("/", async (req, res) => {
  const { userId, productId } = req.body;

  // Check if the user exists in the database
  const checkUserQuery = `
    SELECT 1 FROM Client WHERE ClientID = ?
  `;

  db.execute(checkUserQuery, [userId], function (err, results, fields) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }

    if (results.length === 0) {
      res.json({ status: "error", message: "User does not exist" });
      return;
    }

    // Find the cart for the user
    const findCartQuery = "SELECT CartID FROM cart WHERE ClientID = ?";

    db.query(findCartQuery, [userId], function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

      const cartId = results[0]?.CartID;

      if (!cartId) {
        res.json({ status: "error", message: "Cart not found" });
        return;
      }

      // Delete the cart item
      const deleteCartItemQuery = "DELETE FROM cartitem WHERE CartID = ? AND ProductID = ?";

      db.execute(deleteCartItemQuery, [cartId, productId], function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      });
    });
  });
});



// Update the quantity of a product in the cart
router.patch("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Check if the user exists in the database
  const checkUserQuery = `
    SELECT 1 FROM Client WHERE ClientID = ?
  `;

  db.execute(checkUserQuery, [userId], function (err, results, fields) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }

    if (results.length === 0) {
      res.json({ status: "error", message: "User does not exist" });
      return;
    }

    // Find the cart for the user
    const findCartQuery = "SELECT CartID FROM cart WHERE ClientID = ?";

    db.query(findCartQuery, [userId], function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

      const cartId = results[0]?.CartID;

      if (!cartId) {
        res.json({ status: "error", message: "Cart not found" });
        return;
      }

      // Update the cart item
      const updateCartItemQuery = "UPDATE cartitem SET Count = ? WHERE CartID = ? AND ProductID = ?";

      db.execute(updateCartItemQuery, [quantity, cartId, productId], function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      });
    });
  });
});



module.exports = router;