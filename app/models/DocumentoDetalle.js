"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.documentodetalle_model = (conexion) => {
    const modelo = conexion.define("DocumentoDetalle", {
        docd_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        docd_cant: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        docd_punit: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        docd_tot: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: "t_documentodetalle",
        timestamps: true
    });
    return modelo;
};
