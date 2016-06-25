"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require("graphql");

var OccupationsInputType = new _graphql.GraphQLInputObjectType({
  name: "OccupationsInputType",
  description: "Name of the occupations of the characters",
  fields: function fields() {
    return {
      name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    };
  }
});

exports.default = OccupationsInputType;