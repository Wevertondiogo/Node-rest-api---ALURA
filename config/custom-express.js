const express = require('express');
const consing = require('consign');
const consign = require('consign/lib/consign');

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    consign()
        .include('controller')
            into(app);

    return app
} 