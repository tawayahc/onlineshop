const express = require('express');
const router = express.Router();
const connection = require('../db'); 

router.get('/reviews', (req, res) => {
    const { search, sortBy, sortOrder } = req.query;
  
    let query = `
      SELECT pr.*, c.FirstName, c.LastName, c.Gender, c.DOB
      FROM productreviews pr
      JOIN client c ON pr.ClientID = c.ClientID
    `;
  
    if (search) {
      query += `
        WHERE pr.Comment LIKE '%${search}%' 
        OR c.FirstName LIKE '%${search}%' 
        OR c.LastName LIKE '%${search}%'
      `;
    }
  
    if (sortBy) {
      const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
      query += ` ORDER BY ${sortBy} ${order}`;
    }
  
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
  });  
  
  router.get('/requests', (req, res) => {
    const { search, sortBy, sortOrder } = req.query;
  
    let query = `
      SELECT csr.*, c.FirstName, c.LastName, c.Gender, c.DOB
      FROM customerservicerequests csr
      JOIN client c ON csr.ClientID = c.ClientID
    `;
  
    if (search) {
      query += `
        WHERE csr.RequestDescription LIKE '%${search}%' 
        OR c.FirstName LIKE '%${search}%' 
        OR c.LastName LIKE '%${search}%'
      `;
    }
  
    if (sortBy) {
      const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
      query += ` ORDER BY ${sortBy} ${order}`;
    }
  
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
});  

module.exports = router;
