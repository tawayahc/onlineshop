const express = require("express");
const router = express.Router();
const connection = require("../../db");

router.get("/:userId", function (req, res) {
  const { userId } = req.params;
  connection.execute(
    "SELECT * FROM `shippingaddress` WHERE ClientID = ?",
    [userId],
    function (err, results) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

router.post("/:userId", (req, res) => {
  const { userId } = req.params;
  const {
    FullName,
    PhoneNumber,
    Address,
    SubDistrict,
    District,
    Province,
    ZipCode,
  } = req.body;

  if (!FullName || !PhoneNumber || !Address || !SubDistrict || !District || !Province || !ZipCode) {
    console.error("Missing required fields in request body");
    return res.json({
      status: "error",
      message: "Please provide all required fields",
    });
  }

  const sql = `
    INSERT INTO shippingaddress 
    (FullName, PhoneNumber, Address, SubDistrict, District, Province, PostalCode, ClientID)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    FullName,
    PhoneNumber,
    Address,
    SubDistrict,
    District,
    Province,
    ZipCode,
    userId
  ];

  connection.execute(sql, params, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.json({ status: "error", message: err.message });
    }
    console.log("Address added successfully, SQL results:", results);
    res.json({ status: "ok", message: "Address added successfully", data: { ...req.body, ShippingAddressID: results.insertId } });
  });
});

router.put("/:userId", function (req, res) {
  const { userId } = req.params;
  const {
    ShippingAddressID,
    FullName,
    PhoneNumber,
    Address,
    SubDistrict,
    District,
    Province,
    ZipCode,
  } = req.body;

  const sql = `
    UPDATE shippingaddress
    SET
      FullName = ?,
      PhoneNumber = ?,
      Address = ?,
      SubDistrict = ?,
      District = ?,
      Province = ?,
      PostalCode = ?
    WHERE ClientID = ? AND ShippingAddressID = ?
  `;

  const params = [
    FullName,
    PhoneNumber,
    Address,
    SubDistrict,
    District,
    Province,
    ZipCode,
    userId,
    ShippingAddressID,
  ];

  connection.execute(sql, params, function (err, results) {
    if (err) {
      res.json({ status: "error", message: err.message });
      return;
    }
    res.json({ status: "ok", message: "Address updated successfully" });
  });
});

router.delete("/:userId", function (req, res) {
  const { userId } = req.params;
  const { ShippingAddressID } = req.body;
  const sql = "DELETE FROM shippingaddress WHERE ClientID = ? AND ShippingAddressID = ?";
  const params = [userId, ShippingAddressID];
  connection.execute(sql, params, function (err, results) {
    if (err) {
      res.json({ status: "error", message: err.message });
      return;
    }
    res.json({ status: "ok", message: "Address deleted successfully" });
  });
});

module.exports = router;
