const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();
const { error404Handler, generalErrorHandler } = require("./middleware");
const routes = require("./routes");
const config = require("config");
const cors = require("cors");

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
app.use(cors);

/**
 * Conexión a la base de datos
 */
require("./lib/connectDB");
require("./models/Anuncio");
require("./controllers/AnuncioController");
require("./services/mongoDB");

//TODO: add documentation with swagger https://www.youtube.com/watch?v=S8kmHtQeflo&t=859s

/**
 * Rutas de mi API
 */
app.use("/apiv1/anuncios", require("./routes/apiv1/anuncios"));

// Variables goblales para vistas
app.use(config.get("App.restApiEndpoint.version1AnunciosPath"), routes);

// Variables globales para vistas
app.locals.title = "NodePop";

/**
 * Rutas de mi aplicación web
 */
app.use("/",      require("./routes/index"));
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // comprueba error de validaciòn
  if (err.array) {
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req) 
    ? {message: "Not valid", errors: err.mapped()}
    : `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }
  res.status(err.status || 500);
  if(isAPI(req)) {
    res.json({ success: false, error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.render("error");
});

// funcion para saber si es una petición a un API
function isAPI(req) {
  return req.originalUrl.indexOf("/api") === 0;
}
app.use("/", require("./routes/index"));
app.use(error404Handler); // catch 404 and forward to error handler
app.use(generalErrorHandler); // error handler

module.exports = app;
