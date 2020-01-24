"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UnidadMedida_1 = require("../controllers/UnidadMedida");
exports.unidadmedida_router = express_1.Router();
exports.unidadmedida_router.get("/um", UnidadMedida_1.getUnidadMedidas);
exports.unidadmedida_router.post("/um", UnidadMedida_1.postUnidadMedida);
exports.unidadmedida_router.get("/um/:nombre", UnidadMedida_1.getUnidadMedidaByNombre);
