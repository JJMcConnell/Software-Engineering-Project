'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	passport = require('passport'),
    EventSchema = require('./../models/article.server.model.js'),
    Event = mongoose.model('Event');

//EventSchema = require('./../models/article.server.model.js'),



exports.ThisRoomApproved = function (req, res) {
    console.log(req.param('tagId'));
    if (req.param('tagId') != "") {
        Event.find({ 'room': req.param('tagId'), 'approved': false }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                console.log(events);

                res.render('NoReservations',
                    { roomNo: req.param('tagId') }
                );
            }
            else {
                console.log(events);
                res.render('ThisRoom', {
                    reservations: events,
                    roomNo: req.param('tagId')
                });
            }
        })
    }
}
exports.index = function (req, res) {
    res.render('index');
    //console.log('index');
};

exports.fetchEvents = function (req, res) {
    var month = req.query.month;
    var day = req.query.day;
    var year = req.query.year;

    Event.find({'approved': true}, function (err, events) {
        if (err) return handleError(err);

        res.jsonp(events);
        console.log(events);

    })
    //res.render('index');

}


exports.fetchEventsFromRoom = function (req, res) {
    var room = req.query.room;

    Event.find({'room' : room, 'approved': true}, function (err, events) {
        if (err) return handleError(err);

        res.jsonp(events);
        console.log(events);

    })
    //res.render('index');

}

exports.eventsByDay = function (req, res) {
    var month = req.query.month;
    var day = req.query.day;
    var year = req.query.year;

    Event.find({ 'month': month, 'day': day, 'year': year, 'approved': true }, function (err, events) {
        if (err) return handleError(err);

        res.jsonp(events);
        console.log(events);

    })
    //res.render('index');

}

exports.eventsByYear = function (req, res) {
    var year = req.query.year;

    Event.find({'year': year}, function (err, events){
        if (err) return handleError(err);

        res.jsonp(events);


    })

}

exports.eventsByMonth = function (req, res) {
    var month = req.query.month;
    var year = req.query.year;

    Event.find({'month': month, 'year': year}, function (err, events){
        if (err) return handleError(err);

        res.jsonp(events);


    })

}


//THIS METHOD IS NOT UP TO DATE. IT USES THE OLD MODEL

//http://localhost:3000/test takes you to this method
//add http://localhost:3000/test?roomNumber=yournumberhere, will fetch results for that #
exports.test = function (req, res) {
    //Assume req.body contains date which is a date object, room number which is a string
    //get is req.query


    var roomNumber = req.query.roomNumber;
    var date = req.query.date;
    //var roomNumber = "121"; --uncomment if you want to test certain roomnumbers

    //Takes a date, and a roomNumber, and returns an array of which periods are/aren't available
    console.log(roomNumber);
    //res.json(the array) or something returns result

    //callback(doc);
    console.log("THE DOCUMENT");
    console.log("Periods that are NOT available with this room number:");
    var eventPeriods = new Array();
    Event.find({ 'room': roomNumber, 'date': date }, 'period', function (err, events) {
        if (err) return handleError(err);
        var i;
        for (i = 0; i < events.length; i++) {
            console.log('%s', events[i].period);
            eventPeriods[i] = events[i].period;
        }

        res.json(eventPeriods);
    })

    //THIS IS IMPORTANT because
    //res.redirect('/');
}

exports.roomnumber = function (req, res) {
    console.log(req.param("tagId"));
    res.render('room');
    Event.find({ 'room': req.param("tagId") }, function (err, events) {
        if (err) return handleError(err);
        else if (events != "") res.json(events);
        else res.send("No events in this room");
    })
}

exports.addevent = function (req, res) {
    //get is req.query
    //post is req.body
    //dont ask me why, its just how it is

    //example request http://localhost:3000/requestevent?name=Trevor+Owens&telephone=1231234123&sponsor=Trevor+is+Awesome&date=1994-01-04&roomNumber=232A&period=10
    var name = req.query.name;
    var email = req.query.email;
    var telephone = req.query.telephone;
    var sponsor = req.query.name;
    var date = req.query.date;
    var roomNumber = req.query.roomNumber;
    var period = req.query.period;
    var description = req.query.description;

    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    console.log(date.toString());
    console.log("day: " + day);
    console.log("month: " + month);
    console.log("year: " + year);
    var testEvent = new Event({
        description: description,
        title: name,
        sponsor: sponsor,
        contactEmail: email,
        contactPhone: telephone,
        room: roomNumber,
        day: day,
        month: month,
        year: year,
        period: period
    });
    
    testEvent.save(function (err) {
        if (err) return console.error(err);
    });
    

    Event.find({ "title": 'potluck' }, function (err, doc) {

        if (err) {
            return;
        }
        console.log("THE DOCUMENT");
        console.log(doc);
    })

    res.redirect('/');
    console.log("Done Adding to Database");
};