'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	passport = require('passport'),
    EventSchema = require('./../models/article.server.model.js'),
    Event = mongoose.model('Event'),
    swig = require('swig');

//EventSchema = require('./../models/article.server.model.js'),



exports.ThisRoomApproved = function(req,res) {
    if (req.param('tagId') != "") {
        Event.find({ 'room': req.param('tagId'), 'admin_approved': true }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                console.log(events);

                res.render('NoReservations', 
                    {roomNo: req.param('tagId')}
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

exports.ThisRoomAll = function(req,res) {
    if (req.param('tagId') != "") {
        Event.find({ 'room': req.param('tagId') }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                console.log(events);

                res.render('NoReservations', 
                    {roomNo: req.param('tagId')}
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

exports.ThisRoomRejected = function(req,res) {
    if (req.param('tagId') != "") {
        Event.find({ 'room': req.param('tagId'), 'admin_approved': false, 'admin_viewed': true }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                console.log(events);

                res.render('NoReservations', 
                    {roomNo: req.param('tagId')}
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

    // console.log("asdf" + date.toString());
    var testEvent = new Event({
        title: name,
        sponsor: sponsor,
        contactEmail: email,
        room: roomNumber,
        date: date,
        time_period: period,
        admin_viewed: false,
        admin_approved: false
    });

    testEvent.save(function (err) {
        if (err) return console.error(err);
    });

    //console.log(name);
    res.redirect('/');
    console.log("Done Adding to Database");
};