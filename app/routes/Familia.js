"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Familia_1 = require("./../controllers/Familia");
const express_1 = require("express");
exports.familia_router = express_1.Router();
exports.familia_router.post('/familia', Familia_1.postFamilia);
exports.familia_router.get('/familia', Familia_1.getFamilia);
