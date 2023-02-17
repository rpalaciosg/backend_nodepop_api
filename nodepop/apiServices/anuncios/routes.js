"use strict";

const express = require("express");
const router = express.Router();

const anuncioController = require("../../apiServices/anuncios/controller");
const Anuncio = require("../../apiServices/anuncios/model");

/**
 * GET /anuncios
 * Devuelve una lista de anuncios
 * http://localhost:3000/apiv1/anuncios
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Anuncio:
 *          type: object
 *          required:
 *              - nombre
 *              - venta
 *              - precio
 *              - foto
 *              - tags
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: name of anuncio
 *              venta:
 *                  type: boolean
 *                  description: si producto esta en venta o no
 *              precio:
 *                  type: number
 *                  description: precio del producto
 *              foto:
 *                  type: object
 *                  description: objeto string del link de la foto
 *              tags:
 *                  type: array
 *                  description: array de objetos de tags
 *          example:
 *              nombre: Lentes de sol
 *              venta: true
 *              precio: 150
 *              foto: {'sdasdasdasdasd'}
 *              tags: [{'pc', 'lentes', 'lectura'}]
 *
 */

/**
 * @swagger
 * /anuncios:
 *   get:
 *      summary: Return
 */
router.get("/", async (req, res, next) => {
  try {
    const skip = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;
    const tags = req.query.tags || "";
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const precio = req.query.precio || "";

    // Patrones de cadena para query param precio
    let patPreIgual = /\d/;
    let patPreMenor = /-\d/;
    let patPreEntre = /\d-\d/;
    let patPreMayor = /\d-/;

    const filter = {};

    // para este filtro por tags lo debo hacer con un $in
    // const cursor = db.collection('anuncios').find({ tags: { $in: ['work','stylelife']}});
    if (tags !== "") {
      const extTags = tags.split(" ");
      filter.tags = { $in: extTags };
    }

    if (venta) {
      filter.venta = venta;
    }

    //const precio // para el filtro por precio debo hacer un typeof para comparar que no sea 'undefined'
    if (precio !== "") {
      const extPrecio = precio.split("-");
      if (patPreEntre.test(precio)) {
        if (parseInt(extPrecio[0]) >= parseInt(extPrecio[1])) {
          res.status(422).json({
            success: false,
            error: "El primero parámetro del rango de precio debe ser menor",
          });
          return;
        }
        filter.precio = { $gte: extPrecio[0], $lte: extPrecio[1] };
      } else if (patPreMayor.test(precio)) {
        filter.precio = { $gte: extPrecio[0] };
        console.log("arma precio mayor -->", filter.precio);
      } else if (patPreMenor.test(precio)) {
        filter.precio = { $lte: parseInt(extPrecio[1]) };
        console.log("arma precio menor -->", filter.precio);
      } else if (patPreIgual.test(precio)) {
        filter.precio = parseInt(extPrecio[0]);
        console.log("arma precio a igual-->", filter.precio);
      }
    }

    if (nombre) {
      filter.nombre = { $regex: new RegExp("^" + nombre + ".*", "i") };
    }

    const anuncios = await anuncioController.listaAnuncios({
      filter: filter,
      skip,
      limit,
      fields,
      sort,
    });
    res.json({ success: true, results: anuncios });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /anuncios/tags
 * Obtiene el listado de tags existentes
 * http://localhost:3000/apiv1/anuncios/tags
 */
router.get("/tags", async (req, res, next) => {
  try {
    const tagList = await anuncioController.listaTags();
    res.json({ success: true, results: tagList });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /anuncios/:id
 * Obtiene un agente mediante el :id
 * http://localhost:3000/apiv1/anuncios/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const anuncio = await anuncioController.consultarUnAnuncio(_id);
    if (!anuncio) {
      res.status(404).json({ success: false });
    }
    res.json({ success: true, result: anuncio });
  } catch (error) {
    next(err);
  }
});

/**
 * POST /anuncios
 * Crea un anuncio
 * http://localhost:3000/apiv1/anuncios
 */
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const anuncio = new Anuncio(data);
    const anuncioGuardado = await anuncio.save();
    res.json({ success: true, result: anuncioGuardado });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /anuncios/:id
 * Actualiza un anuncio
 * http://localhost:3000/apiv1/anuncios/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;

    const anuncioActualizado = await Anuncio.findByIdAndUpdate(
      { _id: _id },
      data,
      { new: true }
    ).exec();
    res.json({ success: true, result: anuncioActualizado });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
