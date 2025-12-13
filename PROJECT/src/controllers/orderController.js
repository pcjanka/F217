const crypto = require('crypto');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const alpacaModel = require('../models/alpacaModel');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function buyForm(req, res) {
    alpacaModel.getAllAlpacas({ available: true }, {}, (err, alpacas) => {
        res.render('pages/buy', {
            alpacas,
            errors: [],
            values: {}
        });
    });
}

function buy(req, res) {
    const { username, password, alpacaId } = req.body;
    const errors = [];

    if (!username || !password || !alpacaId) {
        errors.push('Wszystkie pola są wymagane');
    }

    if (errors.length) {
        return buyForm(req, res);
    }

    userModel.getUser(username, (err, user) => {
        if (!user) {
            return buyForm(req, res);
        }

        if (user.password !== hashPassword(password)) {
            return buyForm(req, res);
        }

        alpacaModel.getAlpacaById(alpacaId, (err, alpaca) => {
            if (!alpaca || alpaca.available === false) {
                return buyForm(req, res);
            }

            alpacaModel.updateAlpaca(
                alpacaId,
                { available: false },
                () => {
                    orderModel.createOrder(
                        {
                            username,
                            alpacaName: alpaca.name,
                            price: alpaca.price,
                            createdAt: new Date()
                        },
                        () => res.redirect('/')
                    );
                }
            );
        });
    });
}

module.exports = {
    buyForm,
    buy
};
