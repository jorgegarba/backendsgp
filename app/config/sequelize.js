"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Proyecto_1 = require("./../models/Proyecto");
const sequelize_1 = require("sequelize");
const Familia_1 = require("../models/Familia");
const Proveedor_1 = require("../models/Proveedor");
const Usuario_1 = require("../models/Usuario");
const UnidadMedida_1 = require("../models/UnidadMedida");
const Categoria_1 = require("../models/Categoria");
const Documento_1 = require("../models/Documento");
const DocumentoDetalle_1 = require("../models/DocumentoDetalle");
const GastoIngreso_1 = require("../models/GastoIngreso");
const Imagen_1 = require("../models/Imagen");
const PresupuestoProyecto_1 = require("../models/PresupuestoProyecto");
const Recurso_1 = require("../models/Recurso");
// Crear la conexión colocando ell nombre del schema, usuario y contraseña
// a la base de datos
// además, se configuran parámetros de host, tipo de bd, etc, de diccha
// conexión
exports.conexion = new sequelize_1.Sequelize('4uDN1ZCLas', '4uDN1ZCLas', 'RYT4PYiSZQ', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    // se imprimirán todas las sentencias SQL cuando se haga una consulta
    // logging: console.log,
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    },
    timezone: '-05:00'
});
exports.Categoria = Categoria_1.categoria_model(exports.conexion);
exports.Documento = Documento_1.documento_model(exports.conexion);
exports.DocumentoDetalle = DocumentoDetalle_1.documentodetalle_model(exports.conexion);
exports.Familia = Familia_1.familia_model(exports.conexion);
exports.GastoIngreso = GastoIngreso_1.gastoingreso_model(exports.conexion);
exports.Imagen = Imagen_1.imagen_model(exports.conexion);
exports.PresupuestoProyecto = PresupuestoProyecto_1.presupuestoproyecto_model(exports.conexion);
exports.Proveedor = Proveedor_1.proveedor_model(exports.conexion);
exports.Proyecto = Proyecto_1.proyecto_model(exports.conexion);
exports.Recurso = Recurso_1.recurso_model(exports.conexion);
exports.UnidadMedida = UnidadMedida_1.unidadmedida_model(exports.conexion);
exports.Usuario = Usuario_1.usuario_model(exports.conexion);
// DESPUES DE DECLARAR E INICIALIZAR NUESTRAS TABLAS SE HACE LA CREACION DE LAS RELACIONES
exports.Familia.hasMany(exports.Categoria, { foreignKey: "fam_id" }); // Familia tiene uno o muchos Categorias
exports.Categoria.belongsTo(exports.Familia, { foreignKey: "fam_id" }); // Muchas categorias tiene una familia
exports.Categoria.hasMany(exports.Recurso, { foreignKey: "cat_id" });
exports.Recurso.belongsTo(exports.Categoria, { foreignKey: "cat_id" });
exports.Recurso.hasMany(exports.PresupuestoProyecto, { foreignKey: "rec_id" });
exports.PresupuestoProyecto.belongsTo(exports.Recurso, { foreignKey: "rec_id" });
exports.UnidadMedida.hasMany(exports.PresupuestoProyecto, { foreignKey: "um_id" });
exports.PresupuestoProyecto.belongsTo(exports.UnidadMedida, { foreignKey: "um_id" });
exports.Proyecto.hasMany(exports.PresupuestoProyecto, { foreignKey: "pro_id" });
exports.PresupuestoProyecto.belongsTo(exports.Proyecto, { foreignKey: "pro_id" });
exports.PresupuestoProyecto.hasMany(exports.DocumentoDetalle, { foreignKey: "pp_id" });
exports.DocumentoDetalle.belongsTo(exports.PresupuestoProyecto, { foreignKey: "pp_id" });
exports.Usuario.hasMany(exports.GastoIngreso, { foreignKey: "usu_id" });
exports.GastoIngreso.belongsTo(exports.Usuario, { foreignKey: "usu_id" });
exports.Proveedor.hasMany(exports.Documento, { foreignKey: "prov_id" });
exports.Documento.belongsTo(exports.Proveedor, { foreignKey: "prov_id" });
exports.Documento.hasMany(exports.DocumentoDetalle, { foreignKey: "doc_id" });
exports.DocumentoDetalle.belongsTo(exports.Documento, { foreignKey: "doc_id" });
exports.Documento.hasMany(exports.GastoIngreso, { foreignKey: "doc_id" });
exports.GastoIngreso.belongsTo(exports.Documento, { foreignKey: "doc_id" });
exports.Documento.hasMany(exports.Imagen, { foreignKey: "doc_id" });
exports.Imagen.belongsTo(exports.Documento, { foreignKey: "doc_id" });
exports.GastoIngreso.belongsTo(exports.Proyecto, { foreignKey: 'pro_id' });
exports.Proyecto.hasMany(exports.GastoIngreso, { foreignKey: 'pro_id' });
