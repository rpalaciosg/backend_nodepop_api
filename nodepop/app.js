var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { error404Handler,generalErrorHandler } = require("./middleware");
const routes = require("./routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Conexión a la base de datos
 */
require("./services/mongoDB");
// require("./apiServices/anuncios/model");
// require("./apiServices/anuncios/controller");

/**
 * Rutas de mi API
 */
// app.use("/apiv1/anuncios", require("./routes/apiv1/routes"));
app.use("/apiv1/", routes);

// Variables globales para vistas
app.locals.title = "NodePop";

/**
 * Rutas de mi aplicación web
 */
app.use("/",require("./routes/index"));
app.use(error404Handler); // catch 404 and forward to error handler
app.use(generalErrorHandler); // error handler

module.exports = app;
