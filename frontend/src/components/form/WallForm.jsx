import React from 'react';
import '../styles.css'

const WallForm = ({ index, wall, handleChange, handleDoorChange, handleWindowChange, adjustFieldValue, handleSubmit, handleCancel }) => (
  <div className={`card-wall ${wall.completed ? 'completed' : ''} ${wall.active ? 'active' : ''}`}>
    <div className="form-group">
      <label>Largura:</label>
      <input
        type="number"
        name="width"
        value={wall.width}
        onChange={(e) => handleChange(index, e)}
        className="wall-width"
        disabled={!wall.active}
      />
    </div>
    <div className="form-group">
      <label>Altura:</label>
      <input
        type="number"
        name="height"
        value={wall.height}
        onChange={(e) => handleChange(index, e)}
        className="wall-height"
        disabled={!wall.active}
      />
    </div>
    <div className="form-group">
      <label>Portas:</label>
      <input
        type="number"
        name="doors"
        value={wall.doors}
        onChange={(e) => handleDoorChange(index, e)}
        className="door-qty"
        disabled={!wall.active}
      />
    </div>
    <div className="form-group">
      <label>Janelas:</label>
      <input
        type="number"
        name="windows"
        value={wall.windows}
        onChange={(e) => handleWindowChange(index, e)}
        className="window-qty"
        disabled={!wall.active}
      />
    </div>
    <button onClick={(e) => handleSubmit(e, index)} className="btn-submit" disabled={!wall.active}>Enviar</button>
    <button onClick={(e) => handleCancel(e, index)} className="btn-back" disabled={!wall.active}>Cancelar</button>
  </div>
);

export default WallForm;
