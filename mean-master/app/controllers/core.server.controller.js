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
    console.log('index');
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
    var date = new Date(2014, 10, 10);
    //var roomNumber = "121";
    //Takes a date, and a roomNumber, and returns an array of which periods are/aren't available

    console.log(roomNumber);
    //res.json(the array) or something returns result
    // "title": 'Test' 
    Event.find({"room": roomNumber}, function (err, doc) {

        //happens later - too late to return stuff, function has ran already

        if (err) {
            //callback(err);
            return;
        }
        //callback(doc);
        console.log("THE DOCUMENT");
       /* console.log("Periods that are NOT available with this room number:");
        Event.findOne({ 'room': roomNumber }, 'time_period', function (err, event) {
                if (err) return handleError(err);
            console.log('%s', event.time_period);
        })*/
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
