var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'onlineshop-login'

var app = express();

app.use(cors());


// create application/json parser
var jsonParser = bodyParser.json();

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'onlineshop'
});
 
app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'INSERT INTO `users` (email, password, fname, lname) VALUES (?, ?, ?, ?)',
            [req.body.email, hash, req.body.fname, req.body.lname],
            function(err, results, fields) {
                if (err) {
                    res.json({status: 'error', message: err});
                    return
                }
                res.json({status: 'ok'})
            }
        );
    });
});

app.post('/login', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM `users` WHERE email = ?',
        [req.body.email],
        function(err, users, fields) {
            if (err) {
                res.json({status: 'error', message: err});
                return;
            }
            if (users.length == 0) {
                res.json({status: 'error', message: 'no user found'});
                return;
            }
            bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
                    res.json({status: 'ok', message: 'login success', token});
                } else {
                    res.json({status: 'error', message: 'login failed'});
                }
            });
        }
    );
});

app.post('/authentication', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, secret);
        res.json({status: 'ok', decoded: decoded});
    } catch (err) {
        res.json({status: 'error', message: err.message});
    }
    
});

app.post('/add', jsonParser, function (req, res, next) {
    connection.query(
        'INSERT INTO `product`(Id, seller, cate, price) VALUES (?, ?, ?, ?)',
        [req.body.Id, req.body.seller, req.body.cate, req.body.price],
        function(err, results) {
          res.json(results);
        }
      );
})

app.get('/see', function (req, res, next) {
    connection.query(
      'SELECT * FROM `product`',
      function(err, results, fields) {
        res.json(results);
      }
    );
})

app.get('/see1', jsonParser, function (req, res, next) {
    connection.query(
      'SELECT * FROM `product` WHERE Id = ?',
      [req.body.Id],
      function(err, results, fields) {
          res.json(results);
      }
    )
})

app.listen(3333, jsonParser, function () {
  console.log('CORS-enabled web server listening on port 3333')
});