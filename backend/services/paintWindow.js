const validateArea = (area) => {
    if (area < 1) return errorMessages.tooSmall;
    if (area > 15) return errorMessages.tooBig;
    return null;
  };
  
  const validateDoorsWindows = (doorNum, windowNum, area) => {
    const windowArea = calcArea(defaultDimensions.window.width, defaultDimensions.window.height);
    const doorArea = calcArea(defaultDimensions.door.width, defaultDimensions.door.height);
    const notWall = doorNum * doorArea + windowNum * windowArea;
    if (notWall >= area / 2) return errorMessages.tooManyDW;
    return null;
  };

  const calcArea = (width, height) => width * height;

  const errorMessages = {
    tooSmall: "Parede muito pequena! Tente aumentar uma das medidas.",
    tooBig: "Parede muito grande! Tente diminuir uma das medidas.",
    emptyField: "Os campos de altura e largura são obrigatórios!",
    cantBeZero: "A altura e a largura não podem ser zero!",
    tooManyDW: "As portas e janelas não podem representar mais de 50% da parede!",
  };

  const defaultDimensions = {
    window: { width: 2, height: 1.2 },
    door: { width: 0.8, height: 1.9 },
  };
  
  const calculatePaintWindow = (walls) => {  
    let fullArea = 0;
  
    for (const wall of walls) {
      const { width, height, doors, windows } = wall;
  
      let curArea = calcArea(width, height);
      const areaError = validateArea(curArea);
      if (areaError) return areaError;
  
      if (doors || windows) {
        const doorWindowError = validateDoorsWindows(doors, windows, curArea);
        if (doorWindowError) return doorWindowError ;
        const windowArea = calcArea(defaultDimensions.window.width, defaultDimensions.window.height);
        const doorArea = calcArea(defaultDimensions.door.width, defaultDimensions.door.height);
        curArea -= doors * doorArea + windows * windowArea;
      }
  
      fullArea += curArea;
    }
  
    const paintNeeded = (fullArea / 5).toFixed(1);
    return paintNeeded;
  };

  module.exports = calculatePaintWindow;