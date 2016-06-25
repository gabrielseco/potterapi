'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Occupations = require('./Objects/Occupations');

var _Occupations2 = _interopRequireDefault(_Occupations);

var _Wands = require('./Objects/Wands');

var _Wands2 = _interopRequireDefault(_Wands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Character = new _graphql.GraphQLObjectType({
  name: "Character",
  description: "Represent the type of an character. ",
  fields: function fields() {
    return {
      _id: { type: _graphql.GraphQLString },
      name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      full_name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      birth_date: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      birth_address: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      death_date: { type: _graphql.GraphQLString },
      death_address: { type: _graphql.GraphQLString },
      known_as: { type: _graphql.GraphQLString },
      hair_colour: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      eye_colour: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      skin_colour: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      boggart: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      patronus: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      occupations: { type: new _graphql.GraphQLList(_Occupations2.default) },
      house: { type: _graphql.GraphQLString },
      actor: { type: _graphql.GraphQLString },
      wands: { type: new _graphql.GraphQLList(_Wands2.default) },
      gender: { type: _graphql.GraphQLString },
      blood_status: { type: _graphql.GraphQLString },
      marital_status: { type: _graphql.GraphQLString }
    };
  }
});

/*
query{
  characters{
    ...CharacterFragment
  }
}


fragment CharacterFragment on Character {
    _id
    name
    full_name,
  	birth_date,
  	birth_address,
  	known_as,
  	hair_colour,
  	eye_colour,
  	skin_colour,
    boggart,
    patronus,
  	wands,
  	occupation,
  	house,
    blood_status,
  	marital_status,
}


*/

/*
mutation{
createCharacter(
  _id:"Tom_Riddle",
  name: "Tom Riddle",
  full_name: "Tom Marvolo riddle",
  birth_date:"31 December, 1926",
  birth_address:"Wool's Orphanage, London, England, Great Britain",
  death_date:"2 May, 1998",
  death_address:"Great Hall, Hogwarts Castle, Scotland, Great Britain",
  known_as:"Lord Voldemort",
  hair_colour:"Bald (formerly black)",
  eye_colour:"Red (formerly dark)",
  skin_colour:"White (formerly pale)",
  boggart:"His own corpse",
  patronus:"None",
  house: "Slytherin",
  gender:"Male",
  blood_status:"Half blood",
  marital_status:"Single",
  occupations:{
    name:"Assistant at Borgin and Burkes (formerly)"
  },
  wands:{
    dimension:"13½",
    tree:"Yew",
    magical_creature:"Phoenix core"
  }
)
{
  _id,
  name,
  full_name,
  birth_date,
  birth_address,
  death_date,
  death_address,
  known_as,
  hair_colour,
  eye_colour,
  skin_colour,
  boggart,
  patronus,
  occupations {
    name
  },
  house,
  actor,
  wands {
    dimension
    tree
    magical_creature
  },
  gender,
  blood_status,
  marital_status
}
}
*/

exports.default = Character;