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





exports.index = function(req, res) {
    res.render('index');
    //console.log('index');
};

exports.getAvailableRooms = function (req, res) {

    
}

//http://localhost:3000/test takes you to this method
//add http://localhost:3000/test?roomNumber=yournumberhere, will fetch results for that #
exports.test = function (req, res) {
    //Assume req.body contains date which is a date object, room number which is a string
    //get is req.query
    //var date = req.query.date; --need to figure out how to add the date--



    var roomNumber = req.query.roomNumber;
    var date = req.query.date;
    //var roomNumber = "121";
    //Takes a date, and a roomNumber, and returns an array of which periods are/aren't available

    console.log(roomNumber);
    //res.json(the array) or something returns result

        //callback(doc);
        console.log("THE DOCUMENT");
        console.log("Periods that are NOT available with this room number:");
        Event.find({ 'room': roomNumber , 'date': date }, 'time_period', function (err, events) {
                if (err) return handleError(err);
                var i;
                for (i = 0; i < events.length; i++) {
                    console.log('%s', events[i].time_period);
                }
                 

                res.json(events);
        })

    //THIS IS IMPORTANT because
        //res.redirect('/');
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
    
    console.log("asdf"+date.toString());
    var testEvent = new Event({
        title: name,
        sponsor: sponsor,
        contactEmail: email,
        room: roomNumber,
        date: date,
        time_period: period
    });

    testEvent.save(function (err) {
        if (err) return console.error(err);
    });
    //{ "title": 'potluck' }, 

    //var Events = mongoose.collection('Event');
    Event.find({ "title": 'potluck' }, function (err, doc) {

        //happens later - too late to return stuff, function has ran already

        if (err) {
            //callback(err);
            return;
        }
        //callback(doc);
        console.log("THE DOCUMENT");
        console.log(doc);

        //res.jsonp(doc);
    })

    //console.log(name);
    res.redirect('/');
    console.log("Done Adding to Database");
};