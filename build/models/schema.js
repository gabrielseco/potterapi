'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Character = require('./Character');

var _Character2 = _interopRequireDefault(_Character);

var _Occupations = require('./Inputs/Occupations');

var _Occupations2 = _interopRequireDefault(_Occupations);

var _Wands = require('./Inputs/Wands');

var _Wands2 = _interopRequireDefault(_Wands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Query = new _graphql.GraphQLObjectType({
  name: 'PotterAPI',
  description: "Root of the PotterAPI",
  fields: function fields() {
    return {
      characters: {
        type: new _graphql.GraphQLList(_Character2.default),
        description: "List of characters in the blog",
        args: {
          id: { type: _graphql.GraphQLString, description: 'Get character by Id', defaultValue: null },
          field: { type: _graphql.GraphQLString, description: 'Field to order', defaultValue: 'name' },
          sort: { type: _graphql.GraphQLInt, description: '1 asc or -1 des', defaultValue: 1 }
        },
        resolve: function resolve(_ref, _ref2) {
          var _this = this;

          var db = _ref.db;
          var ObjectId = _ref.ObjectId;
          var id = _ref2.id;
          var field = _ref2.field;
          var sort = _ref2.sort;
          return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var obj, characters;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    obj = {};
                    characters = [];

                    obj[field] = sort;

                    if (!(id !== undefined)) {
                      _context.next = 11;
                      break;
                    }

                    id = ObjectId(id);
                    _context.next = 7;
                    return db.collection('characters').findOne({ _id: id });

                  case 7:
                    characters = _context.sent;
                    return _context.abrupt('return', [characters]);

                  case 11:
                    _context.next = 13;
                    return db.collection('characters').find().sort(obj).toArray();

                  case 13:
                    characters = _context.sent;

                  case 14:
                    return _context.abrupt('return', characters);

                  case 15:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }))();
        }
      }
    };
  }
});

var Mutation = new _graphql.GraphQLObjectType({
  name: "PotterMutations",
  fields: {
    createCharacter: {
      type: _Character2.default,
      description: "Create a new character",
      args: {
        _id: { type: _graphql.GraphQLString },
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        full_name: { type: _graphql.GraphQLString },
        birth_date: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        birth_address: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        death_date: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        death_address: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        known_as: { type: _graphql.GraphQLString, defaultValue: 'None' },
        hair_colour: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        eye_colour: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        skin_colour: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        boggart: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        patronus: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        occupations: { type: new _graphql.GraphQLList(_Occupations2.default), defaultValue: [] }, //ARRAY*/
        house: { type: _graphql.GraphQLString, defaultValue: 'Unknown' },
        actor: { type: _graphql.GraphQLString, defaultValue: 'Unknown' }, //ACTOR,
        wands: { type: new _graphql.GraphQLList(_Wands2.default), defaultValue: [] }, //ARRAY,
        gender: { type: _graphql.GraphQLString }, //ENUM
        blood_status: { type: _graphql.GraphQLString }, //ENUM
        marital_status: { type: _graphql.GraphQLString, defaultValue: 'Single' } },
      resolve: function resolve(_ref3, args) {
        var _this2 = this;

        var db = _ref3.db;
        var ObjectId = _ref3.ObjectId;
        return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
          var id;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(args._id !== undefined)) {
                    _context2.next = 7;
                    break;
                  }

                  id = ObjectId(args._id);

                  delete args['_id'];
                  //TODO: UPDATE
                  _context2.next = 5;
                  return db.collection('characters').update({ _id: id }, args);

                case 5:
                  _context2.next = 9;
                  break;

                case 7:
                  _context2.next = 9;
                  return db.collection('characters').insertOne(args);

                case 9:
                  return _context2.abrupt('return', args);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }))();
      }
    }
  }
});
var Schema = null;
if (process.env.NODE_ENV !== 'production') {
  Schema = new _graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation
  });
} else {
  Schema = new _graphql.GraphQLSchema({
    query: Query
  });
}

exports.default = Schema;