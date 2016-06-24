import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';


const WandsType = new GraphQLObjectType({
  name: "WandsType",
  description: "Name of the wands",
  fields: () => ({
    dimension: {type: new GraphQLNonNull(GraphQLString)},
    tree: {type: new GraphQLNonNull(GraphQLString)},
    magical_creature: {type: new GraphQLNonNull(GraphQLString)}
  })
});






export default WandsType;
