"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.categoria_model = (conexion) => {
    const modelo = conexion.define("Categoria", {
        cat_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        cat_nom: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: false
        },
        cat_desc: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: "t_categoria",
        timestamps: true
    });
    return modelo;
};
