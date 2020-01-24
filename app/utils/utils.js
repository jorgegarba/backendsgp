"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
exports.verifcarToken = (token) => {
    try {
        // Valida la token enviada de acuerdo a su password y algoritmo, si todo es correcto, retorna un true y si algo esta mal, como su tiempo de vida, contraseña, algoritmo o longitud de la token, retorna un false
        let data = jwt.verify(token, 'sapeee', { algorithm: 'RS256' });
        return data;
    }
    catch (error) {
        return null;
    }
};
// MIDDLEWARE ó WATCHMEN
exports.wachiman = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        let resultado = exports.verifcarToken(token);
        if (resultado) {
            next();
        }
        else {
            res.status(401).json({
                ok: false,
                content: 'No esta autorizado para realizar la solicitud',
                resultado: resultado
            });
        }
    }
    else {
        res.status(401).json({
            ok: false,
            content: 'Necesita un token para realizar la solicitud'
        });
    }
};
