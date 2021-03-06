import React from 'react';
import ReactDOM from 'react-dom/server';
import Promise from 'bluebird';
import express from 'express';
import bodyParser from 'body-parser';
import graphql from 'express-graphql';
import dotenv from 'dotenv';
import fs from 'fs';

import {
  MongoClient,
  ObjectId
} from 'mongodb';
import schema from './models/schema';
import scrapeIt from 'scrape-it';
import {
  mapArrayValues
} from './functions';


dotenv.config()
require("babel-core/register");
require("babel-polyfill");



const app = express();
const port = process.env.PORT || 5000;

// Compiles client-side JavaScript code on the fly
// https://github.com/webpack/webpack-dev-middleware
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../tools/webpack.config').default;
  app.use(webpackMiddleware(webpack(webpackConfig), {
    stats: webpackConfig.stats
  }));
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

if(process.env.NODE_ENV !== 'production'){
  app.use('/', express.static('public'));
  // Register GraphQL middleware
  // https://github.com/graphql/express-graphql
  app.use('/graphql', graphql(req => ({
    schema,
    graphiql: true,
    rootValue: {
      db: req.app.locals.db,
      ObjectId: ObjectId
    }
  })));
} else {
  app.use('/', graphql(req => ({
    schema,
    graphiql: true,
    rootValue: {
      db: req.app.locals.db,
      ObjectId: ObjectId
    }
  })));
}


app.get('/getCharacter', async(req, res, next) => {
  const URL = "http://harrypotter.wikia.com/wiki/" + req.query.query;
  console.log('URL', URL);

  scrapeIt(URL, {
    name: ".header-title h1",
    full_name: ".portable-infobox .pi-title",
    array_of_links: {
      listItem: ".pi-data",
      data: {
        title: {
          selector: '.pi-data-label'
        },
        desc: {
          selector: '.pi-data-value'
        }

      }
    }


  }).then(page => {
    page = mapArrayValues(page.array_of_links, page);
    res.send(page);
  });

});

//TODO: Implement fallback for react-router when the user reloads the page
app.use('*', (req, res) => {
  res.redirect('/');
})

// Create a MonboDB connection pool and start the Node.js app
  MongoClient.connect(process.env.MONGO_URL, {
    promiseLibrary: Promise
  })
  .catch(err => console.error(err.stack))
  .then(db => {
    app.locals.db = db; // See http://expressjs.com/en/4x/api.html#app.locals
    app.listen(port, () => {
      console.log(`Node.js app is listening at http://localhost:${port}/`);
    });
  });
