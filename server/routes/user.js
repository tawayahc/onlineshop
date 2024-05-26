const express = require('express');
const connection = require('../db'); 

const router = express.Router();

const addressRoutes = require('./user/shipAddress');
const orderRoutes = require('./user/orderClient');
const paymentRoutes = require('./user/paymethod');

router.use('/address', addressRoutes);
router.use('/orders', orderRoutes);
router.use('/payment', paymentRoutes);

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    "SELECT * FROM `client` WHERE ClientID = ?",
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

router.put('/:id', function (req, res) {
  const { id } = req.params;
  const { name, gender: initialGender, phoneNumber } = req.body;

  const [firstName, lastName] = name.split(' ');

  let gender;
  if (initialGender === 'ชาย') {
    gender = 'M';
  } else if (initialGender === 'หญิง') {
    gender = 'F';
  } else {
    gender = 'O';
  }

  connection.execute(
    "UPDATE `client` SET FirstName = ?, LastName = ?, PhoneNumber = ?, Gender = ? WHERE ClientID = ?",
    [firstName, lastName, phoneNumber, gender, id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok', message: 'User information updated successfully' });
    }
  );
});

// Uncomment and complete the code if image upload functionality is needed
// router.put('/:id/image', upload.single('image'), function (req, res) {
//   const { id } = req.params;
//   const image = req.file ? req.file.buffer : null;
//   console.log(image);

//   if (!image) {
//     return res.status(400).json({ status: 'error', message: 'Image is required' });
//   }

//   const query = "UPDATE `client` SET Image_code = ? WHERE ClientID = ?";
//   const params = [image, id];

//   connection.execute(query, params, function (err, results, fields) {
//     if (err) {
//       res.json({ status: 'error', message: err });
//       return;
//     }
//     res.json({ status: 'ok', message: 'User image updated successfully' });
//   });
// });

module.exports = router;
