import React, { useState } from "react";
import axios from "axios";
import WallForm from "../../components/form/WallForm";
import ErrorModal from "../../components/errorModal";

const defaultDimensions = {
  window: { width: 2, height: 1.2 },
  door: { width: 0.8, height: 1.9 },
};

const errorMessages = {
  tooSmall: "Parede muito pequena! Tente aumentar uma das medidas.",
  tooBig: "Parede muito grande! Tente diminuir uma das medidas.",
  emptyField: "Os campos de altura e largura são obrigatórios!",
  cantBeZero: "A altura e a largura não podem ser zero!",
  tooManyDW: "As portas e janelas não podem representar mais de 50% da parede!",
};

const PaintCalculator = () => {
  const [walls, setWalls] = useState([
    {
      width: "",
      height: "",
      doors: 0,
      windows: 0,
      completed: false,
      active: true,
    },
    {
      width: "",
      height: "",
      doors: 0,
      windows: 0,
      completed: false,
      active: false,
    },
    {
      width: "",
      height: "",
      doors: 0,
      windows: 0,
      completed: false,
      active: false,
    },
    {
      width: "",
      height: "",
      doors: 0,
      windows: 0,
      completed: false,
      active: false,
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [paintNeeded, setPaintNeeded] = useState(null);
  const [cansNeeded, setCansNeeded] = useState([]);
  const [canSizes, setCanSizes] = useState([]);

  const defaultCanSizes = [18, 3.6, 2.5, 0.5];
  
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newWalls = walls.slice();
    newWalls[index][name] = value;
    setWalls(newWalls);
  };

  const handleDoorChange = (index, event) => {
    const value = parseInt(event.target.value, 10) || 0;
    const newWalls = walls.slice();
    newWalls[index].doors = value;
    setWalls(newWalls);
  };

  const handleWindowChange = (index, event) => {
    const value = parseInt(event.target.value, 10) || 0;
    const newWalls = walls.slice();
    newWalls[index].windows = value;
    setWalls(newWalls);
  };

  const adjustFieldValue = (index, field, adjustment) => {
    const newWalls = walls.slice();
    newWalls[index][field] = Math.max(0, newWalls[index][field] + adjustment);
    setWalls(newWalls);
  };

  const validateFields = (width, height) => {
    if (!width || !height) return errorMessages.emptyField;
    if (width <= 0 || height <= 0) return errorMessages.cantBeZero;
    return null;
  };

  const validateArea = (area) => {
    if (area < 1) return errorMessages.tooSmall;
    if (area > 15) return errorMessages.tooBig;
    return null;
  };

  const validateDoorsWindows = (doorNum, windowNum, area) => {
    const windowArea = calcArea(
      defaultDimensions.window.width,
      defaultDimensions.window.height
    );
    const doorArea = calcArea(
      defaultDimensions.door.width,
      defaultDimensions.door.height
    );
    const notWall = doorNum * doorArea + windowNum * windowArea;
    if (notWall >= area / 2) return errorMessages.tooManyDW;
    return null;
  };

  const calcArea = (width, height) => width * height;

  const handleSubmit = async (e, index) => {
    e.preventDefault();

    const curWall = walls[index];
    const { width, height, doors, windows } = curWall;
    const fieldError = validateFields(width, height);
    if (fieldError) return setErrorMessage(fieldError);

    let curArea = calcArea(width, height);
    const areaError = validateArea(curArea);
    if (areaError) return setErrorMessage(areaError);

    if (doors || windows) {
      const doorWindowError = validateDoorsWindows(doors, windows, curArea);
      if (doorWindowError) return setErrorMessage(doorWindowError);
      const windowArea = calcArea(
        defaultDimensions.window.width,
        defaultDimensions.window.height
      );
      const doorArea = calcArea(
        defaultDimensions.door.width,
        defaultDimensions.door.height
      );
      curArea -= doors * doorArea + windows * windowArea;
    }

    const newWalls = walls.slice();
    newWalls[index].completed = true;
    newWalls[index].active = false;
    if (index < 3) newWalls[index + 1].active = true;
    setWalls(newWalls);
    if (index === 3) calculatePaintApi(walls);
  };

  const calculatePaintApi = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/calculate-paint",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPaintNeeded(res.data);
      calculateCans(res.data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao calcular");
    }
  };

  const handleCancel = (e, index) => {
    e.preventDefault();
    const newWalls = walls.slice();
    newWalls[index].active = false;
    if (index > 0) newWalls[index - 1].active = true;
    newWalls[index].completed = false;
    setWalls(newWalls);
  };

  const closeError = () => setErrorMessage("");

  const calculateCans = (paintNeeded) => {
    let remainingPaint = paintNeeded;
    let cans = [];
    let suggestions = [];
  
    const sortedCanSizes = defaultCanSizes.sort((a, b) => b - a);
  
    for (let i = 0; i < sortedCanSizes.length; i++) {
      if (remainingPaint >= sortedCanSizes[i]) {
        const count = Math.floor(remainingPaint / sortedCanSizes[i]);
        if (count > 0) {
          cans.push({ size: sortedCanSizes[i], count });
          remainingPaint -= count * sortedCanSizes[i];
        }
      }
    }
  
    if (remainingPaint > 0) {
      for (let i = sortedCanSizes.length - 1; i >= 0; i--) {
        if (sortedCanSizes[i] >= remainingPaint) {
          cans.push({ size: sortedCanSizes[i], count: 1 });
          remainingPaint -= sortedCanSizes[i];
          break;
        }
      }
    }
  
    for (let i = 0; i < cans.length; i++) {
      suggestions.push(`${cans[i].count} lata(s) de ${cans[i].size}L`);
    }
  
    setCansNeeded(suggestions);
  };

  return (
    <div className="content">
      <header>
        <h1>Calculadora de Tinta</h1>
      </header>
      {errorMessage && (
        <ErrorModal errorMessage={errorMessage} closeError={closeError} />
      )}
      {walls.map((wall, index) => (
        <WallForm
          key={index}
          index={index}
          wall={wall}
          handleChange={handleChange}
          handleDoorChange={handleDoorChange}
          handleWindowChange={handleWindowChange}
          adjustFieldValue={adjustFieldValue}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      ))}
      {paintNeeded && (
        <div className="result">
          <h2>Quantidade de tinta necessária: {paintNeeded} litros</h2>
          <h3>Latas necessárias:</h3>
          <ul>
            {cansNeeded.map((can, index) => (
              <li key={index}>{can}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaintCalculator;
