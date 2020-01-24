"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
// let registrarGasto = async (objDocumento, objGastoIngreso, arrDocumentoDetalle) => {
/**
 * 0. Crear el objeto transacshon
 * 0> ejemplo
 *    const t = await conexion.transaction();
 * 1. Crear el objDocumento
 * 1.ejemplo>
 *  let documentoCreado = await Documento.create(objDocumento,{ transaction: t })
 * 2. Coger el id del objDocumento creado con un await
 * let doc_id = documentoCreado.doc_id
 *  3. al objGastoIngreso, agregarle el doc_id
 * 3 ejemplo>
 *  objGastoIngreso.doc_id = doc_id;
 * 4. Crear el GastoIngreso
 * 5. Con un for hacer algo parecido a lo siguiente
 * for (let i = 0; i < arrDocumentoDetalle.length; i++) {
 *  arrDocmentoDetalle[i].doc_id = doc_id;
    await DocumentoDetalle.create(arrDocumentoDetalle[i],
      { transaction: t });
  }
 */
// }
let crearPrespuestos = (arrPrespuestos) => __awaiter(void 0, void 0, void 0, function* () {
    // Creando el objeto para la 'transaction'
    const t = yield sequelize_1.conexion.transaction();
    try {
        for (let i = 0; i < arrPrespuestos.length; i++) {
            yield sequelize_1.PresupuestoProyecto.create(arrPrespuestos[i], { transaction: t });
        }
        yield t.commit();
        return true;
    }
    catch (error) {
        console.log("Error en la transacción");
        console.log(error);
        t.rollback();
        throw error;
    }
});
exports.postPresupuestos = (req, res) => {
    console.log(req.body);
    crearPrespuestos(req.body).then((rpta) => {
        res.status(201).json({
            ok: true,
            content: 'Presupuestos creados de manera exitosa'
        });
    }).catch((error) => {
        res.status(500).json({
            ok: false,
            content: error,
            message: ' Ocurrió un error en la creación'
        });
    });
};
exports.getPresupuestoByProId = (req, res) => {
    // Retornar un arreglo de Presupuestos 
    // que le pertenezcan al proyecto con 'pro_id' recibido en el req.params
    // A tomar en cuenta, cada objeto Presupuesto, debe incluir la informacion
    // de los modelo UnidadMedida y Recurso
    let { pro_id } = req.params;
    sequelize_1.PresupuestoProyecto.findAll({
        where: {
            pro_id: pro_id
        },
        include: [
            { model: sequelize_1.UnidadMedida },
            { model: sequelize_1.Recurso }
        ]
    }).then((presupuestos) => {
        if (presupuestos) {
            res.status(200).json({
                ok: true,
                content: presupuestos
            });
        }
        else {
            res.status(500).json({
                ok: false,
                content: "Error en la consulta"
            });
        }
    });
};
