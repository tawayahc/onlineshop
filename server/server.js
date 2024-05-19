var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

app.use(cors());
app.use(bodyParser.json());

var connection = require("./db");

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// NOTE : get categories, I try to call this route in products but nothing happen
// I need to reorder the routes, WTF just happen it works now but
// If you try to move /categories to another order in /products, it doesn't work
 
// app.get("/categories", function (req, res, next) {
//   connection.execute(
//     "SELECT * FROM `productcategory`",
//     function (err, results, fields) {
//       if (err) {
//         res.json({ status: "error", message: err });
//         return;
//       }
//       res.json({ status: "ok", data: results });
//     }
//   )
// })

app.listen(3333, function () {
  console.log("CORS-enabled web server listening on port 3333");
});
