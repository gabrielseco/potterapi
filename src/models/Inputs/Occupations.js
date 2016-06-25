import {
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';


const OccupationsInputType = new GraphQLInputObjectType({
  name: "OccupationsInputType",
  description: "Name of the occupations of the characters",
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)}
  })
});






export default OccupationsInputType;
