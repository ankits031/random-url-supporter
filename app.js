const express = require('express');
const mongoose = require('mongoose');
const app = express();

const urlSupporterController = require('./controllers/url-supporter.controller');

require('dotenv').config()


app.use('/', urlSupporterController.urlSupporterAndCoounter);

mongoose
  .connect(`${process.env.DB}`)
  .then(() => {
    app.listen(process.env.PORT, process.env.HOST, function () {
        console.log(
            `App listening on http://${process.env.HOST}:${process.env.PORT}`
        );
        console.log('staging app');
    });
})
  .catch(err => {
    console.log(err);
  });
