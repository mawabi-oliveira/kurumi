"use strict";

require('dotenv').config();

const storage = process.env.DB_STORAGE || "./database.sqlite";

module.exports = {
  development: {
    dialect: "sqlite",
    storage,
    logging: false,
  },
  production: {
    dialect: "sqlite",
    storage,
    logging: false,
  },
};
