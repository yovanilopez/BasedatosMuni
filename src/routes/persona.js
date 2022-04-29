const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');


//crear persona
router.post('/persona', (req, res) => {
    let per = req.body;
    console.log('Creando persona')
mysqlConnection.query('insert into persona (Nit,Nombre,Apellido, Edad,Direccion,Telefono,NumeroVehiculo) values (?,?,?,?,?,?,?)',
        [per.Nit, per.Nombre,per.Apellido,per.Edad,per.Direccion,per.Telefono,per.NumeroVehiculo], (err, result) => {
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
router.get("/persona", (req, res) => {
    console.log("Obteniendo Lista persona");
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener persona por id
router.get("/persona/:Nit", (req, res) => {
    console.log("Obteniendo persona");
    mysqlConnection.query('Select * from persona where Nit= ?', [req.params.Nit], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar persona
router.put("/persona/:Nit", (req, res) => {
    console.log("Actualizando persona");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update persona set  Nombre = ?, Apellido = ?, Edad = ?, Direccion = ?, Telefono = ?,NumeroVehiculo=? where Nit= ?',
        [ est.Nombre, est.Apellido,est.Edad,est.Direccion,est.Telefono,est.NumeroVehiculo, req.params.Nit], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Persona Actualizado ");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar persona
router.delete("/persona/:Nit", (req, res) => {
    console.log("Eliminando Persona");
    mysqlConnection.query('delete from persona where persona.Nit = ?',
        [req.params.Nit], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Persona Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;