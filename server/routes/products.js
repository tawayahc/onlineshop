const express = require("express");
const connection = require("../db");

const router = express.Router();

router.get("/", function (req, res, next) {
  connection.execute(
    `
    SELECT 
      p.ProductID,
      p.ProductName,
      p.RatingAvg,
      p.Price,  
      pc.ProductCategoryName, 
      pi.ProductimageID,
      pi.ProductimageName,
      pi.Productimagecode
    FROM product p
    LEFT JOIN 
      productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
    LEFT JOIN 
      productimage pi ON p.ProductID = pi.ProductID
    `,
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      const productlist = results.reduce((acc, row) => {
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

      const products = Object.values(productlist);
      res.json({ status: "ok", data: products });
    }
  );
});

// fetch all categories
router.get("/categories", function (req, res, next) {
  connection.execute(
    "SELECT * FROM `productcategory`",
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

// NOTE : fetch products by category
router.get("/category/:id", async (req, res) => {
  const categoryId = req.params.id;

  connection.execute(
    `
  SELECT
    p.ProductID,
    p.ProductName,
    p.RatingAvg,
    p.Price,  
    pc.ProductCategoryName, 
    pi.ProductimageID,
    pi.ProductimageName,
    pi.Productimagecode
  FROM product p
  LEFT JOIN 
    productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
  LEFT JOIN 
    productimage pi ON p.ProductID = pi.ProductID
  WHERE p.ProductCategoryID = ?`,
    [categoryId],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      const productCategorylist = results.reduce((acc, row) => {
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

      const products = Object.values(productCategorylist);
      res.json({ status: "ok", data: products });
    }
  );
});

// WARN : fetch products by category
// router.get("/category", function (req, res, next) {
//   const { category = [], priceRange = [0, 100000], rating = [] } = req.query;

//   // console.log("Received filters:");
//   // console.log("category:", category);
//   // console.log("priceRange:", priceRange);
//   // console.log("rating:", rating);

//   let categoryFilter = "";
//   let priceFilter = "";
//   let ratingFilter = "";

//   // Handle category filter
//   if (category && category.length > 0) {
//     const categoryList = category.map((cat) => `'${cat}'`).join(",");
//     categoryFilter = `pc.ProductCategoryName IN (${categoryList})`;
//     // console.log("categoryFilter ",categoryFilter);
//   }

//   // Handle price range filter
//   if (priceRange && priceRange.length === 2) {
//     const minPrice = parseFloat(priceRange[0]);
//     const maxPrice = parseFloat(priceRange[1]);
//     priceFilter = `p.Price BETWEEN ${minPrice} AND ${maxPrice}`;
//     // console.log("priceFilter ",priceFilter);
//   }

//   // Handle rating filter
//   if (rating && rating.length > 0) {
//     const ratingList = rating.map((rate) => parseFloat(rate)).join(",");
//     ratingFilter = `p.RatingAvg <= (${ratingList})`;
//     // console.log("ratingFilter ",ratingFilter);
//   }

//   // Combine all filters
//   let whereClause = "";
//   if (categoryFilter) {
//     whereClause += categoryFilter;
//   }
//   if (priceFilter) {
//     if (whereClause) whereClause += " AND ";
//     whereClause += priceFilter;
//   }
//   if (ratingFilter) {
//     if (whereClause) whereClause += " AND ";
//     whereClause += ratingFilter;
//   }
//   // console.log("whereClause :",whereClause);
//   const query = `
//     SELECT p.*, pc.ProductCategoryName
//     FROM product p
//     LEFT JOIN productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
//     ${whereClause ? `WHERE ${whereClause}` : ""}
//   `;

//   connection.execute(query, function (err, results, fields) {
//     if (err) {
//       res.json({ status: "error", message: err });
//       return;
//     }
//     res.json({ status: "ok", data: results });
//   });
// });

router.get("/search/:name", function (req, res, next) {
  const { name } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Name LIKE ?",
    [`%${name}%`],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

module.exports = router;
