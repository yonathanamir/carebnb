'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var cors = require('cors');
var graphqlHTTP = require('express-graphql');

var schema = require('./graphql/schema.js');
var dbs = require('./api/controllers/dbs.js');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  app.use(cors());

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log('started in '+ process.env.NODE_ENV + 'on port '+ port);


  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

app.use('/', function(req, res, next){
    dbs.getDb().then(db => {
        req.dbs = db;
        next();
    })
});

app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);