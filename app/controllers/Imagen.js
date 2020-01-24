"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
// file system => libreria propia de node para manejar archivos
var fs = require('fs');
// path_module => libreria propia de node para manejar archivos
var path_module = require('path');
exports.subirImagen = (req, res) => {
    try {
        // imagen => es el nombre de mi llave donde va a estar alojado mi archivo
        let ruta = req.files.imagen.path;
        let nombreYExtension = ruta.split("\\")[1];
        sequelize_1.Imagen.build({
            doc_id: req.body.doc_id,
            ima_url: nombreYExtension
        }).save().then((objImagen) => {
            res.status(201).json({
                ok: true,
                content: objImagen
            });
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            content: 'No se ha seleccionado ningun archivo'
        });
    }
};
exports.eliminarImagen = (req, res) => {
    let { id_img } = req.params;
    var url = "";
    sequelize_1.Imagen.findByPk(id_img).then((imagen) => {
        if (imagen) {
            url = imagen.ima_url;
            return sequelize_1.Imagen.destroy({ where: { ima_id: id_img } });
        }
        else {
            res.status(404).json({
                ok: false,
                content: 'No hay esa imagen en la base de datos'
            });
        }
    }).then((objImagen) => {
        // https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback
        fs.unlink(`imagenes/${url}`, (err) => {
            if (!err) {
                res.status(200).json({
                    ok: true,
                    content: 'Imagen eliminada con exito'
                });
            }
            else {
                console.log(err);
                res.status(500).json({
                    ok: false,
                    content: 'Hubo un error al eliminar la imagen'
                });
            }
        });
    });
};
exports.getImagenById = (req, res) => {
    let { id_img } = req.params;
    sequelize_1.Imagen.findByPk(id_img).then((objImagen) => {
        let imagenDefault = 'imagenes/default.jpg';
        if (objImagen) {
            let ruta = `imagenes/${objImagen.ima_url}`;
            // metodo que verifica si existe la ruta, devuelve un true si la encuentra y un false si no existe
            // https://nodejs.org/api/fs.html#fs_fs_existssync_path
            if (fs.existsSync(ruta)) {
                // https://nodejs.org/api/path.html#path_path_resolve_paths
                return res.sendFile(path_module.resolve(ruta));
            }
            else {
                return res.sendFile(path_module.resolve(imagenDefault));
            }
        }
        else {
            return res.sendFile(path_module.resolve(imagenDefault));
        }
    });
};
exports.updateImagenById = (req, res) => {
    // Editar una imagen, subir otra y eliminar la anterior del servidor
    let { id_img } = req.params;
    sequelize_1.Imagen.findByPk(id_img).then((objImagen) => {
        fs.unlink(`imagenes/${objImagen.ima_url}`, (err) => {
            if (!err) {
                try {
                    // imagen => es el nombre de mi llave donde va a estar alojado mi archivo
                    let ruta = req.files.imagen.path;
                    let nombreYExtension = ruta.split("\\")[1];
                    sequelize_1.Imagen.update({
                        ima_url: nombreYExtension
                    }, { where: {
                            ima_id: objImagen.ima_id
                        } }).then((objImagen) => {
                        res.status(201).json({
                            ok: true,
                            content: 'Imagen actualizada con exito'
                        });
                    });
                }
                catch (error) {
                    console.log(error);
                    res.status(404).json({
                        ok: false,
                        content: 'No se ha seleccionado ningun archivo'
                    });
                }
            }
            else {
                console.log(err);
                res.status(500).json({
                    ok: false,
                    content: 'Hubo un error al actualizar la imagen'
                });
            }
        });
    });
};
