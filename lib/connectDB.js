"use strict";

// cargar librería de mongoose
const mongoose = require("mongoose");
const conn = mongoose.connection;
const process = require("process");

// mongoose.set("useFindAndModify", false);

// gestionar eventos de conexion
conn.on("error", err => {
    console.log("Error de conexiòn", err);
    process.exit(1);
});

conn.once("open", () =>  {
    console.log("Conectado a MongoDB en", conn.name);
});

// conectar
mongoose.connect("mongodb://localhost/nodepop", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
//mongoose.connect("mongodb+srv://dbUser:587MxWUAzuAeERE@cluster0.srdpk.mongodb.net/nodepop?retryWrites=true&w=majority");


// exportar la conexiòn
module.exports = conn;