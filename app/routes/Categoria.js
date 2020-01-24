"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Categoria_1 = require("./../controllers/Categoria");
const express_1 = require("express");
exports.categoria_router = express_1.Router();
exports.categoria_router.post('/categoria', Categoria_1.postCategoria);
exports.categoria_router.get('/categorias', Categoria_1.getCategorias);
