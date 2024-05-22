const express = require('express');
const calculatePaint = require('../controllers/paintCalculatorController');
const paintCalculatorWallController = require('../controllers/paintCalculatorWallController')

const router = express.Router();

router.post('/calculate-paint', calculatePaint);
router.get('/get', (req, res) => {
    res.json({message: 'helloo world'})
  })
  

router.post('/calculate-paint-needed', paintCalculatorWallController)

module.exports = router
