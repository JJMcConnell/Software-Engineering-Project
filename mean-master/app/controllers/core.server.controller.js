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



exports.ThisRoom = function (req, res) {
    if (req.param('tagId') != "") {
        Event.find({ 'room': req.param('tagId') }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                console.log(events);
                console.log("NONE!!");
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

exports.index = function(req, res) {
    res.render('index');
    console.log('index');
};

exports.getAvailableRooms = function (req, res) {

    
}

//http://localhost:3000/test takes you to this method
//add http://localhost:3000/test?roomnumber= asdfasdf
exports.test = function (req, res) {
    //Assume req.body contains date which is a date object, room number which is a string

    //get is req.query
    //var date = req.query.date;



    var roomNumber = req.query.roomNumber;
    var date = new Date(2014, 10, 10);
    var roomNumber = "120";
    //Takes a date, and a roomNumber, and returns an array of which periods are/aren't available

    console.log(roomNumber);
    //res.json(the array) or something returns result

    Event.find({ "title": 'Test' }, function (err, doc) {

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


    //THIS IS IMPORTANT because
    res.redirect('/');
}

exports.addevent = function (req, res) {
    //get is req.query
    //post is req.body
    //dont ask me why, its just how it is
    var name = req.body.name;

    console.log("asdf");
    var testEvent = new Event({
        title: "Test",
        sponsor: "Test",
        contactEmail: 'trevorkowens@gmail.com',
        room: '121',
        date: new Date(2014, 10, 10),
        time_period: '5'
    });

    testEvent.save(function (err) {
        if (err) return console.error(err);
    });
    
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

    console.log(name);
    res.redirect('/');
    console.log("Done Adding to Database");
};
