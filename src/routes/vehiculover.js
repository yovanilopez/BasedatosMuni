const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');




//Obtener persona
router.get("/tablamultas", (req, res) => {
    console.log("Obteniendo Lista tablamultas");
    mysqlConnection.query('CALL tablamultas', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

module.exports = router;
