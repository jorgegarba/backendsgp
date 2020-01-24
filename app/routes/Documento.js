"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Documento_1 = require("../controllers/Documento");
exports.documento_router = express_1.Router();
exports.documento_router.post('/documento', Documento_1.createDocumento);
exports.documento_router.get('/documento/:id_doc', Documento_1.getDocumento);
