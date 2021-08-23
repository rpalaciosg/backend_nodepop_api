"use strict";

const fs = require("fs");
const fsPromises = fs.promises;

const mongoose = require("mongoose");
const conn = require("./services/mongoDB");
const Anuncio = require("./models/Anuncio");

const file = "./services/data/anuncios.json";
const data = JSON.parse(fs.readFileSync(file,"utf-8"));

// conectar
mongoose.connect("mongodb://127.0.0.1/nodepop" , { useNewUrlParser: true, useUnifiedTopology: true });


async function cleanAgentes() {
    try {
        const resDel = await Anuncio.deleteMany({});
        console.log("Base de datos borrada!", resDel.ok, resDel.deletedCount);        
    } catch (err) {
        console.log("Erro al limpiar Anuncios", err);
        
    }
}

async function loadAnuncios() {    
    try {
        await Anuncio.insertMany(data.anuncios);
        console.log("Datos de anuncios cargados.!");        
    } catch (err) {
        console.log(`Error al cargar archivo ${file}, >>>>  ${err}`);
        process.exit();
    }
}

// gestionar eventos de conexión
conn.on("error", err => {
    console.log("Error de conexión", err);
    process.exit(1);
});

// Proceso de Inicialización Base de datos una vez conectado a mongodb
conn.once("open", async () => {
    console.log("Conectado a MongoDB en ", mongoose.connection.name);
    console.log("Limpiando Base de datos..!");
    await cleanAgentes();
    console.log("Cargando anuncios.json!");
    await loadAnuncios();
    console.log("Terminado..!");
    process.exit();
});