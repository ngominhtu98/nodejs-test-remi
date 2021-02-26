const express = require("express");
const apiRouterPV = require('../routes/private');
const apiRouterPL = require('../routes/public');
const bodyParser = require('body-parser');
const { modifyResponse, auth } = require('../middleware');
const cors = require('cors');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cors())

    app.use(modifyResponse);


    app.use(bodyParser.json());

    app.use('/api/pl', apiRouterPL);
    app.use('/api/pv', apiRouterPV);
}
