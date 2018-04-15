const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// middleware body-parser, gère req.body
app.use(bodyParser.json());

// import routes
const moniteurRoutes = require('./api/routes/moniteur');
const vehiculeRoutes = require('./api/routes/vehicule');
const modeleRoutes = require('./api/routes/modele');
const clientRoutes = require('./api/routes/client');
const leconRoutes = require('./api/routes/lecon');

// use routes
app.use('/moniteurs', moniteurRoutes);
app.use('/vehicules', vehiculeRoutes);
app.use('/modeles', modeleRoutes);
app.use('/clients', clientRoutes);
app.use('/lecons', leconRoutes);

module.exports = app;
