const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const path = require("path");
require("dotenv").config();
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const addressRoutes = require("./routes/addresses.routes");
const contactRoutes = require("./routes/contact.route"); 
const db = require("./database/models");

db.sequelize.authenticate()
 .then(() => console.log("DB conectado com sucesso!"))
 .catch((err) => console.error("Erro ao conectar no DB:", err));

const app = express();

//Middlewares que transforma a resposta em json.
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Middlewares de log
app.use(logger);

app.use("/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use('/api/v1/addresses', addressRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use(notFound);
app.use(errorHandler);
module.exports = app;

