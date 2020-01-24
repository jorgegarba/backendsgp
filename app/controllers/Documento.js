"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
exports.createDocumento = (req, res) => {
    let objDocumento = sequelize_1.Documento.build(req.body);
    sequelize_1.Proveedor.findByPk(req.body.prov_id).then((proveedor) => {
        if (proveedor) {
            return objDocumento.save();
        }
        else {
            res.status(404).json({
                ok: false,
                content: 'No hay ese proveedor en la base de datos'
            });
        }
    }).then((documentocreado) => {
        res.status(201).json({
            ok: true,
            content: documentocreado
        });
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error.errors
        });
    });
};
exports.getDocumento = (req, res) => {
    let { id_doc } = req.params;
    sequelize_1.Documento.findByPk(id_doc).then((objDocumento) => {
        if (objDocumento) {
            res.status(200).json({
                ok: true,
                content: objDocumento
            });
        }
        else {
            res.status(404).json({
                ok: false,
                content: 'No hay ese documento'
            });
        }
    });
};
