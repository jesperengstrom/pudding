'use strict';

const express = require('express');
const routes = require('./app/routes/index.js');
const mongo = require('mongodb').MongoClient;
const app = express();
const port = 3000;
// const mongoUrl = 'mongodb://localhost:27017/pudding';
//connecting to cloudnode Mongo via env vaiable
const mongoUrl = process.env['mongodb'];


mongo.connect(mongoUrl, (err, db) => {
    if (err) {
        throw new Error('database failed to connect!');
    } else {
        // coll = db.collection('none');
        console.log('connection success')
    }

    // app.use and express.static to bind the directory path for /public to a shortcut: /public. 
    // Now when /public is referenced within our HTML file, Express and Node should be able to locate 
    // resources and pass it to the browser successfully.
    app.use('/public', express.static(process.cwd() + '/public'))
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'))

    routes(app, db);

    app.listen(port, () => {
        console.log('server is running on port ' + port);
    })


})