'use strict';

module.exports = function(app) {
	// Root routing
    var core = require('../../app/controllers/core');
    app.route('/').get(core.index);
    app.route('/requestevent').get(core.addevent);
    

    // ROOMS
    app.route('/roomall/:tagId').get(core.ThisRoomAll);
    app.route('/roomall/?:tagId').get(core.ThisRoomAll);

    app.route('/room/:tagId').get(core.ThisRoomApproved);
    app.route('/room/?:tagId').get(core.ThisRoomApproved);

    app.route('/rejectedroom/:tagId').get(core.ThisRoomRejected);
    app.route('/rejectedroom/?:tagId').get(core.ThisRoomRejected);


    //app.route('/adminview').get(core.adminview);
};