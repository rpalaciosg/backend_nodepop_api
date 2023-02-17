"use strict";

// cargar librería de mongoose
const mongoose = require("mongoose");
const config = require("config");
const conn = mongoose.connection;

mongoose.set("useFindAndModify", false);

// gestionar eventos de conexión
conn.on("error", err => {
    console.log("Error de conexión", err);
    process.exit(1);
});

conn.once("open", () =>  {
    console.log("Conectado a MongoDB en", conn.name);
});

// conectar
// mongoose.connect("mongodb://127.0.0.1/nodepop", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connect(config.get("MongoDB.connectionString"),{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// exportar la conexión
module.exports = conn;