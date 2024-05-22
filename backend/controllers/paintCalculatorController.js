const calculatePaintWindow = require('../services/paintWindow');
  
  const calculatePaint = (req, res) => {
    const walls = req.body;

    try {
      const data = calculatePaintWindow(walls);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  module.exports = calculatePaint;
  