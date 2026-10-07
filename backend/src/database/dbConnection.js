"use strict";

const { Sequelize } = require("sequelize");
require("dotenv").config();

// Nos testes usamos um banco em memória para nunca mexer no banco de desenvolvimento.
const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage: isTest ? ":memory:" : process.env.DB_STORAGE || "./database.sqlite",
  logging: false, // Desabilita logs de queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
