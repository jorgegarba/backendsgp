"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
exports.RegistrarUsuario = (req, res) => {
    sequelize_1.Usuario.findAll({
        where: { usu_email: req.body.usu_email }
    }).then((usuarios) => {
        if (usuarios.length != 0) {
            res.status(204).json({
                ok: false,
                content: `El usuario con email ${req.body.usu_email} ya existe!`
            });
        }
        else {
            // Instanciar un objeto de mi usuario
            let objUsuario = sequelize_1.Usuario.build(req.body);
            objUsuario.setSaltAndHash(req.body.password);
            objUsuario.save().then((usuarioCreado) => {
                // AGREGAR EL TOKEN LUEGO DEL REGISTRO DE UN USUARIO
                let token = usuarioCreado.generarJWT();
                res.status(201).json({
                    ok: true,
                    content: `Usuario ${usuarioCreado.usu_email} creado con exito`,
                    token: token
                });
            });
        }
    });
};
exports.Login = (req, res) => {
    let { correo, password } = req.body;
    sequelize_1.Usuario.findOne({
        where: {
            usu_email: correo
        }
    }).then((objUsuario) => {
        if (objUsuario) {
            // Tengo que validar si la contraseña es la correcta
            let validacion = objUsuario.validarPassword(password);
            if (validacion) {
                let token = objUsuario.generarJWT();
                res.status(200).json({
                    ok: true,
                    token,
                    content: 'Usuario correctamente logeado'
                });
            }
            else {
                res.status(404).json({
                    ok: false,
                    content: 'Usuario o contraseña incorrectos'
                });
            }
        }
        else {
            res.status(404).json({
                ok: false,
                content: 'Usuario no registrado'
            });
        }
    });
};
