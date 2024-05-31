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
      if (results.length > 0) {
        results[0].CardNumber = results[0].CardNumber.slice(-4); // Only slice if results are found
      }
      res.json({ status: 'ok', data: results });
    }
  );
});

router.post('/:id', function (req, res, next) {
  const { id } = req.params;
  const { CardNumber, CardName, CardExpiry } = req.body;

  if (!CardNumber || !CardName || !CardExpiry) {
    res.json({ status: 'error', message: 'Please provide all required fields' });
    return;
  }

  connection.execute(
    "INSERT INTO `paymentmethod` (ClientID, CardNumber, CardName, CardExpiry) VALUES (?, ?, ?, ?)",
    [id, CardNumber, CardName, CardExpiry],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: { PaymentMethodID: results.insertId, ClientID: id, CardNumber, CardName, CardExpiry } });
    }
  );
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  const { paymentId } = req.body;
  connection.execute(
    "DELETE FROM `paymentmethod` WHERE ClientID = ? AND PaymentMethodID = ?",
    [id, paymentId],
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
  const { PaymentMethodID, CardNumber, CardName, CardExpiry } = req.body;
  connection.execute(
    "UPDATE `paymentmethod` SET CardNumber = ?, CardName = ?, CardExpiry = ? WHERE ClientID = ? AND PaymentMethodID = ?",
    [CardNumber, CardName, CardExpiry, id, PaymentMethodID],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', data: { PaymentMethodID, ClientID: id, CardNumber, CardName, CardExpiry } });
    }
  );
});

module.exports = router;
