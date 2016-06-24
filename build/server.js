'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongodb = require('mongodb');

var _Html = require('../components/Html');

var _Html2 = _interopRequireDefault(_Html);

var _Schema = require('../models/Schema');

var _Schema2 = _interopRequireDefault(_Schema);

var _scrapeIt = require('scrape-it');

var _scrapeIt2 = _interopRequireDefault(_scrapeIt);

var _functions = require('../functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();

const app = (0, _express2.default)();
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

app.use(_bodyParser2.default.json()); // support json encoded bodies
app.use(_bodyParser2.default.urlencoded({ extended: true })); // support encoded bodies

// Register GraphQL middleware
// https://github.com/graphql/express-graphql
app.use('/graphql', (0, _expressGraphql2.default)(req => ({
  schema: _Schema2.default,
  graphiql: true,
  rootValue: {
    db: req.app.locals.db,
    ObjectId: _mongodb.ObjectId
  }
})));

// Database access example
app.get('/test', (() => {
  var ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const db = req.app.locals.db;
      yield db.collection('log').insertOne({
        time: new Date(),
        ip: req.ip,
        message: '/test visit'
      });
      res.send('<h1>Hello, world!</h1>');
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return ref.apply(this, arguments);
  };
})());

app.get('/getCharacter', (() => {
  var ref = _asyncToGenerator(function* (req, res, next) {
    const URL = "http://harrypotter.wikia.com/wiki/" + req.query.query;
    console.log('URL', URL);

    (0, _scrapeIt2.default)(URL, {
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

    }).then(function (page) {
      page = (0, _functions.mapArrayValues)(page.array_of_links, page);
      res.send(page);
    });
  });

  return function (_x4, _x5, _x6) {
    return ref.apply(this, arguments);
  };
})());

// Serve an empty HTML page for all requests (SPA)
app.get('*', (req, res) => {
  const markup = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, null));
  res.send(`<!doctype html>\n${ markup }`);
});
//mongodb://ggarcia:temporal@ds011261.mlab.com:11261/harrypotter
// Create a MonboDB connection pool and start the Node.js app
_mongodb.MongoClient.connect(process.env.MONGO_URL, {
  promiseLibrary: _bluebird2.default
}).catch(err => console.error(err.stack)).then(db => {
  app.locals.db = db; // See http://expressjs.com/en/4x/api.html#app.locals
  app.listen(port, () => {
    console.log(`Node.js app is listening at http://localhost:${ port }/`);
  });
});