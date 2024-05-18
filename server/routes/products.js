const express = require('express');
const connection = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [results] = await db.query(`
      SELECT p.*, pc.ProductCategoryName
      FROM product p
      LEFT JOIN productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
    `);

    res.json({ status: 'ok', data: results });
    console.log(results);
  } catch (err) {
    res.json({ status: 'error', message: err.message });
  }
});

// fetch all categories
router.get('/categories', function (req, res, next) {
  connection.execute(
    "SELECT * FROM `productcategory`",
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: results });
    }
  );
})

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE ProductID = ?",
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

router.get('/category/:category', function (req, res, next) {
  const { category } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Category = ?",
    [category],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: results });
    }
  );
});

router.get('/search/:name', function (req, res, next) {
  const { name } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Name LIKE ?",
    [`%${name}%`],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: results });
    }
  );
});

router.get('/price/:price', function (req, res, next) {
  const { price } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Price <= ?",
    [price],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: results });
    }
  );
});

router.get('/rating/:rating', function (req, res, next) {
  const { rating } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Rating >= ?",
    [rating],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: results });
    }
  );
});

module.exports = router;
