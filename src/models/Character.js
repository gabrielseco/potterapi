import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import OccupationsType from './Objects/Occupations';
import WandsType from './Objects/Wands';


const Character = new GraphQLObjectType({
  name: "Character",
  description: "Represent the type of an character. ",
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: new GraphQLNonNull(GraphQLString)},
    full_name: {type: new GraphQLNonNull(GraphQLString)},
    birth_date: {type: new GraphQLNonNull(GraphQLString)},
    birth_address: {type: new GraphQLNonNull(GraphQLString)},
    death_date: {type: GraphQLString},
    death_address: {type: GraphQLString},
    known_as: {type: GraphQLString},
    hair_colour: {type: new GraphQLNonNull(GraphQLString)},
    eye_colour: {type: new GraphQLNonNull(GraphQLString)},
    skin_colour: {type: new GraphQLNonNull(GraphQLString)},
    boggart: {type: new GraphQLNonNull(GraphQLString)},
    patronus: {type: new GraphQLNonNull(GraphQLString)},
    occupations: {type: new GraphQLList(OccupationsType)},
    house: {type: GraphQLString},
    actor: {type: GraphQLString},
    wands: {type: new GraphQLList(WandsType)},
    gender:{type:GraphQLString },
    blood_status:{type:GraphQLString },
    marital_status:{type:GraphQLString }
  })
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

export default Character;
