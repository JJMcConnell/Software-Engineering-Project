'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	app.route('/').get(core.index);
	app.route('/post').get(core.addevent);
	//Makes http://localhost:3000/test go to method core.test as defined in controllers/core.server.controller
	app.route('/test').get(core.test);
};