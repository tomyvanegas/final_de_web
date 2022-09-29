const config = require('dotenv').config();

const dotenv = {
    port: process.env.PORT || 3000,
    dbPort: process.env.BD_PORT || "",
    dbUser: process.env.BD_USER || "",
    dbPassword: process.env.BD_PASSWORD || "",
    dbServer: process.env.BD_SERVER || "",
    dbDatabase: process.env.BD_DATABASE || "",
  };

module.exports = dotenv;