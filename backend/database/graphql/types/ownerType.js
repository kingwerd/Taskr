const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

exports.OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        id: { type: GraphQLID },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    })
})