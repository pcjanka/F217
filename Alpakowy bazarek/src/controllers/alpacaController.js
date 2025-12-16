const alpacaModel = require('../models/alpacaModel');

function index(req, res) {
    const filter = {
        available: true
    };
    const sort = {};

    const selectedColor = req.query.color || '';
    const selectedSort = req.query.sort || '';

    if (selectedColor) {
        filter.color = selectedColor;
    }

    if (selectedSort === 'price') {
        sort.price = 1;
    }

    if (selectedSort === 'name') {
        sort.name = 1;
    }

    alpacaModel.getAllAlpacas(filter, sort, (err, alpacas) => {
        if (err) {
            return res.status(500).render('pages/error', {
                status: 500,
                message: 'Błąd serwera'
            });
        }

        const colors = [...new Set(alpacas.map(a => a.color))];

        res.render('pages/index', {
            alpacas,
            colors,
            selectedColor,
            selectedSort
        });
    });
}

function details(req, res) {
    alpacaModel.getAlpacaById(req.params.id, (err, alpaca) => {
        if (!alpaca) {
            return res.status(404).render('pages/error', {
                status: 404,
                message: 'Alpaka nie istnieje'
            });
        }

        res.render('pages/details', { alpaca });
    });
}

function newForm(req, res) {
    res.render('pages/form', {
        alpaca: null,
        errors: []
    });
}

function add(req, res) {
    const { name, price, color } = req.body;
    const errors = [];

    if (!name || !price) {
        errors.push('Nazwa i cena są wymagane');
    }

    if (errors.length) {
        return res.render('pages/form', {
            alpaca: null,
            errors
        });
    }

    alpacaModel.addAlpaca(
        {
            name,
            price: Number(price),
            color,
            available: true
        },
        () => res.redirect('/')
    );
}

function editForm(req, res) {
    alpacaModel.getAlpacaById(req.params.id, (err, alpaca) => {
        if (!alpaca) {
            return res.status(404).render('pages/error', {
                status: 404,
                message: 'Alpaka nie istnieje'
            });
        }

        res.render('pages/form', {
            alpaca,
            errors: []
        });
    });
}

function update(req, res) {
    const { name, price, color } = req.body;

    alpacaModel.updateAlpaca(
        req.params.id,
        {
            name,
            price: Number(price),
            color
        },
        () => res.redirect('/')
    );
}

function remove(req, res) {
    alpacaModel.deleteAlpaca(req.params.id, () => {
        res.redirect('/');
    });
}

module.exports = {
    index,
    details,
    newForm,
    add,
    editForm,
    update,
    remove
};
