"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require("graphql");

var WandsType = new _graphql.GraphQLObjectType({
  name: "WandsType",
  description: "Name of the wands",
  fields: function fields() {
    return {
      dimension: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      tree: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      magical_creature: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    };
  }
});

exports.default = WandsType;