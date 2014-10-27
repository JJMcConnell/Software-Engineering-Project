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
        Event.find({ 'room': req.param('tagId'), 'approved': true }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                console.log(events);

                res.render('NoReservations', 
                    {room: req.param('tagId')}
                );
            }
            else {
                // console.log(events);
                res.render('ThisRoom', { 
                reservations: events, 
                room: req.param('tagId')
                });
            }
        })
    }
}

exports.adminview = function(req,res) {
    Event.find({ 'viewed': false }, function (err, events) {
        if (err) {
            res.send('error!');
            return handleError(err);
        }
        else {
            res.render('adminview', { 
                reservations: events
            });
        }
    })
}

exports.AdminWithRoom = function(req,res) {
    Event.find({ 'viewed': false, 'room': req.param('room')}, function (err, events) {
        if (err) {
            res.send('error!');
            return handleError(err);
        }
        else {
            res.render('adminview', { 
                reservations: events
            });
        }
    });
}

exports.ThisRoomRejected = function(req,res) {
    if (req.param('tagId') != "") {
        Event.find({ 'room': req.param('tagId'), 'approved': false, 'viewed': true }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                console.log(events);

                res.render('NoReservations', 
                    {room: req.param('tagId')}
                );
            }
            else {
                console.log(events);
                res.render('ThisRoom', { 
                    reservations: events, 
                    room: req.param('tagId')
                    }
                );
            }
        })
    }
}

exports.index = function (req, res) {
    res.render('index', {
        data: "this is data"
    });
    //console.log('index');
};

exports.approveroom = function(req, res) {
    var id = req.query.id.slice(1);

    Event.findByIdAndUpdate( id, 
        { 'viewed': true, 'approved': true }, 
        function(err, events) {}
    );

    res.redirect('/adminview');
};

exports.denyroom = function(req, res) {
    var id = req.query.id.slice(1);

    Event.findByIdAndUpdate( id, 
        { 'viewed': true, 'approved': false }, 
        function(err, events) {}
    );

    res.redirect('/adminview');
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
        month: '11',
        day: '01',
        year: '2014',
        period: period,
        viewed: false,
        approved: false
    });

    testEvent.save(function (err) {
        if (err) return console.error(err);
    });

    //console.log(name);
    res.redirect('/');
    console.log("Done Adding to Database");
};