'use strict';

module.exports = function (app) {
    // Root routing
    var core = require('../../app/controllers/core');
    app.route('/').get(core.index);
    app.route('/requestevent').get(core.addevent);
    //Makes http://localhost:3000/test go to method core.test as defined in controllers/core.server.controller
    app.route('/test').get(core.test);
        
    app.route('/room/:tagId').get(core.ThisRoomApproved);
    app.route('/room/?:tagId').get(core.ThisRoomApproved);

    app.route('/fetchEvents').get(core.fetchEvents);
    app.route('/fetchEventsFromRoom').get(core.fetchEventsFromRoom);
    app.route('/calendarDay').get(core.eventsByDay);
    app.route('/calendarYear').get(core.eventsByYear);
    app.route('/calendarMonth').get(core.eventsByMonth);
};