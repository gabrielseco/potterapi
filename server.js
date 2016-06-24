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
import Html from './components/Html';
import schema from './models/Schema';
import scrapeIt from 'scrape-it';
import {
  mapArrayValues
} from './functions';


dotenv.config()



const app = express();
const port = process.env.PORT || 5000;

// Compiles client-side JavaScript code on the fly
// https://github.com/webpack/webpack-dev-middleware
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./tools/webpack.config').default;
  app.use(webpackMiddleware(webpack(webpackConfig), {
    stats: webpackConfig.stats
  }));
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

// Database access example
app.get('/test', async(req, res, next) => {
  try {
    const db = req.app.locals.db;
    await db.collection('log').insertOne({
      time: new Date(),
      ip: req.ip,
      message: '/test visit'
    });
    res.send('<h1>Hello, world!</h1>');
  } catch (err) {
    next(err);
  }
});


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

// Serve an empty HTML page for all requests (SPA)
app.get('*', (req, res) => {
  const markup = ReactDOM.renderToStaticMarkup( < Html / > );
  res.send(`<!doctype html>\n${markup}`);
});
//mongodb://ggarcia:temporal@ds011261.mlab.com:11261/harrypotter
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
