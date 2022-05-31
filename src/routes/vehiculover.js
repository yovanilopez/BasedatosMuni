const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');




//Obtener persona
router.get("/vehiculo-persona-pagos", (req, res) => {
    console.log("Obteniendo Lista tablamultas");
    mysqlConnection.query('select vehiculo.NumeroPlaca,vehiculo.IdVehiculo, persona.Nombre,pagos.multa from vehiculo inner join persona on vehiculo.IdPersona=persona.IdPersona inner join pagos on vehiculo.IdPagos= pagos.IdPagos;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

module.exports = router;
