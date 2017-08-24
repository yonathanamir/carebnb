let graphql = require('graphql');
let Resource = require('./resource.js');
let _ = require('lodash');

let query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        resources: {
            type: new graphql.GraphQLList(Resource),
            args: {
                ids: {type: graphql.GraphQLString}
            },
            resolve(parent, args, { dbs }){
                let ids = args.ids.split(',');
                return _.filter(dbs.resources, o => _.includes(ids, o.id));
            }
        }
    })
});

let schema = new graphql.GraphQLSchema({
    query: query
});

module.exports = schema;