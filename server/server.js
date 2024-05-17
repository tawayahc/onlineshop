var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = "onlineshop-login";

var app = express();

app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json();

// get the client
const mysql = require("mysql2");

// Generate a new UUID
const { v4: uuidv4 } = require("uuid");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "onlineshop",
});

function checkDuplicateEmail(email, callback) {
  connection.execute(
    "SELECT * FROM `client` WHERE email = ?",
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

app.post("/register", jsonParser, function (req, res, next) {
  const { email } = req.body;

  checkDuplicateEmail(email, (err, isDuplicate) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }

    if (isDuplicate) {
      res.json({ status: "error", message: "Email already exists" });
      return;
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const newUserId = uuidv4();
      connection.execute(
        "INSERT INTO `client` (ClientID, email, password, FirstName, LastName) VALUES (?, ?, ?, ?, ?)",
        [newUserId, req.body.email, hash, req.body.fname, req.body.lname],
        function (err, results, fields) {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          }
          res.json({ status: "ok" });
        }
      );
    });
  });
});

app.post("/login", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM `client` WHERE email = ?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (users.length == 0) {
        res.json({ status: "error", message: "no user found" });
        return;
      }
      // Password comparison
      const storedPassword = users[0].Password;
      const enteredPassword = req.body.password;

      if (!storedPassword || !enteredPassword) {
        res.json({ status: "error", message: "Password is missing" });
        return;
      }

      bcrypt.compare(
        enteredPassword,
        storedPassword,
        function (err, isLogin) {
          // console.log('Password comparison result:', isLogin);
          // console.log('Password :',storedPassword); ;
          if (isLogin) {
            var token = jwt.sign({ email: users[0].email }, secret, {
              expiresIn: "1h",
            });
            //WARN : I add userID, check here
            res.json({
              status: "ok",
              message: "login success",
              token,
              userId: users[0].ClientID,
            });
          } else {
            res.json({ status: "error", message: "login failed" });
          }
        }
      );
    }
  );
});

app.post("/authentication", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded: decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

// get user info
app.get("/user/:id", jsonParser, function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    "SELECT * FROM `client` WHERE ClientID = ?",
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  )
})
// update user info
app.put("/user/:id", jsonParser ,function (req, res) {
  const { id } = req.params;
  const { name, gender: initialGender, phoneNumber } = req.body;

  const [firstName, lastName] = name.split(" ");

  let gender;
  if (initialGender === "ชาย") {
    gender = "M";
  } else if (initialGender === "หญิง") {
    gender = "F";
  } else {
    gender = "O";
  }

  connection.execute(
    "UPDATE `client` SET FirstName = ?, LastName = ?, PhoneNumber = ?, Gender = ? WHERE ClientID = ?",
    [firstName, lastName, phoneNumber, gender, id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", message: "User information updated successfully" });
    }
  );
});


app.listen(3333, jsonParser, function () {
  console.log("CORS-enabled web server listening on port 3333");
});
