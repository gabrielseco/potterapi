import {
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';


const WandsInputType = new GraphQLInputObjectType({
  name: "WandsInputType",
  description: "Name of the wands",
  fields: () => ({
    dimension: {type: new GraphQLNonNull(GraphQLString)},
    tree: {type: new GraphQLNonNull(GraphQLString)},
    magical_creature: {type: new GraphQLNonNull(GraphQLString)}
  })
});






export default WandsInputType;
