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

var mailer = require("mailer")
, username = "trevorkowens@gmail.com"
, password = "WD6Av_7xpEyY_rgoRzFNGg";

exports.index = function (req, res) {
    res.render('index', {
        data: "this is data"
    });
};

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

exports.fetchRequests = function (req, res) {
    console.log("REQUESTS");
    /*passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.jsonp(user);
                }
            });
        }
    })(req, res, next);*/
    
    Event.find({ 'viewed': false }, function (err, events) {
        if (err) {
            res.send('error!');
            return handleError(err);
        }
        else {
            res.jsonp(events);
        }
    });
};


exports.index = function (req, res) {
    res.render('index');
};

exports.fetchEvents = function (req, res) {
    var month = req.query.month;
    var day = req.query.day;
    var year = req.query.year;

    Event.find({ 'approved': true }, function (err, events) {
        if (err) return handleError(err);

        res.jsonp(events);
        console.log(events);

    })
    //res.render('index');
};

exports.fetchEventsFromRoom = function (req, res) {
    var room = req.query.room;

    Event.find({ 'room': room, 'approved': true }, function (err, events) {
        if (err) return handleError(err);

        res.jsonp(events);
        console.log(events);

    })
    //res.render('index');
};

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
};

exports.eventsByYear = function (req, res) {
    var year = req.query.year;

    Event.find({ 'year': year }, function (err, events) {
        if (err) return handleError(err);
        res.jsonp(events);
    })
};

exports.eventsByMonth = function (req, res) {
    var month = req.query.month;
    var year = req.query.year;

    Event.find({ 'month': month, 'year': year }, function (err, events) {
        if (err) return handleError(err);
        res.jsonp(events);
    })
};

exports.AdminWithRoom = function (req, res) {
    Event.find({ 'viewed': false, 'room': req.param('room') }, function (err, events) {
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
};

exports.ThisRoomApproved = function(req,res) {
    if (req.param('tagId') != "") {
        Event.find({ 'room': req.param('tagId'), 'approved': true }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                res.render('NoReservations', 
                    {room: req.param('tagId')}
                );
            }
            else {
                res.render('ThisRoom', { 
                    reservations: events, 
                    room: req.param('tagId')
                });
            }
        })
    }
}

exports.ThisRoomRejected = function (req, res) {
    if (req.param('tagId') != "") {
        Event.find({ 'room': req.param('tagId'), 'approved': false, 'viewed': true }, function (err, events) {
            if (err) return handleError(err);
            else if (events.length == 0) {
                console.log(events);

                res.render('NoReservations',
                    { room: req.param('tagId') }
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
};

exports.approveroom = function(req, res) {
    var id = req.query.id;

    Event.findByIdAndUpdate( id, 
        { 'viewed': true, 'approved': true }, 
        function(err, events) {}
    );


    mailer.send(
  {
      host: "smtp.mandrillapp.com"
  , port: 587
  , to: "trevorkowens@gmail.com"
  , from: "trevorkowens@gmail.com"
  , subject: "Event Approved"
  , body: "Your event has been approved."
  , authentication: "login"
  , username: username
  , password: password
  }, function (err, result) {
      if (err) {
          console.log(err);
      }
  }
);

    res.redirect('/#!/adminview');
};

exports.denyroom = function(req, res) {
    var id = req.query.id;

    Event.findByIdAndUpdate( id, 
        { 'viewed': true, 'approved': false }, 
        function(err, events) {}
    );


    mailer.send(
  {
      host: "smtp.mandrillapp.com"
  , port: 587
  , to: "trevorkowens@gmail.com"
  , from: "trevorkowens@gmail.com"
  , subject: "Event Denied"
  , body: "Your event has been denied."
  , authentication: "login"
  , username: username
  , password: password
  }, function (err, result) {
      if (err) {
          console.log(err);
      }
  }
);

    res.redirect('/#!/adminview');
};

exports.addevent = function (req, res) {
    //get is req.query
    //post is req.body
    //dont ask me why, its just how it is
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var sponsor = req.body.sponsor;
    var date = req.body.date;
    var roomNumber = req.body.roomNumber;
    var period = req.body.period;
    var description = req.body.description;

    if(date != null){
        var year = date.substring(0, 4);
        var month = date.substring(5, 7);
        var day = date.substring(8, 10);
    }


    if(date == null){
        return res.status(400).send({
            message: 'Error. Date not entered correctly.'
        });
    }

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
  
    var m1 = 'Error. ';
    var m2 = ' not entered correctly';

    if(name == null){
        return res.status(400).send({
            message: m1+'Name'+m2
        });
    }

    if(sponsor == null){
        return res.status(400).send({
            message: m1+'Sponsor'+m2
        });
    }

    if(email == null){
        return res.status(400).send({
            message: m1+'Email'+m2
        });
    }

    if(roomNumber == null){
        return res.status(400).send({
            message: m1+'Room'+m2
        });
    }

    if(period == null){
        return res.status(400).send({
            message: m1+'Period'+m2
        });
    }
 testEvent.save(function (err) {
        if (err) return res.status(400).send({
            message: 'Error adding event. Make sure the fields are entered correctly.'
        });

        else
            res.redirect('/');
    });
    console.log("Done Adding to Database");
};