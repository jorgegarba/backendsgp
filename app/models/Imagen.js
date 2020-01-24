"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.imagen_model = (conexion) => {
    const modelo = conexion.define("Imagen", {
        ima_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        ima_url: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: "t_imagen",
        timestamps: true
    });
    return modelo;
};
