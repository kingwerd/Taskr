const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

exports.TaskCommentType = new GraphQLObjectType({
    name: 'TaskComment',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    })
});