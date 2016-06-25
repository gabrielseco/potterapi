import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';


const OccupationsType = new GraphQLObjectType({
  name: "OccupationsType",
  description: "Name of the occupations of the characters",
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)}
  })
});






export default OccupationsType;
