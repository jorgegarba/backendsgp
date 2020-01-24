"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GastoIngreso_1 = require("../controllers/GastoIngreso");
exports.gi_router = express_1.Router();
exports.gi_router.post('/gastoIngreso', GastoIngreso_1.createGI);
exports.gi_router.get('/gastoIngreso/:id_gi', GastoIngreso_1.getGI);
exports.gi_router.put('/gastoIngreso/:id_gi', GastoIngreso_1.updateGI);
