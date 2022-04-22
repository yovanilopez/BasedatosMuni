const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');

//Obtener persona
router.get("/evidencias", (req, res) => {
    console.log("Obteniendo Lista evidencias");
    mysqlConnection.query('Select * from evidencias', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


//Crear persona
router.post('/evidencias', (req, res) => {
    let per = req.body;
    console.log('Creando evidencias')
mysqlConnection.query('insert into evidencias (Evidencia,NumeroVehiculo) values (?,?)',
        [per.Evidencia, per.NumeroVehiculo], (err, result) => {
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
router.get("/evidencias/:IdEvidencias", (req, res) => {
    console.log("Obteniendo evidencias");
    mysqlConnection.query('Select * from evidencias where IdEvidencias= ?', [req.params.IdEvidencias], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


//Actualizar persona
router.put("/evidencias/:IdEvidencias", (req, res) => {
    console.log("Actualizando evidencias");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update evidencias set  Evidencia = ?, NumeroVehiculo = ? where IdEvidencias= ?',
        [ est.Evidencia, est.NumeroVehiculo, req.params.IdEvidencias], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("evidencia Actualizado ");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar persona
router.delete("/evidencias/:IdEvidencias", (req, res) => {
    console.log("Eliminando evidencias");
    mysqlConnection.query('delete from Evidencias where evidencias.IdEvidencias = ?',
        [req.params.IdEvidencias], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("evidencia Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});



module.exports = router;