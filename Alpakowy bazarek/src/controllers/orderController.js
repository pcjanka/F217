const crypto = require('crypto');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const alpacaModel = require('../models/alpacaModel');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function buyForm(req, res) {
    alpacaModel.getAllAlpacas({ available: true }, {}, (err, alpacas) => {
        if (err) {
            return res.status(500).render('pages/error', {
                status: 500,
                message: 'Błąd serwera'
            });
        }

        res.render('pages/buy', {
            alpacas,
            errors: [],
            values: {}
        });
    });
}

function buy(req, res) {
    const username = req.body.username?.trim();
    const password = req.body.password;
    const alpacaId = req.body.alpacaId;
    const errors = [];

    if (!username || !password || !alpacaId) {
        errors.push('Wszystkie pola są wymagane');
    }

    return alpacaModel.getAllAlpacas({ available: true }, {}, (err, alpacas) => {

        if (errors.length) {
            return res.render('pages/buy', {
                alpacas,
                errors,
                values: { username }
            });
        }

        userModel.getUser(username, (err, user) => {

            if (!user) {
                return res.render('pages/buy', {
                    alpacas,
                    errors: ['Użytkownik nie istnieje'],
                    values: { username }
                });
            }

            if (user.password !== hashPassword(password)) {
                return res.render('pages/buy', {
                    alpacas,
                    errors: ['Nieprawidłowe hasło'],
                    values: { username }
                });
            }

            alpacaModel.getAlpacaById(alpacaId, (err, alpaca) => {
                if (!alpaca || alpaca.available === false) {
                    return res.render('pages/buy', {
                        alpacas,
                        errors: ['Wybrana alpaka nie istnieje'],
                        values: { username }
                    });
                }

                orderModel.createOrder(
                    {
                        username,
                        alpacaId,
                        alpacaName: alpaca.name,
                        price: alpaca.price,
                        createdAt: new Date()
                    },
                    () => {
                        alpacaModel.updateAlpaca(
                            alpacaId,
                            { available: false },
                            () => res.redirect('/')
                        );
                    }
                );
            });
        });
    });
}

module.exports = {
    buyForm,
    buy
};
