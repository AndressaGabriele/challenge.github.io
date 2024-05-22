import React from 'react';


const ErrorModal = ({ errorMessage, closeError }) => (
  <div className="error_message">
    <div className="message_body">{errorMessage}</div>
    <button onClick={closeError} className="btn-ok">OK</button>
  </div>
);

export default ErrorModal;
