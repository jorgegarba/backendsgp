"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PresupuestoProyecto_1 = require("../controllers/PresupuestoProyecto");
const utils_1 = require("../utils/utils");
exports.presupuestoproyecto_router = express_1.Router();
exports.presupuestoproyecto_router.post('/presupuestoproyecto/varios', utils_1.wachiman, PresupuestoProyecto_1.postPresupuestos);
exports.presupuestoproyecto_router.get('/presupuestoproyecto/proyecto/:pro_id', utils_1.wachiman, PresupuestoProyecto_1.getPresupuestoByProId);
