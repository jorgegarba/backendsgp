"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
exports.crearProveedor = (req, res) => {
    let objProveedor = sequelize_1.Proveedor.build(req.body);
    sequelize_1.Proveedor.findAll({ where: {
            prov_ruc: req.body.prov_ruc
        } }).then((proveedores) => {
        if (proveedores.length != 0) {
            return res.status(500).json({
                ok: false,
                content: 'Ya hay ese proveedor registrado con ese RUC'
            });
        }
        else {
            return objProveedor.save();
        }
    }).then((proveedor) => {
        return res.status(201).json({
            ok: true,
            content: proveedor
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            content: error.errors
        });
    });
};
exports.getProveedor = (req, res) => {
    let { id_prov } = req.params;
    sequelize_1.Proveedor.findByPk(id_prov).then((proveedor) => {
        res.status(200).json({
            ok: true,
            content: proveedor
        });
    });
};
exports.updateProveedor = (req, res) => {
    let { id_prov } = req.params;
    sequelize_1.Proveedor.update(req.body, { where: { prov_id: id_prov } }).then((proveedor) => {
        res.status(200).json({
            ok: true,
            content: proveedor
        });
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error.errors
        });
    });
};
