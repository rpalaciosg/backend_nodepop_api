# NodePop

![imagen del home de nodepop](nodepop/public/images/Documentación/home_site.png?raw=true "home site nodepop")


<!-- code_chunk_output -->
## Tabla de conenidos
- [NodePop](#nodepop)
  - [Tabla de conenidos](#tabla-de-conenidos)
  - [Introduction](#introduction)
  - [Overview](#overview)
    - [MongoDB](#mongodb)
    - [Instalación de dependencias](#instalación-de-dependencias)
    - [Inicializar Base de Datos](#inicializar-base-de-datos)
    - [Iniciar App](#iniciar-app)
  - [Autenticación](#autenticación)
  - [Codigos de Error](#codigos-de-error)
  - [Solicitudes límite](#solicitudes-límite)
- [API Methods (NodePop)](#api-methods-nodepop)
  - [Recursos](#recursos)
  - [Endpoint `/anuncios`](#endpoint-anuncios)
  - [[GET] Lista de Anuncios](#get-lista-de-anuncios)
    - [Definición](#definición)
    - [Resultado del ejemplo](#resultado-del-ejemplo)
  - [[GET] Lista de Anuncios Paginados, filtros y campos de búsqueda](#get-lista-de-anuncios-paginados-filtros-y-campos-de-búsqueda)
    - [Definición](#definición-1)
    - [Parametros](#parametros)
      - [Query Params](#query-params)
      - [Campos de búsqueda](#campos-de-búsqueda)
    - [Ejemplos de peticiones](#ejemplos-de-peticiones)
      - [Ejemplo 1: Seleccionar campos específicos](#ejemplo-1-seleccionar-campos-específicos)
        - [Resultado del Ejemplo 1](#resultado-del-ejemplo-1)
      - [Ejemplo 2: Omitir campo id](#ejemplo-2-omitir-campo-id)
        - [Resultado del Ejemplo 2](#resultado-del-ejemplo-2)
      - [Ejemplo 3: Ordenar por campos](#ejemplo-3-ordenar-por-campos)
        - [Resultado del Ejemplo 3](#resultado-del-ejemplo-3)
      - [Ejemplo 4: petición filtro por tipo de anuncio](#ejemplo-4-petición-filtro-por-tipo-de-anuncio)
        - [Resultado del Ejemplo 4](#resultado-del-ejemplo-4)
      - [Ejemplo 5: Filtro por tags](#ejemplo-5-filtro-por-tags)
        - [Resultado del Ejemplo 5](#resultado-del-ejemplo-5)
      - [Ejemplo 6: Filtro por rango de precio](#ejemplo-6-filtro-por-rango-de-precio)
        - [Resultado del Ejemplo 6](#resultado-del-ejemplo-6)
        - [Resultado de Error en Ejemplo 6](#resultado-de-error-en-ejemplo-6)
      - [Ejemplo 7: Búsqueda por nombre](#ejemplo-7-búsqueda-por-nombre)
        - [Resultado del Ejemplo 7](#resultado-del-ejemplo-7)
  - [[GET] Consultar un Anuncio](#get-consultar-un-anuncio)
    - [Definición](#definición-2)
    - [Parametros](#parametros-1)
      - [Path Params](#path-params)
    - [Ejemplo de peticiones](#ejemplo-de-peticiones)
    - [Resultado del ejemplo](#resultado-del-ejemplo-1)
  - [[GET] Listar Tags](#get-listar-tags)
    - [Definición](#definición-3)
    - [Resultado del ejemplo](#resultado-del-ejemplo-2)
  - [[POST] Crear un Anuncio](#post-crear-un-anuncio)
    - [Definición](#definición-4)
    - [Parametros](#parametros-2)
      - [Body Params](#body-params)
    - [Ejemplo](#ejemplo)
    - [Resultado del ejemplo](#resultado-del-ejemplo-3)
  - [[PUT] Actualizar un Anuncio](#put-actualizar-un-anuncio)
    - [Definición](#definición-5)
    - [Parametros](#parametros-3)
      - [Body Params](#body-params-1)
    - [Ejemplo](#ejemplo-1)
    - [Resultado del ejemplo](#resultado-del-ejemplo-4)
- [WebSite NodePop](#website-nodepop)
  - [Ejemplo 1 - Filtro por tags](#ejemplo-1---filtro-por-tags)
  - [Ejemplo 2 - Filtro por tipo de anuncio](#ejemplo-2---filtro-por-tipo-de-anuncio)

<!-- /code_chunk_output -->


## Introduction
- Proyecto backend del API de la app Nodepop, creada como practica parte del curso de Desarrollo Backend con Node.js del Bootcamp Web 7 de Keepcoding.
- El servicio mantiene anuncios de compra o venta de artículos y permite consultar,  y buscar filtros por varios criterios.
- Además puedes visitar un site con los anuncios en la base de datos de nodepop después de iniciar la app ingresando al url [http://localhost:3000/](http://localhost:3000/).

## Overview

- **Tecnologías:** Este proyecto usa EXPRESS, MongoDB, mongoose y Node.js. Se puede conocer las dependencias en `package.json`.

- El Api de nodepop esta basada en principios REST y usa los métodos HTTP(GET y POST) para acceder a los recursos. 

- El formato de transferencia soportado por el API para enviar y recibir respuestas es en JSON.

- Como alternativa a esta se puede revisar la documentacion en línea [aquí](https://documenter.getpostman.com/view/3162339/SVn3sFCr).

### MongoDB
Para este proyecto es necesario tener instalado MongoDB. Primero vamos a arrancar un servidor MongoDB local escribiendo la siguiente lìnea en un terminal:

```shell
> ./bin/mongod --dbpath ./data/db --directoryperdb
```

### Instalación de dependencias
Un paso importante antes de arrancar el servidor es instalar todas las dependencias del proyecto. Para hacerlo, en un terminal ejecutamos lo siguiente:

```shell
> npm install
```

### Inicializar Base de Datos
En este proceso se crearà y cargará una colección de documentos de la base de datos necesaria para el funcionamiento de la aplicación 'nodepop', para esto ejecutamos el script `installDB` dentro del package.json:
```shell
> npm run installDB
```

### Iniciar App
Hay varias formas de iniciar o arrancar nodepop:
- En modo DEBUG para el desarrollo, ejecutamos en un terminal:
```shell
> npm run dev
```
- En modo Produción, ejecutamos:
```shell
> npm run prod
```

> Puedes conocer mas revisando el apartado `scripts` en el archivo de configuración *package.json*

## Autenticación
Todavía no cuenta con autenticación.

## Codigos de Error
¿Que error y códigos de estado puede esperar un usuario?

El API devuelve un json, el cual cuenta con una propiedad booleana `success`, la cual estará en `true` cuando la respuesta se ha resuelto satisfactoriamente, pero en caso de error el campo `success` estará en `false` se pasará un campo `error` con el mensaje de el error.

```json
{
 "success": false,
 "error": "Mensaje del error"
}
```

## Solicitudes límite
Al estar en desarrollo actualmente no hay límite en la cantidad de solicitudes.



# API Methods (NodePop)

## Recursos 
Los recursos son todos los métodos, y filtros aplicados o disponibles para un endpoint en este caso el endpoint  `/anuncios`:
- `/anuncios/` - obtener todos los anuncios de nodepop.
- `/anuncios/:id` - obtener un anuncio específico.
- `/anuncios/tags` - obtener una lista con los tags existentes.

## Endpoint `/anuncios`

El endpoint **/anuncios** en nuestra API nos permite consultar, paginar, y filtrar datos de todos los anuncios registrados en la base de datos MongoDB de nuestra aplicación `Nodepop`.

## [GET] Lista de Anuncios

### Definición
*[GET]* [http://localhost:3000/apiv1/anuncios](http://localhost:3000/apiv1/anuncios)

**GET** /apiv1/anuncios

### Resultado del ejemplo

```JSON
{
    "success": true,
    "anuncios": [
        {
            "tags": [
                "lifestyle",
                "motor"
            ],
            "_id": "5d84855afcc9025b29f6d3b8",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "__v": 0
        },
        {
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "_id": "5d84855afcc9025b29f6d3b9",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "iphone.png",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3ba",
            "nombre": "Teclado",
            "venta": true,
            "precio": 65,
            "foto": "teclado.png",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bb",
            "nombre": "Mouse",
            "venta": false,
            "precio": 29,
            "foto": "mouse.png",
            "__v": 0
        }
    ]
}
```

Recurso del endpoint /anuncios que retorna una lista de todos anuncios.

## [GET] Lista de Anuncios Paginados, filtros y campos de búsqueda

### Definición
`http://localhost:3000/apiv1/anuncios?start=:skip&limit=:limit&fields=:campo1 :campo2 :campoN&sort=:campo1 :campoN`

### Parametros

#### Query Params
- **start** : _`integer`_ Desde que anuncio se quiere consultar
- limit : _`integer`_ Cantidad de anuncios a partir del inicio que desea retornar.
- **fields** : _`string`_ Campos que se quiere seleccionar aparezcan en la consulta.
- **sort** : _`string`_ Campos por los que se quiere ordenar. Ordena de forma ascendente por defecto.
  - Descendente: En caso de querer ordenar de forma descendente se agrega el signo menos (-) antes del campo por el que se quiere ordenar como por ejemplo `precio` .
- **filter** : _`string`_ Criterios de búsqueda por campos:
  - tags = deben estar entre estas opciones [work, lifestyle, motor, mobile]
  - venta = puede ser [true o false]
  - precio =  _`numeric`_ Rango de precios, el primer rango (rango inicial) siempre debe ser menor que el segundo rango.
    - 10-50 : busca precio entre estos valores pasados.
    - 10- : busca valores que tengan precio > (mayor) a este valor pasado.
    - -50 : busca valores que tengan precio < (menor) a este valor pasado.
    - 30 : busca valores que tengan el precio = (igual) a este valor pasado.
  
#### Campos de búsqueda
  - nombre = _`string`_ Busca en el nombre de los anuncios que empiecen con la cadena que se pase en este parámetro de búsqueda.

**GET** /apiv1/anuncios
Devuelve un listado de anuncios de acuerdo a los parámetros ya sea de filtro, ordenación, selección o búsqueda que se agregue al URL.

### Ejemplos de peticiones

#### Ejemplo 1: Seleccionar campos específicos
*[GET]* [http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre precio](http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre%20precio)

##### Resultado del Ejemplo 1

```json
{
    "success": true,
    "results": [
        {
            "_id": "5d84855afcc9025b29f6d3b8",
            "nombre": "Bicicleta",
            "precio": 230.15
        },
        {
            "_id": "5d84855afcc9025b29f6d3b9",
            "nombre": "iPhone 3GS",
            "precio": 50
        }
    ]
}
```

Esta petición devuelve anuncios con paginacion de 0 a 2 y seleccionando solo los campos `nombre` y `precio`

#### Ejemplo 2: Omitir campo id
*[GET]* [http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre precio -_id](http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre%20precio%20-_id)

##### Resultado del Ejemplo 2
```json
{
    "success": true,
    "results": [
        {
            "nombre": "Bicicleta",
            "precio": 230.15
        },
        {
            "nombre": "iPhone 3GS",
            "precio": 50
        }
    ]
}
```
Esta petición nos devuelve los eventos sin mostrar el campo _id.

#### Ejemplo 3: Ordenar por campos
*[GET]* [http://localhost:3000/apiv1/anuncios?start=0&limit=2&sort= precio](http://localhost:3000/apiv1/anuncios?start=0&limit=2&sort=precio)

##### Resultado del Ejemplo 3
```json
{
    "success": true,
    "results": [
        {
            "tags": [
            "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bd",
            "nombre": "Cubo rubik",
            "venta": true,
            "precio": 15,
            "foto": "cubo_rubik.jpg",
            "__v": 0
        },
        {
            "tags": [
            "work",
            "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bb",
            "nombre": "Mouse",
            "venta": false,
            "precio": 29,
            "foto": "mouse.png",
            "__v": 0
        }
    ]
}
```
Esta petición me devolverá eventos ordenando según el campo que le pase al parámetro `sort`.

#### Ejemplo 4: petición filtro por tipo de anuncio
*[GET]* [http://localhost:3000/apiv1/anuncios?venta=true](http://localhost:3000/apiv1/anuncios?venta=true)

##### Resultado del Ejemplo 4
```json
{
    "success": true,
    "results": [
        {
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "_id": "5d84855afcc9025b29f6d3b9",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "iphone.png",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bb",
            "nombre": "Mouse",
            "venta": false,
            "precio": 29,
            "foto": "mouse.png",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bf",
            "nombre": "Mochila",
            "venta": false,
            "precio": 40,
            "foto": "mochila.png",
            "__v": 0
        }
    ]
}
```
Esta petición nos permite filtrar anuncios según el tipo, en venta si el parametros es true y compra si el parámetro es false.

#### Ejemplo 5: Filtro por tags
*[GET]* [http://localhost:3000/apiv1/anuncios?tags=mobile motor](http://localhost:3000/apiv1/anuncios?tags=mobile%20motor)

##### Resultado del Ejemplo 5
```json
{
    "success": true,
    "results": [
        {
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "_id": "5d84855afcc9025b29f6d3b9",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "iphone.png",
            "__v": 0
        },
        {
            "tags": [
                "mobile",
                "lifestyle" 
            ],
            "_id": "5d84855afcc9025b29f6d3be",
            "nombre": "Smartwatch",
            "venta": true,
            "precio": 40,
            "foto": "smartwatch.png",
            "__v": 0
        },
        {
            "tags": [
                "lifestyle",
                "motor"
            ],
            "_id": "5d84855afcc9025b29f6d3b8",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "__v": 0
        }
    ]
}
```
En esta petición listamos todos los anuncios cuyo campo tags contengan `mobile` y `motor`.

#### Ejemplo 6: Filtro por rango de precio
*[GET]* [http://localhost:3000/apiv1/anuncios?precio=10-30](http://localhost:3000/apiv1/anuncios?precio=10-30)

##### Resultado del Ejemplo 6
```json
{
    "success": true,
    "results": [
        {
            "tags": [
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bd",
            "nombre": "Cubo rubik",
            "venta": true,
            "precio": 15,
            "foto": "cubo_rubik.jpg",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bb",
            "nombre": "Mouse",
            "venta": false,
            "precio": 29,
            "foto": "mouse.png",
            "__v": 0
        }
    ]
}
```

La petición del ejemplo 6 nos devuelve los anuncios cuyo rango de precio este entre >= a 10 y <= a 30.


Hay que tener en cuenta que el valor del rango inicial siempre debe ser menor al rango final, en caso de ser mayor devolvera un error 422.

*[GET]* [http://localhost:3000/apiv1/anuncios?precio=30-10](http://localhost:3000/apiv1/anuncios?precio=30-10)

##### Resultado de Error en Ejemplo 6
```json
{
    "success": false,
    "error": "El primero parámetro del rango de precio debe ser menor"
}
```
#### Ejemplo 7: Búsqueda por nombre
*[GET]* [http://localhost:3000/apiv1/anuncios?nombre=bici](http://localhost:3000/apiv1/anuncios?nombre=bici)

##### Resultado del Ejemplo 7
```json
{
    "success": true,
    "results": [
        {
            "tags": [
                "lifestyle",
                "motor"
            ],
            "_id": "5d84855afcc9025b29f6d3b8",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "__v": 0
        }
    ]
}
```
Esta petición nos permite hacer una búsqueda por el campo nombre.

## [GET] Consultar un Anuncio

### Definición

*[GET]* `http://localhost:3000/apiv1/anuncios/:id`

### Parametros

#### Path Params

- id: **integer** Id del anuncio que desea consultar.

### Ejemplo de peticiones
*[GET]* [http://localhost:3000/apiv1/anuncios/5d84855afcc9025b29f6d3ba](http://localhost:3000/apiv1/anuncios/5d84855afcc9025b29f6d3ba)

### Resultado del ejemplo

```json
{
    "success": true,
    "result": {
        "tags": [
            "work",
            "lifestyle"
        ],
        "_id": "5d84855afcc9025b29f6d3ba",
        "nombre": "Teclado",
        "venta": true,
        "precio": 65,
        "foto": "teclado.png",
        "__v": 0
    }
}
```
Esta petición nos permite buscar un anuncio por su id.

## [GET] Listar Tags

### Definición
**GET** /apiv1/anuncios/tags

*[GET]* http://localhost:3000/apiv1/anuncios/tags

### Resultado del ejemplo

```json
{
    "success": true,
    "results": [
        "lifestyle",
        "mobile",
        "motor",
        "work"
    ]
}
```
Recurso del endpoint /anuncios/tags que retorna una lista con los tags existentes.

## [POST] Crear un Anuncio

### Definición
**POST** /apiv1/anuncios/

### Parametros

#### Body Params
- **nombre** : _`string`_ Nombre del artículo.
- **venta** : _`booleam`_ Si está en true el artículo se `vende` si está en `flase` se busca.
- **precio** : _`numeric`_ Es el precio del artículo.
- **foto** : _`string`_ Es el nombre uo URL del archivo de la foto del artículo.
- **tags** : _`list`_ Es una lista de los tags de un artículo, el cual puede tener las siguientes:  [work, lifestyle, motor, mobile]


### Ejemplo

*[POST]* http://localhost:3000/apiv1/anuncios

**Headers**
Content-Type:	`application/x-www-form-urlencoded`
**Body**
    nombre: Monitor,
    venta: false,
    precio: 200,
    foto:'',
    tags: work,
    tags: lifestyle


### Resultado del ejemplo

```json
status: 200

{
    "success": true,
    "result": {
        "tags": [
            "work",
            "lifestyle"
        ],
        "_id": "5d90a457c4d2501fec3af158",
        "nombre": "Monitor",
        "venta": false,
        "precio": 200,
        "foto": "",
        "__v": 0
    }
}
```

## [PUT] Actualizar un Anuncio

### Definición
**PUT** /apiv1/anuncios/:id

### Parametros

#### Body Params
- **nombre** : _`string`_ Nombre del artículo.
- **venta** : _`booleam`_ Si está en true el artículo se `vende` si está en `flase` se busca.
- **precio** : _`numeric`_ Es el precio del artículo.
- **foto** : _`string`_ Es el nombre uo URL del archivo de la foto del artículo.
- **tags** : _`list`_ Es una lista de los tags de un artículo, el cual puede tener las siguientes:  [work, lifestyle, motor, mobile]

### Ejemplo

*[PUT]* http://localhost:3000/apiv1/anuncios/5d90a457c4d2501fec3af158

**Headers**
Content-Type:	`application/x-www-form-urlencoded`
**Body**
    nombre: Monitor LG,
    venta: false,
    precio: 300,
    foto:'',
    tags: work

### Resultado del ejemplo

```json
status: 200

{
    "success": true,
    "result": {
        "tags": [
            "work"
        ],
        "_id": "5d90a457c4d2501fec3af158",
        "nombre": "Monitor LG",
        "venta": false,
        "precio": 300,
        "foto": "",
        "__v": 0
    }
}
```

# WebSite NodePop

Podemos ver el site en el [home](http://localhost:3000/). Aqui se listaran todos los anuncios registrados en la base de datos de la app NodePop.

Además, este site cuenta con filtros en la URL:

## Ejemplo 1 - Filtro por tags

[http://localhost:3000/?star=1&limit=3&sort=nombre&tags=work](http://localhost:3000/?star=1&limit=3&sort=nombre&tags=work)

Este filtro nos devuelve, desde el anuncio 1, limitando a 3 resultados y ordenados por el nombre, los anuncios que contengan el tag `work`.

## Ejemplo 2 - Filtro por tipo de anuncio

[http://localhost:3000/?star=1&limit=3&sort=nombre&venta=true](http://localhost:3000/?star=1&limit=3&sort=nombre&venta=true)

En este ejemplo se obtiene como resultado los anuncios que el venta venta sea `true` es de decir de tipo en venta. En caso de querer los anuncios de tipo compra. el parametro venta deberìa ser `false`.