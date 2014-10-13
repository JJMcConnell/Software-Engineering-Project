'use strict';

module.exports = function(app) {
	// Root routing
    var core = require('../../app/controllers/core');
    app.route('/').get(core.index);
    app.route('/requestevent').get(core.addevent);
	//Makes http://localhost:3000/test go to method core.test as defined in controllers/core.server.controller
    app.route('/test').get(core.test);
    
    app.route('/room/:tagId').get(core.ThisRoom);
    app.route('/room/?:tagId').get(core.ThisRoom);
    	// this doesn't work, just prints blank html page
    	// no idea why
    	// 		~~ Danny
    //app.route('/room/').get(core.ThisRoom);
    //app.route('/room').get(core.ThisRoom);
    	// on the other hand, this one works just fine
    	// i feel like it shouldn't matter, considering
    	// they're just rendering the same function and
    	// the same page
    // 		~~ Danny

    app.route('/roomlookup').get(core.ThisRoom);
    // this doesn't work, just prints blank html page
    // no idea why
    // 		~~ Danny
};