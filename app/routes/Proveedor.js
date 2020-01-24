"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Proveedor_1 = require("../controllers/Proveedor");
exports.proveedor_router = express_1.Router();
exports.proveedor_router.post('/proveedor', Proveedor_1.crearProveedor);
exports.proveedor_router.get('/proveedor/:id_prov', Proveedor_1.getProveedor);
exports.proveedor_router.put('/proveedor/:id_prov', Proveedor_1.updateProveedor);
