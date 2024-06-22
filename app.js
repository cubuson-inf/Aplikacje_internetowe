require('dotenv').config();

const express = require('express');
const res = require('express/lib/response');

const expressLayout = require('express-ejs-layouts');

// laczenie z baza danych
const connectDB = require('./server/config/db');

const app = express();
// na tym porcie lokalnie pracuje strona
const PORT = 4000 || process.env.PORT;

// i wlasciwe podlaczenie projektu do MongoDB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(expressLayout);
app.set('layout', './layouts/main');
// poniższa linia naprawia funkcję render, ktora nie dziala bez default engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');



app.use('/', require('./server/routes/main'));

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});