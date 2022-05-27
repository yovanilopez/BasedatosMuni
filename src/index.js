const express = require('express');
var app = express();
const cors = require('cors')
const bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());



app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.use(cors());



app.use(require('./routes/persona'));
app.use(require('./routes/vehiculo'));
app.use(require('./routes/pagos'));
app.use(require('./routes/evidencias'));
app.use(require('./routes/revision'));
app.use(require('./routes/vehiculover'));
app.use(require('./routes/turno'));
app.use(require('./routes/user'));



app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});
