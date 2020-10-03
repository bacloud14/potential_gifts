/**
 * SERVER.JS
 * AUTHOR: RJ HILL
 */

'use strict';
console.time('boot time');

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'http://127.0.0.1';

const app = require('express')();
const express = require('express');
const dateFormat = require('dateformat');
const bodyParser = require('body-parser');
const compression = require('compression');
const lowercaseKeys = require('lowercase-keys');


//Ensure that we catch everything, just in case.
process.on('unhandledRejection', (error) => {
  console.error(error);
});


//Support for large encoded bodies
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//Support for large json bodies
app.use(bodyParser.json({ limit: '10mb' }));

//Begin using compression (standard gzip)
app.use(compression());


//No mount path, executed for every request
app.use((req, res, next) => {
  //This is a fake API key for testing.
  if (!req.headers.hasOwnProperty('apikey')) {
    req.headers.apikey = process.env.fakeKey || 'testKey12345';
  }

  //Lowercase all of the keys of our objects
  req.body = lowercaseKeys(req.body);
  req.query = lowercaseKeys(req.query);
  req.params = lowercaseKeys(req.params);

  //Good to have just in case we need this later
  let ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  req.user_ip = ip;

  next();
});


//BEGIN NON-STATIC ROUTES
app.use('/status', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  res.status(200).send({
    status: 'LIVE'
  });

  return next();
});

app.use('/version', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  let fs = require('fs');
  let obj = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  res.status(200).send({
    version: obj.version || '1.0.0'
  });

  return next();
});

// app.use('/services', require('./services/services.js'));
//END NON-STATIC ROUTES


app.use((err, req, res, next) => {
  return res.end();
});

app.use((req, res, next) => {
  return res.end();
});


app.listen(port, () => {
  console.timeEnd('boot time');

  let now = new Date();
  dateFormat.masks.serverTime = "mm/dd/yy hh:MM:ss TT";
  console.log('(%s) Listening on %s:%s', dateFormat(now, "serverTime"), host, port);
});

//Exporting this for the test suite
module.exports = app;
