var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { error404Handler, generalErrorHandler } = require("./middleware");
const routes = require("./routes");
const config = require("config");

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

//TODO: add documentation with swagger https://www.youtube.com/watch?v=S8kmHtQeflo&t=859s

/**
 * Rutas de mi API
 */
// app.use("/api/anuncios", require("./routes/api/routes"));
// app.use("/api/", routes);
app.use(config.get("App.restApiEndpoint.version1AnunciosPath"), routes);

// Variables globales para vistas
app.locals.title = "NodePop";

/**
 * Rutas de mi aplicación web
 */
app.use("/", require("./routes/index"));
app.use(error404Handler); // catch 404 and forward to error handler
app.use(generalErrorHandler); // error handler

module.exports = app;
