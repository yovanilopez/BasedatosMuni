const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');

//Obtener persona
router.get("/pagos", (req, res) => {
    console.log("Obteniendo Lista pagos");
    mysqlConnection.query('Select * from pagos', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear persona
router.post('/pagos', (req, res) => {
    let per = req.body;
    console.log('Creando pagos')
mysqlConnection.query('insert into pagos (Multa,Moras,PagoLinea) values (?,?,?)',
        [per.Multa, per.Moras,per.PagoLinea], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});

//Obtener persona por id
router.get("/pagos/:IdPagos", (req, res) => {
    console.log("Obteniendo Pagos");
    mysqlConnection.query('Select * from pagos where IdPagos= ?', [req.params.IdPagos], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


//Actualizar persona
router.put("/pagos/:IdPagos", (req, res) => {
    console.log("Actualizando Pago");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update pagos set  Multa = ?, Moras = ?, PagoLinea = ? where IdPagos= ?',
        [ est.Multa, est.Moras,est.PagoLinea, req.params.IdPagos], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("pago Actualizado ");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar persona
router.delete("/pagos/:IdPagos", (req, res) => {
    console.log("Eliminando Pago");
    mysqlConnection.query('delete from pagos where pagos.IdPagos = ?',
        [req.params.IdPagos], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Pago Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

















module.exports = router;
