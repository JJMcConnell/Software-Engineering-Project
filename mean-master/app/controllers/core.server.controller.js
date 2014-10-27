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
                // console.log(events);
                res.render('ThisRoom', { 
                reservations: events, 
                roomNo: req.param('tagId')
                });
            }
        })
    }
}

exports.adminview = function(req,res) {
    Event.find({ 'admin_viewed': false }, function (err, events) {
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
    res.render('index', {
        data: "this is data"
    });
    //console.log('index');
};

exports.approveroom = function(req, res) {
    var newid = req.query.id.slice(1);
    var newerid = newid.slice(1);

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"+
                "Running \"Approve Room\" Function\n"+
                "- ID is "+req.query.id+"\n"+
                "- Sliced off first char "+newid+"\n"+
                "- Sliced off second char "+newerid+"\n");

    Event.find({ '_id.$oid': newid }, function (err, events) {
        console.log("- Ran Event.find() function\n");
        if (err) res.send('error!!!');
        else {
            console.log("- Found events without error\n"+
                        "- found: "+events+"\n");
            events.admin_viewed = true;
            events.admin_approved = true;

            events.save(function (err) {
                if (err) return console.error(err);
            });
        }
    })

   console.log("- Redirecting to adminview\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

    res.redirect('/adminview');
};

exports.denyroom = function(req, res) {
    console.log("~~~ ID is "+req.query.id);



    Event.find({ '_id.$oid': req.query.id }, function (err, events) {
        if (err) return handleError(err);
        else if (events == "[]" )
            res.send('no events');
        else {
            console.log("ELSE STATEMENT REACHED");
            console.log("event title is " + events.title);

            events.save(function (err) {
                if (err) return console.error(err);
            });
        }
    });  

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