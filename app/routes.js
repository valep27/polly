const express = require('express');

module.exports = (app) => {
    app.get('/', function (req, res, next) { res.render('index', { title: 'Express' }); });
    app.get('/test', (req, res, next) => { res.write('ASDF'); });
}