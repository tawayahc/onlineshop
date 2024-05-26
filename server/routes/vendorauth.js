const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const connection = require('../db'); 

const router = express.Router();
const saltRounds = 10;
const secret = "staff-login";

function checkDuplicateEmail(email, callback) {
  connection.execute(
    "SELECT * FROM `staff` WHERE email = ?",
    [email],
    function (err, results, fields) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results.length > 0);
    }
  );
}

router.post('/register', function (req, res, next) {
  const { email, role } = req.body;

  checkDuplicateEmail(email, (err, isDuplicate) => {
    if (err) {
      res.json({ status: 'error', message: err });
      return;
    }

    if (isDuplicate) {
      res.json({ status: 'error', message: 'Email already exists' });
      return;
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const newStaffId = uuidv4();
      connection.execute(
        "INSERT INTO `staff` (StaffID, FirstName, LastName, Email, password, RoleID) VALUES (?, ?, ?, ?, ?, ?)",
        [newStaffId, req.body.fname, req.body.lname, req.body.email, hash, req.body.position],
        function (err, results, fields) {
          if (err) {
            res.json({ status: 'error', message: err });
            return;
          }
          res.json({ status: 'ok' });
        }
      );
    });
  });
});

router.post('/login', function (req, res, next) {
  connection.execute(
    "SELECT * FROM `staff` WHERE Email = ?",
    [req.body.email],
    function (err, staffs, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      if (staffs.length == 0) {
        res.json({ status: 'error', message: 'no user found' });
        return;
      }

      const storedPassword = staffs[0].Password;
      const enteredPassword = req.body.password;

      bcrypt.compare(enteredPassword, storedPassword, function (err, isLogin) {
        if (isLogin) {
          var token = jwt.sign({ email: staffs[0].email }, secret, {
            expiresIn: '1h',
          });
          res.json({
            status: 'ok',
            message: 'login success',
            token,
            staffId: staffs[0].StaffID,
          });
        } else {
          res.json({ status: 'error', message: 'Email or Password is wrong' });
        }
      });
    }
  );
});

module.exports = router;
