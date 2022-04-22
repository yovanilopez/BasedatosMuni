const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');

//Obtener persona
router.get("/revision", (req, res) => {
    console.log("Obteniendo Lista revision");
    mysqlConnection.query('Select * from revision', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear persona
router.post('/revision', (req, res) => {
    let per = req.body;
    console.log('Creando revision')
mysqlConnection.query('insert into revision (Luces,Identificacion,Papeles) values (?,?,?)',
        [per.Luces, per.Identificacion,per.Papeles], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Revision Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});

router.get("/revision/:IdRevision", (req, res) => {
    console.log("Obteniendo revision");
    mysqlConnection.query('Select * from revision where IdRevision= ?', [req.params.IdRevision], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar persona
router.put("/revision/:IdRevision", (req, res) => {
    console.log("Actualizando revision");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update revision set  Luces = ?, Identificacion = ? , Papeles = ? where IdRevision= ?',
        [ est.Luces, est.Identificacion,est.Papeles, req.params.IdRevision], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("revision Actualizado ");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar persona
router.delete("/revision/:IdRevision", (req, res) => {
    console.log("Eliminando Revision");
    mysqlConnection.query('delete from Revision where revision.IdRevision = ?',
        [req.params.IdRevision], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("revision Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});



module.exports = router;