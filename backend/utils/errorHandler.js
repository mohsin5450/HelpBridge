// utils/errorHandler.js
const errorHandler = (res, error, message) => {
    console.error(error);
    res.status(500).json({ error: message });
  };
  
  module.exports = errorHandler;
  