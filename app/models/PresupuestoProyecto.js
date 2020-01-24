"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.presupuestoproyecto_model = (conexion) => {
    const modelo = conexion.define("PresupuestoProyecto", {
        pp_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        pp_cant: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        pp_puni: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        pp_tot: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: "t_presupuestoproyecto",
        timestamps: true
    });
    return modelo;
};
