"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require("graphql");

var OccupationsType = new _graphql.GraphQLObjectType({
  name: "OccupationsType",
  description: "Name of the occupations of the characters",
  fields: function fields() {
    return {
      name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    };
  }
});

exports.default = OccupationsType;