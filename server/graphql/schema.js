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
                languages: { type: graphql.GraphQLString },
                gender: { type: graphql.GraphQLString },
                startDate: { type: graphql.GraphQLInt },
                endDate: { type: graphql.GraphQLInt }
            },
            resolve(parent, args, { dbs }){
                let resources = dbs.resources;

                if (args.ids !== undefined){
                    let ids = args.ids.split(',');
                    resources = _.filter(resources, o => _.includes(ids, o.id));
                }

                if (args.kosher !== undefined){
                    resources = _.filter(resources, o => o.requirements.kosher == args.kosher);
                }

                if (args.languages !== undefined){
                    let languages = args.languages.split(',');
                    resources = _.filter(resources,
                            r => _.intersection(r.requirements.languages,  languages).length > 0);
                }

                if (args.gender !== undefined){
                    resources = _.filter(resources,
                        o => _.includes(o.requirements.genders,  args.gender));
                }

                if (args.startDate !== undefined && args.endDate !== undefined){
                    resources = _.filter(resources,
                        r => {
                            let orders = _.filter(dbs.orders, o => o.resource == r.id);
                            let taken = _.find(orders, o => {
                                /*return (o.startDate > args.startDate && o.endDate < args.startDate)
                                        || (o.endDate > args.startDate && o.endDate < args.endDate)*/
                                return ((args.startDate >= o.startDate && args.startDate <= o.endDate) || (args.endDate >= o.startDate && args.endDate <= o.endDate))
                                    ||
                                    ((o.startDate >= args.startDate && o.startDate <= args.endDate) || (o.endDate >= args.startDate && o.endDate <= args.endDate));
                                }
                            );

                            return taken === undefined;
                        }
                    );
                }

                return resources;
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