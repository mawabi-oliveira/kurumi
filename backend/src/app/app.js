const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../../docs/swagger");
const usersRoute = require("../routes/usersRoute");

const app = express();

// CORS: em produção defina CORS_ORIGIN com o endereço do frontend (ex.: https://kurumi.vercel.app).
// Se não for definido, aceita qualquer origem (útil só em desenvolvimento).
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", usersRoute);

module.exports = app;
