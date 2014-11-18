'use strict';

module.exports = function(app) {
	// Root routing
    var core = require('../../app/controllers/core');
    app.route('/').get(core.index);
    

    // CREATE
    app.route('/requestevent').post(core.addevent);
    app.route('/requestAdminEvent').post(core.addAdminEvent);
    // Creating the admin when the website first starts.
    app.route('/generateAdmin').post(core.generateAdmin);

    // UPDATE
    app.route('/approveroom').get(core.approveroom);
    app.route('/denyroom').post(core.denyroom);

    // ROOMS
    app.route('/fetchRequests').get(core.fetchRequests);
    app.route('/adminview').get(core.adminview);
    app.route('/adminview_room/?:room').get(core.AdminWithRoom);
    app.route('/room/?:tagId').get(core.ThisRoomApproved);
    app.route('/rejectedroom/?:tagId').get(core.ThisRoomRejected);

    // CALENDAR
    app.route('/fetchEvents').get(core.fetchEvents);
    app.route('/fetchEventsFromRoom').get(core.fetchEventsFromRoom);
    app.route('/calendarDay').get(core.eventsByDay);
    app.route('/calendarYear').get(core.eventsByYear);
    app.route('/calendarMonth').get(core.eventsByMonth);
    app.route('/fetchEventByID').get(core.fetchEventByID);
    app.route('/getAvailablePeriods').get(core.getAvailablePeriods);
};