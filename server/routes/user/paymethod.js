const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    `
    SELECT  
    PaymentMethodID,
    CardNumber,
    CardName,
    CardExpiry
    FROM paymentmethod 
    WHERE ClientID = ?`,
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      // return least 4 digit 
      results[0].CardNumber = results[0].CardNumber.slice(-4);
      res.json({ status: 'ok', data: results });
    }
  );
});

router.post('/:id', function (req, res, next) {
  const { id } = req.params;
  const {CardNumber, CardName, CardExpiry} = req.body
  connection.execute(
    "INSERT INTO `paymentmethod` (ClientID, CardNumber, CardName, CardExpiry) VALUES (?, ?, ?, ?)",
    [id, CardNumber, CardName, CardExpiry],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok' });
    }
  );
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    "DELETE FROM `paymentmethod` WHERE ClientID = ?",
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok' });
    }
  );
});

router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { cardNumber, cardName, cardExpiry } = req.body;
  connection.execute(
    "UPDATE `paymentmethod` SET CardNumber = ?, CardName = ?, CardExpiry = ? WHERE ClientID = ?",
    [cardNumber, cardName, cardExpiry, id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok' });
    }
  );
});

module.exports = router;
