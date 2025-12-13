const crypto = require('crypto');
const userModel = require('../models/userModel');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function registerForm(req, res) {
    res.render('pages/register', {
        errors: [],
        values: {}
    });
}

function register(req, res) {
    const { username, password } = req.body;
    const errors = [];

    if (!username || !password) {
        errors.push('Wszystkie pola są wymagane');
    }

    if (password && password.length < 6) {
        errors.push('Hasło musi mieć minimum 6 znaków');
    }

    if (errors.length) {
        return res.render('pages/register', {
            errors,
            values: { username }
        });
    }

    userModel.getUser(username, (err, existingUser) => {
        if (existingUser) {
            return res.render('pages/register', {
                errors: ['Użytkownik już istnieje'],
                values: { username }
            });
        }

        userModel.createUser(
            {
                username,
                password: hashPassword(password),
                createdAt: new Date()
            },
            () => {
                res.redirect('/users');
            }
        );
    });
}

function usersList(req, res) {
    userModel.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).render('pages/error', {
                status: 500,
                message: 'Błąd serwera'
            });
        }

        res.render('pages/users', {
            users
        });
    });
}

function deleteUser(req, res) {
    const { id } = req.params;

    userModel.deleteUser(id, () => {
        res.redirect('/users');
    });
}

module.exports = {
    registerForm,
    register,
    usersList,
    deleteUser
};
