"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.postFamilia = (req, res) => {
    let objFamilia = sequelize_1.Familia.build(req.body);
    objFamilia.save().then((objFamiliaC) => {
        if (objFamiliaC) {
            res.status(201).json({
                ok: true,
                content: objFamiliaC
            });
        }
        else {
            res.status(204).json({
                ok: false,
                content: "No se pudo crear el recurso"
            });
        }
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error
        });
    });
};
exports.getFamilia = (req, res) => {
    sequelize_1.Familia.findAll().then((familias) => {
        res.status(200).json({
            ok: true,
            content: familias
        });
    });
};
