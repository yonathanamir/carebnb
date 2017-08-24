let graphql = require('graphql');
let q = require('q');
let _ = require('lodash');

let Contact = new graphql.GraphQLObjectType({
    name: 'Contact',
    fields: {
        name: { type:  graphql.GraphQLString },
        phone: { type:  graphql.GraphQLString },
        mail: { type:  graphql.GraphQLString },
        city: { type:  graphql.GraphQLString },
        address: { type:  graphql.GraphQLString }
    }
});

let HowToContact = new graphql.GraphQLObjectType({
    name: 'HowToContact',
    fields: {
        whatsapp: { type:  graphql.GraphQLBoolean },
        sms: { type:  graphql.GraphQLBoolean},
        call: { type:  graphql.GraphQLBoolean },
        mail: { type:  graphql.GraphQLBoolean }
    }
});

let Owner = new graphql.GraphQLObjectType({
    name: 'Owner',
    fields: {
        id: { type: graphql.GraphQLID },
        username: { type:  graphql.GraphQLString },
        contact: {type: Contact},
        howToContact: {type: HowToContact}
    }
});

module.exports = Owner;