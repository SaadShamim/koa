var should = require("should");
var app = require("../app.js");
var request = require("supertest").agent(app.listen());

describe('routes', function() {

  it('should return a 404', function(done) {
  	request.get("/derp").expect(404).end(done);
  });

});

//test /log
describe('Log', function() {
  it('should reject inavalid input to log', function(done) {
  	request.post("/logs").send({userId: 'derp@pumpup.com', data: {name: 'derp', email: 'derp@pumpup.com', password: 'password'}})
	  .expect(404).end(done);
  });

  it('should insert log sucessfully given right input', function(done) {
	  request.post("/logs").send({actionId: 'derp', userId: 'derp@pumpup.com', data: {name: 'derp', email: 'derp@pumpup.com', password: 'password'}})
	  .expect(200).end(function(err, res) {
		  if(err)
			return done(err);

		  res.body.created.should.equal(true);
		  res.body._index.should.equal('log');
		  res.body._type.should.equal('derp');
		  done();
	  });
  });

});

//test post classes/user
describe('Create User', function() {

  var testUser = {name: "derp", email: "derp@pumpup.com", password: "password"};

  it('should reject inavalid input to create user', function(done) {
  	request.post("/classes/user").send({name: 'derp', email: "derp@pumpup.com"})
	  .expect(404).end(done);
  });

  it('should insert user sucessfully given right input', function(done) {
	  request.post("/classes/user").send(testUser)
	  .expect(200).end(function(err, res) {
		  if(err)
			return done(err);

		  res.body.name.should.equal(testUser.name);
		  res.body.email.should.equal(testUser.email);
		  res.body.password.should.equal(testUser.password);
		  should.exist(res.body.logId);
		  
		  done();
	  });
  });

});

//test put classes/put
describe('Update User', function() {

  var testUpdateUser = {password: "password", id:0};

  //get post id of an existing entry
  before(function(done){
    request.post("/classes/user").send({name: 'derp', email: 'derp2@pumpup.com', password: "password"})
	  .expect(200).end(function(err, res) {
		  if(err)
			return done(err);

		  testUpdateUser.id = res.body.id;

		  done();
	});
  });

  it('should reject inavalid input to update user', function(done) {
  	request.put("/classes/user/1").send({userId: 'derp@pumpup.com'})
	  .expect(404).end(done);
  });

  it('should update user given right input', function(done) {
	  request.put("/classes/user/1").send(testUpdateUser)
	  .expect(200).end(function(err, res) {
		  if(err)
			return done(err);

		  //test if user was updated and logged
		  res.body.updated.should.equal(1);
		  should.exist(res.body.logId);

		  done();
	  });
  });
});