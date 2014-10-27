'use strict';

module.exports = function(app) {
	// Root routing
    var core = require('../../app/controllers/core');
    app.route('/').get(core.index);
    

    // CREATE
    app.route('/requestevent').get(core.addevent);
    
    // UPDATE
    app.route('/approveroom').get(core.approveroom);
    app.route('/denyroom').get(core.denyroom);

    // ROOMS
    app.route('/adminview').get(core.adminview);
    app.route('/adminview_room/?:room').get(core.AdminWithRoom);
    app.route('/room/?:tagId').get(core.ThisRoomApproved);
    app.route('/rejectedroom/?:tagId').get(core.ThisRoomRejected);
};