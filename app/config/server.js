"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recurso_1 = require("./../routes/Recurso");
const Familia_1 = require("./../routes/Familia");
const sequelize_1 = require("./sequelize");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Proyecto_1 = require("../routes/Proyecto");
const UnidadMedida_1 = require("../routes/UnidadMedida");
const Usuario_1 = require("../routes/Usuario");
const Categoria_1 = require("../routes/Categoria");
const Documento_1 = require("../routes/Documento");
const GastoIngreso_1 = require("../routes/GastoIngreso");
const Proveedor_1 = require("../routes/Proveedor");
const Imagen_1 = require("../routes/Imagen");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const apidocs_json_1 = __importDefault(require("./../docs/apidocs.json"));
const PresupuestoProyecto_1 = require("../routes/PresupuestoProyecto");
class Server {
    constructor() {
        this.PUERTO = process.env.PORT || 3000;
        this.app = express_1.default();
        this.habilitarCORS();
        this.configurarBodyParser();
        this.configurarRutas();
    }
    habilitarCORS() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
    configurarBodyParser() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    configurarRutas() {
        this.app.get("/", (req, res) => {
            res.json({
                ok: true,
                message: "El servidor está activo!"
            });
        });
        this.app.use("", Categoria_1.categoria_router);
        this.app.use("", Documento_1.documento_router);
        this.app.use("", Familia_1.familia_router);
        this.app.use("", GastoIngreso_1.gi_router);
        this.app.use("", Proveedor_1.proveedor_router);
        this.app.use("", Proyecto_1.proyecto_router);
        this.app.use("", UnidadMedida_1.unidadmedida_router);
        this.app.use("", Usuario_1.usuario_router);
        this.app.use("", Imagen_1.imagen_router);
        this.app.use("", Recurso_1.recurso_router);
        this.app.use("", PresupuestoProyecto_1.presupuestoproyecto_router);
        this.app.use('/apidocs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(apidocs_json_1.default));
    }
    start() {
        this.app.listen(this.PUERTO, () => {
            console.log("Servidor corriendo perfectamente en el puerto " + this.PUERTO);
            // sync() => función que sincroniza/crea todos los modelos
            // en la base de datos
            // {force:true} => CUIDADO!, éste comando borrará todas las tablas
            // de la base de datos y las creará nuevamente.
            // {force:false} => Éste comando no borra las tablas PERO TAMPOCO 
            // agrega campos adicionales si ya han sido previamente creados
            // en un modelo.
            sequelize_1.conexion.sync({ force: false, alter: true }).then(() => {
                console.log("== BD creada con Exito ==");
            }).catch((error) => {
                console.log("== ERROR al crear la BD");
                console.log(error);
            });
        });
    }
}
exports.Server = Server;
