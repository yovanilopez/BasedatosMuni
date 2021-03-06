const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');



//crear vehiculo
router.post('/vehiculo', (req, res) => {
    let per = req.body;
    console.log('Creando persona')
mysqlConnection.query('insert into vehiculo (NumeroVehiculo,NumeroPlaca,Color,NumeroLinea,IdPersona,IdEvidencias,IdPagos,IdRevision,IdTurno) values (?,?,?,?,?,?,?,?,?)',
        [per.NumeroVehiculo, per.NumeroPlaca,per.Color,per.NumeroLinea,per.IdPersona,per.IdEvidencias,per.IdPagos,per.IdRevision,per.IdTurno], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("vehiculo Creado ");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});

//Obtener vehiculo
router.get("/vehiculo", (req, res) => {
    console.log("Obteniendo Lista vehiculo");
    mysqlConnection.query('Select * from vehiculo', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener vehiculo por id
router.get("/vehiculo/:NumeroPlaca", (req, res) => {
    console.log("Obteniendo vehiculo");
    mysqlConnection.query('Select * from vehiculo where NumeroPlaca= ?', [req.params.NumeroPlaca], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar vehiculo
router.put("/vehiculo/:NumeroPlaca", (req, res) => {
    console.log("Actualizando vehiculo");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update vehiculo set  NumeroVehiculo = ?, Color = ?, NumeroLinea = ?,IdPersona=?,IdEvidencias=?,IdPagoS=?,IdRevision=?,IdTurno=?  where NumeroPlaca= ?',
        [ est.NumeroVehiculo, est.Color,est.NumeroLinea,est.IdPersona,est.IdEvidencias,est.IdPagos,est.IdRevision,est.IdTurno, req.params.NumeroPlaca], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("vehiculo Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar vehiculo
router.delete("/vehiculo/:NumeroPlaca", (req, res) => {
    console.log("Eliminando vehiculo");
    mysqlConnection.query('delete from vehiculo where vehiculo.NumeroPlaca = ?',
        [req.params.NumeroPlaca], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("vehiculo Borrado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


module.exports = router;

