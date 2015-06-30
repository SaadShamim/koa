var koa = require('koa');
var controller = require('./controller');
var models = require("./models");
var router = require('koa-router')();
var Sequelize = require('sequelize');
var app = koa();
var port = process.env.PORT || 3000;
module.exports = app;

router.post('/logs', controller.log.createLog);
router.post('/classes/user', controller.users.createUser);
router.put('/classes/user/:id', controller.users.updateUser);

app.use(router.routes());

//remove force in production
models.sequelize.sync({ force: true }).then(function () {
	app.listen(port, function() {
	 console.log("Listening on " + port);
	});
});