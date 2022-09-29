const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app =  express();
const config = require('./config');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//route
app.use(require('./routers/routers'));

app.listen(config.port, ()=>{
    console.log( `corriendo por el puerto ${config.port} y en localhost`);
})