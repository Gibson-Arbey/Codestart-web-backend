const express = require("express");
const cors = require("cors");
const path = require("path");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;


    this.paths = {
      // APPs
      usuario: "/usuario",
      tema: "/tema",
      resultado: "/resultado"
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      }),
    );
  }

  routes() {
    // routes APPs
    this.app.use(this.paths.usuario, require("../routes/usuario.routes"));
    this.app.use(this.paths.tema, require("../routes/tema.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
