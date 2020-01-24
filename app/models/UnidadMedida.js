"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.unidadmedida_model = (conexion) => {
    const modelo = conexion.define("unidadmedida", {
        um_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false
        },
        um_nom: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: false
        },
        um_abr: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 't_unidadmedida',
        timestamps: true
    });
    return modelo;
};
