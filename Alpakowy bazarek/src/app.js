const express = require('express');
const path = require('path');

const alpacaRouter = require('./routes/alpacaRouter');
const orderRouter = require('./routes/orderRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', alpacaRouter);
app.use('/', orderRouter);
app.use('/', userRouter);

app.use((req, res) => {
    res.status(404).render('pages/error', {
        status: 404,
        message: 'Strona nie istnieje'
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('pages/error', {
        status: 500,
        message: 'Błąd serwera'
    });
});

module.exports = app;
