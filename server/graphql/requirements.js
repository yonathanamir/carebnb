let graphql = require('graphql');
let q = require('q');

let Requirements = new graphql.GraphQLObjectType({
    name: 'Requirements',
    fields: {
        kosher: { type: graphql.GraphQLBoolean },
        genders: {
            type: new graphql.GraphQLList(graphql.GraphQLString)
        },
        languages: {
            type: new graphql.GraphQLList(graphql.GraphQLString)
        },
        preferences: { type: graphql.GraphQLString }
    }
});

module.exports = Requirements;