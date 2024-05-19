const express = require("express");
const db = require("../db");

const router = express.Router();

// Get cart items for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const query = `
    SELECT 
      cart.CartID,
      cart.Quantity,
      cart.ProductID,
      cart.ClientID,
      product.ProductName,
      product.Price,
      product.QuantityAvailable,
      product.RatingAvg,
      productimage.ProductimageID,
      productimage.ProductimageName,
      productimage.Productimagecode
    FROM 
      cart
    INNER JOIN 
      product ON cart.ProductID = product.ProductID
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
          Quantity: row.Quantity,
          Products: []
        };
      }

      const product = acc[cartId].Products.find(p => p.ProductID === row.ProductID);
      if (product) {
        if (row.ProductimageID) {
          product.ProductImages.push({
            ProductimageID: row.ProductimageID,
            ProductimageName: row.ProductimageName,
            Productimagecode: row.Productimagecode
          });
        }
      } else {
        acc[cartId].Products.push({
          ProductID: row.ProductID,
          ProductName: row.ProductName,
          Price: row.Price,
          QuantityAvailable: row.QuantityAvailable,
          RatingAvg: row.RatingAvg,
          ProductImages: row.ProductimageID ? [{
            ProductimageID: row.ProductimageID,
            ProductimageName: row.ProductimageName,
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
  const { userId, productId } = req.body;
  db.execute(
    "INSERT INTO cart (ClientID, ProductID, Quantity) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE Quantity = Quantity + 1",
    [userId, productId],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

// Remove a product from the cart
router.delete("/", async (req, res) => {
  const { userId, productId } = req.body;
  console.log(userId, productId);
  db.execute(
    "DELETE FROM cart WHERE ClientID = ? AND ProductID = ?",
    [userId, productId],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

// Update the quantity of a product in the cart
router.patch("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  db.execute(
    "UPDATE cart SET Quantity = ? WHERE ClientID = ? AND ProductID = ?",
    [quantity, userId, productId],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

module.exports = router;
