const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');




router.post('/vehiculo', (req, res) => {
    let per = req.body;
    console.log('Creando persona')
mysqlConnection.query('insert into vehiculo (NumeroVehiculo,NumeroPlaca,Color,TurnoTransitar,NumeroLinea,IdPersona,IdEvidencias,IdPagos,IdRevision) values (?,?,?,?,?,?,?,?,?)',
        [per.NumeroVehiculo, per.NumeroPlaca,per.Color,per.TurnoTransitar,per.NumeroLinea,per.IdPersona,per.IdEvidencias,per.IdPagos,per.IdRevision], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Persona Creado ");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});

//Obtener persona
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

//Obtener persona por id
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

//Actualizar persona
router.put("/vehiculo/:NumeroPlaca", (req, res) => {
    console.log("Actualizando vehiculo");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update vehiculo set  NumeroVehiculo = ?, Color = ?, TurnoTransitar = ?, NumeroLinea = ?,IdPersona=?,IdEvidencias=?,IdPagoS=?,IdRevision=? where NumeroPlaca= ?',
        [ est.NumeroVehiculo, est.Color,est.TurnoTransitar,est.NumeroLinea,est.IdPersona,est.IdEvidencias,est.IdPagos,est.IdRevision, req.params.NumeroPlaca], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("vehiculo Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar persona
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

