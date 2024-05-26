const express = require("express");
const db = require("../db");

const router = express.Router();

// Get wishlist items for a user
router.get("/:userId", function (req, res) {
  const { userId } = req.params;
  db.execute(
    `
    SELECT 
      p.ProductID,
      p.ProductName,
      p.RatingAvg,
      p.Price, 
      pi.ProductimageID,
      pi.ProductimageName,
      pi.Productimagecode
    FROM 
      wishlist w 
    JOIN 
      product p ON w.ProductID = p.ProductID 
    LEFT JOIN 
      productimage pi ON p.ProductID = pi.ProductID
    WHERE 
      w.ClientID = ?
    `,
    [userId],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      const wishlistDetail = results.reduce((acc, row) => {
        const productId = row.ProductID;
        if (!acc[productId]) {
          acc[productId] = {
            ProductID: productId,
            ProductName: row.ProductName,
            RatingAvg: row.RatingAvg,
            Price: row.Price,
            ProductImages: [],
          };
        }

        // images
        if (row.ProductimageID) {
          const productImage = acc[productId].ProductImages.find(
            (pi) => pi.ProductimageID === row.ProductimageID
          );
          if (!productImage) {
            acc[productId].ProductImages.push({
              ProductimageID: row.ProductimageID,
              ProductimageName: row.ProductimageName,
              Productimagecode: row.Productimagecode,
            });
          }
        }

        return acc;
      }, {});
      const products = Object.values(wishlistDetail);
      res.json({ status: "ok", data: products });
    }
  );
});

// Add a product to the wishlist
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;
  db.execute(
    "INSERT INTO wishlist (ClientID, ProductID) VALUES (?, ?)",
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

// Remove a product from the wishlist
router.delete("/", async (req, res) => {
  const { userId, productId } = req.body;
  db.execute(
    "DELETE FROM wishlist WHERE ClientID = ? AND ProductID = ?",
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


module.exports = router;
