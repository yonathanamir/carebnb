let graphql = require('graphql');
let Resource = require('./resource.js');
let Owner = require('./owner.js');
let _ = require('lodash');

let query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        resources: {
            type: new graphql.GraphQLList(Resource),
            args: {
                ids: { type: graphql.GraphQLString},
                kosher: { type: graphql.GraphQLBoolean },
                language: { type: graphql.GraphQLString },
                gender: { type: graphql.GraphQLString }
            },
            resolve(parent, args, { dbs }){
                if (args.ids !== undefined){
                    let ids = args.ids.split(',');
                    return _.filter(dbs.resources, o => _.includes(ids, o.id));
                }

                if (args.kosher !== undefined){
                    return _.filter(dbs.resources, o => o.requirements.kosher == args.kosher);
                }

                if (args.language !== undefined){
                    return _.filter(dbs.resources,
                            o => _.includes(o.requirements.languages,  args.language));
                }

                if (args.gender !== undefined){
                    return _.filter(dbs.resources,
                        o => _.includes(o.requirements.gender,  args.gender));
                }
            }
        },
        owner: {
            type: Owner,
            args: {
                id: { type: graphql.GraphQLString},
            },
            resolve(parent, args, { dbs} ){
                let id = args.id;
                return _.find(dbs.owners, o => o.id == id);
            }
        }
    })
});

let schema = new graphql.GraphQLSchema({
    query: query
});

module.exports = schema;