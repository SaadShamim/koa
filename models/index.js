var Sequelize = require("sequelize");
var config    = require('../config/dbConfig');
var path      = require("path");
var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
});

var models = ['users.js'];

//cache all models (associates not handled, since not needed)
models.forEach(function(file) {
  var model = sequelize["import"](path.join(__dirname, file));
  module.exports[model.name] = model;
});

module.exports.sequelize = sequelize;