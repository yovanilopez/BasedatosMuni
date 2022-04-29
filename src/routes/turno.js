const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');

//Obtener revision
router.get("/turno", (req, res) => {
    console.log("Obteniendo Lista turno");
    mysqlConnection.query('Select * from turno', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear revision
router.post('/turno', (req, res) => {
    let per = req.body;
    console.log('Creando turno')
mysqlConnection.query('insert into turno (FechaInicio,FechaFin,NumeroTurno) values (?,?,?)',
        [per.FechaInicio, per.FechaFin,per.NumeroTurno], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Revision Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});

//obtener revision por Id
router.get("/turno/:IdTurno", (req, res) => {
    console.log("Obteniendo turno");
    mysqlConnection.query('Select * from turno where IdTurno= ?', [req.params.IdTurno], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar revision
router.put("/turno/:IdTurno", (req, res) => {
    console.log("Actualizando turno");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update turno set  FechaInicio = ?, FechaFin = ? , NumeroTurno = ? where IdTurno= ?',
        [ est.FechaInicio, est.FechaFin,est.NumeroTurno, req.params.IdTurno], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("turno Actualizado ");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar revision
router.delete("/turno/:IdTurno", (req, res) => {
    console.log("Eliminando turno");
    mysqlConnection.query('delete from turno where turno.Idturno = ?',
        [req.params.IdRevision], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("turno Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});



module.exports = router;