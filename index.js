"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./app/config/server");
let objServidor = new server_1.Server();
objServidor.start();
