let graphql = require('graphql');
let q = require('q');

let Requirements = new graphql.GraphQLObjectType({
    name: 'Requirements',
    fields: {
        kosher: { type: graphql.GraphQLBoolean },
        gender: {
            type: new graphql.GraphQLList(graphql.GraphQLString),
            resolve(parent){
                return parent.gender.split(',');
            }
        },
        languages: {
            type: new graphql.GraphQLList(graphql.GraphQLString),
            resolve(parent){
                return parent.languages.split(',');
            }
        },
        preferences: { type: graphql.GraphQLString }
    }
});

module.exports = Requirements;