"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.documento_model = (conexion) => {
    const modelo = conexion.define("Documento", {
        doc_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        doc_tipo: {
            type: sequelize_1.DataTypes.STRING(1),
            allowNull: false
        },
        doc_total: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        doc_obs: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        doc_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: "t_documento",
        timestamps: true
    });
    return modelo;
};
