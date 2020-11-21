
const express = require('express');
const app = express();

// Importing Routes
const index = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', index)

// Starting Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});