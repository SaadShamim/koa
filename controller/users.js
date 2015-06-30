var models = require('../models');
var parse = require('co-body');
var logController = require('../controller/log');
var User = models.User;

exports.createUser = function *(){
    var body = yield parse(this);

    //insert new user
    if(body.name && body.email && body.password){
        var newUser = yield User.create({
    	        name: body.name,
                email: body.email,
    	        password: body.password
    	    });

        //add log
        var log = yield logController.postLog("USER_SIGNUP", newUser.id, body);
        
        newUser = newUser.toJSON();
        if(log._id) 
            newUser.logId = log._id;
       
        this.body = newUser;
    } else {
        this.status = 404;  
    }
};

exports.updateUser = function *(id){
	var body = yield parse(this);
    var ret = {};

    //since email can't be changed, only change password
    if(body.password) {
        var user = yield User.update({
            password: body.password
        },
        {
            where: { id:body.id }
        });

        ret.updated = user[0];

        //log if password was changed
        if(user[0] != 0) {
            var log = yield logController.postLog("USER_EDIT_PROFILE", body.id, body);
            ret.logId = log._id;
        }

        //return 0 for unchanged 1 for data changed
        this.body = ret;
    } else {
        this.status = 404;  
    }
};