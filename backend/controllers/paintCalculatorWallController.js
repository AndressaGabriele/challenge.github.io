const paintCalculatorWallController = (req, res) => {
  const walls = req.body.walls;

  let fullArea = 0;
  for (const wall of walls) {
    const wallArea = wall.width * wall.height;
    fullArea += wallArea;
    const doorArea = wall.doors * 1.52;
    const windowArea = wall.windows * 2.4;
    fullArea -= doorArea + windowArea;
  }

  const paintNeeded = fullArea / 5;
  res.json({ paintNeeded });
};
 
module.exports = paintCalculatorWallController;