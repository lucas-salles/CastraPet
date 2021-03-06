const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');

require('./database');

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/castra-pet', routes);

app.listen(3333);