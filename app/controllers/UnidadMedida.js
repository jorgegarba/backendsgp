"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
exports.postUnidadMedida = (req, res) => {
    let { nombre, abreviatura } = req.body;
    // el build a diferencia del create hace una pre comprobacion, si todo esta correcto recien lo guarda en la base de datos y por ende si algo esta mal, no lo guarda y no desperdicia el numero de la pk, a comparativa del create que si algo esta mal, no lo guarda en la base datos, pero esa pk ya se toma como usada, y la siguiente vez que guardemos ya se usara su correlativo, con el create ya no es necesario el save 
    sequelize_1.UnidadMedida.build({
        um_nom: nombre,
        um_abr: abreviatura
    }).save().then((objUnidadMedida) => {
        res.status(201).json({
            ok: true,
            content: objUnidadMedida
        });
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error.errors
        });
    });
};
exports.getUnidadMedidas = (req, res) => {
    sequelize_1.UnidadMedida.findAll().then((objUnidadMedida) => {
        res.status(200).json({
            ok: true,
            content: objUnidadMedida
        });
    });
};
exports.getUnidadMedidaByNombre = (req, res) => {
    let { nombre } = req.params;
    sequelize_1.UnidadMedida.findAll({
        where: { um_nom: nombre }
    }).then((objUnidadMedida) => {
        if (objUnidadMedida) {
            res.status(200).json({
                ok: true,
                content: objUnidadMedida
            });
        }
        else {
            res.status(200).json({
                ok: false,
                content: "No se encontro esa unidad de medida"
            });
        }
    });
};
