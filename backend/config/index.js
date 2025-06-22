require('dotenv').config();
module.exports = {
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
  PORT: process.env.PORT || 5000,
};
