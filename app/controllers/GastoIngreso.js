"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
exports.createGI = (req, res) => {
    let objGI = sequelize_1.GastoIngreso.build(req.body);
    sequelize_1.Usuario.findByPk(req.body.usu_id).then((usuario) => {
        if (usuario) {
            return sequelize_1.Documento.findByPk(req.body.doc_id);
        }
        else {
            res.status(404).json({
                ok: false,
                content: 'No hay ese usuario en la base datos'
            });
        }
    }).then((documento) => {
        if (documento) {
            return objGI.save();
        }
        else {
            res.status(404).json({
                ok: false,
                content: 'No hay ese documento en la base de datos'
            });
        }
    }).then((objGIcreado) => {
        if (objGIcreado) {
            res.status(201).json({
                ok: true,
                content: objGIcreado
            });
        }
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error.errors
        });
    });
};
exports.getGI = (req, res) => {
    let { id_gi } = req.params;
    sequelize_1.GastoIngreso.findByPk(id_gi, { include: [{ model: sequelize_1.Documento, attributes: ['doc_total'] }] }).then((objGI) => {
        res.status(200).json({
            ok: true,
            content: objGI
        });
    });
};
exports.updateGI = (req, res) => {
    let { id_gi } = req.params;
    sequelize_1.Usuario.findByPk(req.body.usu_id).then((usuario) => {
        if (usuario) {
            return sequelize_1.Documento.findByPk(req.body.doc_id);
        }
        else {
            res.status(404).json({
                ok: false,
                content: 'No hay ese usuario en la base datos'
            });
        }
    }).then((documento) => {
        if (documento) {
            return sequelize_1.GastoIngreso.update(req.body, { where: { gasin_id: id_gi } });
        }
        else {
            res.status(404).json({
                ok: false,
                content: 'No hay ese documento en la base de datos'
            });
        }
    }).then((objGI) => {
        res.status(200).json({
            ok: true,
            content: objGI
        });
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error
        });
    });
};
