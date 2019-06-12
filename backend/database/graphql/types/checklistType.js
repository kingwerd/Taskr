const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

exports.ChecklistType = new GraphQLObjectType({
    name: 'ChecklistType',
    fields: () => ({
        id: { type: GraphQLID },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    })
});