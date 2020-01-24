"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
exports.getRecursos = (req, res) => {
    sequelize_1.Recurso.findAll().then((arrayRecursos) => {
        if (arrayRecursos) {
            res.status(200).json({
                ok: true,
                content: arrayRecursos
            });
        }
    });
};
