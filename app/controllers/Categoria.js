"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
// categoria controller
exports.postCategoria = (req, res) => {
    let objCategoria = sequelize_1.Categoria.build(req.body);
    sequelize_1.Familia.findByPk(req.body.fam_id).then((objFamilia) => {
        if (objFamilia) {
            return objCategoria.save();
        }
        else {
            res.status(204).json({
                ok: false,
                content: `La familia de id ${req.body.fam_id} no existe en la BD`
            });
        }
    }).then((objCategoriaC) => {
        if (objCategoriaC) {
            res.status(201).json({
                ok: true,
                content: objCategoriaC
            });
        }
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: "Error",
            error: error
        });
    });
};
exports.getCategorias = (req, res) => {
    sequelize_1.Categoria.findAll({
        include: [
            { model: sequelize_1.Familia },
            { model: sequelize_1.Recurso }
        ]
    }).then((objCategoria) => {
        res.status(200).json({
            ok: true,
            content: objCategoria
        });
    });
};
