const express = require('express');

const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');

const jwt = require ("jsonwebtoken");

router.get("/usuarios", (req, res) => {
    
    mysqlConnection.query('Select * from usuarios', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


router.post('/usuarios', (req,res) => {
    const { userName,pasword } = req.body;
    mysqlConnection.query('select userName,roleid from usuarios where username=? and pasword=?',
    [userName,pasword],
    (err,rows,fields) => {
      if(!err){
        if(rows.length >0){
          let data = JSON.stringify(rows[0]);
          const token = jwt.sign(data, 'stil');
          res.json({token});
        }else{
          res.json('Usuario o clave incorrectos');
        }
        
      }else{
        console.log(err);
      }
    }
    )
  })

  router.post('/test',verifyToken, (req,res) => {
    res.json('Informacion secreta');
  })
  
  function verifyToken(req,res, next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');
  
    const token = req.headers.authorization.substr(7);
    if(token!==''){
      const content = jwt.verify(token,'stil');
      req.data = content;
      next();
    }else{
      res.status(401).json('Token vacio');
    }
  
  }
 


module.exports = router;
