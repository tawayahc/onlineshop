const express = require("express");
const connection = require("../db");

const router = express.Router();

router.get("/", function (req, res, next) {
  connection.execute(`
    SELECT p.*, pc.ProductCategoryName
    FROM product p
    LEFT JOIN productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
    `,
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
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

// fetch products by category
router.get("/category", function (req, res, next) {
  const { category = [], priceRange = [0, 100000], rating = [] } = req.query;

  console.log("Received filters:");
  console.log("category:", category);
  console.log("priceRange:", priceRange);
  console.log("rating:", rating);

  let categoryFilter = '';
  let priceFilter = '';
  let ratingFilter = '';

  // Handle category filter
  if (category && category.length > 0) {
    const categoryList = category.map(cat => `'${cat}'`).join(',');
    categoryFilter = `pc.ProductCategoryName IN (${categoryList})`;
    console.log("categoryFilter ",categoryFilter);
  }

  // Handle price range filter
  if (priceRange && priceRange.length === 2) {
    const minPrice = parseFloat(priceRange[0]);
    const maxPrice = parseFloat(priceRange[1]);
    priceFilter = `p.Price BETWEEN ${minPrice} AND ${maxPrice}`;
    console.log("priceFilter ",priceFilter);
  }

  // Handle rating filter
  if (rating && rating.length > 0) {
    const ratingList = rating.map(rate => parseFloat(rate)).join(',');
    ratingFilter = `p.RatingAvg <= (${ratingList})`;
    console.log("ratingFilter ",ratingFilter);
  }

  // Combine all filters
  let whereClause = '';
  if (categoryFilter) {
    whereClause += categoryFilter;
  }
  if (priceFilter) {
    if (whereClause) whereClause += ' AND ';
    whereClause += priceFilter;
  }
  if (ratingFilter) {
    if (whereClause) whereClause += ' AND ';
    whereClause += ratingFilter;
  }
  console.log("whereClause :",whereClause);
  const query = `
    SELECT p.*, pc.ProductCategoryName
    FROM product p
    LEFT JOIN productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
    ${whereClause ? `WHERE ${whereClause}` : ''}
  `;

  connection.execute(query, function (err, results, fields) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", data: results });
  });
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE ProductID = ?",
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

router.get("/category/:category", function (req, res, next) {
  const { category } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Category = ?",
    [category],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

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

router.get("/price/:price", function (req, res, next) {
  const { price } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Price <= ?",
    [price],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

router.get("/rating/:rating", function (req, res, next) {
  const { rating } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Rating >= ?",
    [rating],
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
