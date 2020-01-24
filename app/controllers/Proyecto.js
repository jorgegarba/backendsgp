"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.getProyectos = (req, res) => {
    // findAll() => trae todos los registros del modelo Proyecto
    sequelize_1.Proyecto.findAll().then((arregloProyectos) => {
        let rpta = {
            ok: true,
            content: arregloProyectos
        };
        res.json(rpta);
    });
};
exports.postProyecto = (req, res) => {
    // objProyecto => pro_nom,pro_fechin,pro_fechfin...
    sequelize_1.Proyecto.build(req.body).save().then((proyectoCreado) => {
        res.status(201).json({
            ok: true,
            content: proyectoCreado
        });
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error
        });
    });
};
exports.updateProyecto = (req, res) => {
    let { id_proyecto } = req.params;
    let { nombre, fecha_inicio, fecha_fin, presupuesto, estado } = req.body;
    let objProyecto = {
        pro_nom: nombre,
        pro_fechin: fecha_inicio,
        pro_fechfin: fecha_fin,
        pro_pres: presupuesto,
        pro_est: estado
    };
    sequelize_1.Proyecto.update(objProyecto, {
        where: {
            pro_id: id_proyecto
        }
    }).then((proyectoActualizado) => {
        res.status(200).json({
            ok: true,
            content: proyectoActualizado
        });
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error.errors
        });
    });
};
exports.deleteProyecto = (req, res) => {
    let { id_proyecto } = req.params;
    sequelize_1.Proyecto.destroy({
        where: { pro_id: id_proyecto }
    }).then((proyectoEliminado) => {
        res.status(200).json({
            ok: true,
            content: proyectoEliminado
        });
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error.errors
        });
    });
};
exports.getProyectobyId = (req, res) => {
    let { id_proyecto } = req.params;
    sequelize_1.Proyecto.findByPk(id_proyecto).then((objProyecto) => {
        if (objProyecto) {
            res.status(200).json({
                ok: true,
                content: objProyecto
            });
        }
        else {
            res.status(404).json({
                ok: true,
                content: "No hay un projecto con ese ID"
            });
        }
    });
};
