import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import Character from './Character';
import OccupationsInputType from './Inputs/Occupations';
import WandsInputType from './Inputs/Wands';

const Query = new GraphQLObjectType({
  name: 'PotterAPI',
  description: "Root of the PotterAPI",
  fields: () => ({
    characters:{
      type: new GraphQLList(Character),
      description: "List of characters in the blog",
      args: {
        id: {type: GraphQLString, description: 'Get character by Id', defaultValue:null},
        field: {type: (GraphQLString), description: 'Field to order', defaultValue:'name'},
        sort: {type: (GraphQLInt), description: '1 asc or -1 des', defaultValue: 1},
      },
      async resolve({ db, ObjectId }, {id, field, sort}) {
        var obj = {};
        var characters = [];
        obj[field] = sort;

        if(id !== undefined){
          id = ObjectId(id);
          characters = await db.collection('characters').findOne({_id: id});
          return [characters];

        } else{

          characters = await db.collection('characters').find().sort(obj).toArray();
        }

        return characters;
      }
    }
  })
});


const Mutation = new GraphQLObjectType({
  name: "PotterMutations",
  fields: {
    createCharacter: {
      type: Character,
      description: "Create a new character",
      args: {
        _id: {type: GraphQLString},
        name: {type: new GraphQLNonNull(GraphQLString)},
        full_name: {type: GraphQLString},
        birth_date: {type: GraphQLString, defaultValue: 'Unknown'},
        birth_address: {type: GraphQLString, defaultValue: 'Unknown'},
        death_date: {type: GraphQLString, defaultValue: 'Unknown'},
        death_address: {type: GraphQLString, defaultValue: 'Unknown'},
        known_as: {type: GraphQLString, defaultValue: 'None'},
        hair_colour: {type: GraphQLString ,defaultValue:'Unknown'},
        eye_colour: {type: GraphQLString, defaultValue:'Unknown'},
        skin_colour: {type: GraphQLString, defaultValue:'Unknown'},
        boggart: {type: GraphQLString, defaultValue: 'Unknown'},
        patronus: {type: GraphQLString, defaultValue: 'Unknown'},
        occupations: {type: new GraphQLList(OccupationsInputType), defaultValue:[]},//ARRAY*/
        house: {type: GraphQLString, defaultValue: 'Unknown'},
        actor: {type: GraphQLString, defaultValue:'Unknown'},//ACTOR,
        wands: {type: new GraphQLList(WandsInputType), defaultValue:[]},//ARRAY,
        gender:{type:GraphQLString },//ENUM
        blood_status:{type:GraphQLString },//ENUM
        marital_status:{type:GraphQLString, defaultValue: 'Single' },//ENUM
      },
      async resolve({ db, ObjectId }, args) {

        if(args._id !== undefined){
          const id = ObjectId(args._id);
          delete args['_id'];
          //TODO: UPDATE
          await db.collection('characters').update({_id: id}, args);
        } else {
          await db.collection('characters').insertOne(args)
        }
        return args;
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
