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
    //console.log('index');
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

exports.index = function (req, res) {
    res.render('index', {
        data: "this is data"
    });
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

exports.roomnumber = function (req, res) {
    console.log(req.param("tagId"));
    res.render('room');
    /*
    Event.find({ 'room': req.param("tagId") }, function (err, events) {
        if (err) return handleError(err);
        else if (events != "") res.json(events);
        else res.send("No events in this room");
    })*/
}

exports.addevent = function (req, res) {
    //get is req.query
    //post is req.body
    //dont ask me why, its just how it is
    console.log(req.request);
    console.log(req.body);
    //example request http://localhost:3000/requestevent?name=Trevor+Owens&telephone=1231234123&sponsor=Trevor+is+Awesome&date=1994-01-04&roomNumber=232A&period=10
    var name = req.query.name;
    var email = req.query.email;
    var telephone = req.query.telephone;
    var sponsor = req.query.name;
    var date = req.query.date;
    var roomNumber = req.query.roomNumber;
    var period = req.query.period;
    var description = req.query.description;

date='2014-12-12';

    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);



    if(day == null){
        return res.status(400).send({
            message: 'Error. Day not entered correctly.'
        });
    }

    if(month == null){
        return res.status(400).send({
            message: 'Error. Month not entered correctly.'
        });
    }

    if(year == null){
        return res.status(400).send({
            message: 'Error. Year not entered correctly.'
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
  
   

    if(name == null){
        return res.status(400).send({
            message: 'Error. Name not entered correctly.'
        });
    }

    if(sponsor == null){
        return res.status(400).send({
            message: 'Error. Sponsor not entered correctly.'
        });
    }

    if(email == null){
        return res.status(400).send({
            message: 'Error. Email not entered correctly.'
        });
    }

    if(roomNumber == null){
        return res.status(400).send({
            message: 'Error. Room not entered correctly.'
        });
    }

    if(period == null){
        return res.status(400).send({
            message: 'Error. Sponsor not entered correctly.'
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