let graphql = require('graphql');
let q = require('q');
let _ = require('lodash');

let Requirements = require('./requirements.js');
let Owner = require('./owner.js');

let Resource = new graphql.GraphQLObjectType({
    name: 'Resource',
    fields: {
        id: { type: graphql.GraphQLID },
        requirements: { type: Requirements },
        approved: { type:  graphql.GraphQLBoolean },
        address: { type:  graphql.GraphQLString },
        owner: {
            type: Owner,
            resolve(parent, args, { dbs }){
                return _.find(dbs.owners, o => o.id == parent.owner
                );
            }
        }
    }
});

module.exports = Resource;