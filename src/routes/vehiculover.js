const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');




//Obtener persona
router.get("/vehiculover", (req, res) => {
    console.log("Obteniendo Lista vehiculover");
    mysqlConnection.query('CALL vehiculover', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

module.exports = router;
