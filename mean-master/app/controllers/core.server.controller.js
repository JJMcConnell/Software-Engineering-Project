'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	passport = require('passport'),
    EventSchema = require('./../models/article.server.model.js'),
    Event = mongoose.model('Event'),
    swig = require('swig'),
    Settings = mongoose.model('AdminSetting'),
    User = mongoose.model('User'),
    Room = mongoose.model('Room');

//EventSchema = require('./../models/article.server.model.js'),

var mailer = require("mailer")
, username = "trevorkowens@gmail.com"
, password = "WD6Av_7xpEyY_rgoRzFNGg";

/*
 * TABLE OF CONTENTS:
 * index
 * adminview
 * fetchRequests
 * fetchEvents
 * fetchEventsFromRoom
 * eventsByMonth
 * eventsByDay
 * eventsByYear
 * adminWithRoom
 * thisRoomApproved
 * thisRoomRejected
 * approveroom
 * denyroom
 * addevent
 * {working on} show rooms available rather than rooms taken
 * {working on} displaying when rooms are not taken
 */

exports.getDateSettings = function (req, res) {

     Settings.find({}, function (err, events) {
         console.log(events);
         res.jsonp(events[0]);
         
     });
};


 
exports.available = function (req, res) {
    var periods = [false, false, false, false, false, false, false, false, false, false, false];
        // periods[0] to periods[6] ==> periods 1 through 7
        // periods[7] to periods[9] ==> periods E1 through E3

        // search all events for a given room on a given day
    var string = req.param('info');
    var roomNo, month, day, year;

    var split = string.split('_');

    var roomNo = split[0];
    var month = split[1];
    var day = split[2];
    var year = split[3];

    console.log(roomNo + " " + month + " " + day + " " + year);

    Event.find({ 'approved': true, 'room': roomNo, 'month': month, 
        'day': day, 'year': year }, function (err, events) {        
        if (err) return handleError(err);

        else if (events == null)
            res.render('available', {reservations: "NONE"});

        else res.render('available', {
            reservations: events,
            array: periods
        });
    })
}


exports.generateAdmin = function (req, res) {
    //res.jsonp('created admin');
    console.log('Trying to create admin.');
    Settings.find({}, function (err, events) {
        console.log('Trying to create admin.');
        if (events.length == 0) {
            var date = new Date();
            var startDay = date.getDate();
            var startMonth = date.getMonth();
            var startYear = date.getFullYear();

            var adminsetting = new Settings({
                startDay: startDay,
                startMonth: startMonth,
                startYear: startYear,
                endDay: 1,
                endMonth: 1,
                endYear: startYear + 1

            });

            adminsetting.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully created admin settings.");
                }
            });
        }
    });

    var myRoom = new Room({
        roomNumber: '123'
    });


    myRoom.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully created room.");
        }
    });

    var credentials = {firstName: 'Trevor', lastName: 'Owens', email: 'trevorkowens@ufl.edu', username: 'trevor', password: 'admin1234'};

    var user = new User(credentials);
    var message = null;

    // Add missing user fields
    user.provider = 'local';
    user.displayName = user.firstName + ' ' + user.lastName;
    // Then save the user 
    user.save(function (err) {
        if (err) {
            return err;
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
    });
    
}



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

exports.index = function (req, res) {
    res.render('index');
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

exports.fetchRequestsForDayRoomAndPeriod = function (req, res) {
    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
    var room = req.body.room;
    var period = req.body.period;
    Event.find({ 'viewed': false, 'day': day, 'month': month, 'year': year, 'room': room, 'period': period}, function (err, events) {
        if (err) {
            res.send('error!');
            return handleError(err);
        }
        else {
            res.jsonp(events);
        }
    });
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

exports.fetchEvents = function (req, res) {
    var month = req.query.month;
    var day = req.query.day;
    var year = req.query.year;

    Event.find({ 'approved': true }, function (err, events) {
        if (err) return handleError(err);

        res.jsonp(events);
        // console.log(events);

    })
    //res.render('index');
};

exports.fetchEventByID = function (req,res){
    var id = req.query.id;
    Event.findById(id, function (err, events){
        if(err) return handleError(err);

        res.jsonp(events);
    })
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

exports.getAvailablePeriods = function (req, res) {
    var month = req.query.month;
    var day = req.query.day;
    var year = req.query.year;
    var room = req.query.room;
    var length = req.query.length;

    
    console.log(day);


    Event.find({'month': month, 'day': day, 'year': year, 'room':room, 'approved': true}, function (err, events){
    var periodsAvailable = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];  
    console.log("NUMBER OF EVENTS "+events.length);
    console.log(events);  
        // There it works.
        for(var myEvent in events){
            for(var x = 1; x < 14; x++){
                
                for(var i = 0; i < length; i++){
                    //somethnigs booked at period x+i
                    console.log(events[myEvent]);

                    if(events[myEvent].period == (x+i)){
                        periodsAvailable[x-1] = false;
                        for (var j = 1; j<events[myEvent].length; j++){
                            periodsAvailable[x-1+j] = false;
                        }
                    }

                }
                //nothing booked for periods i = add period to periodsAvailable
            }
        }
        res.jsonp({ periods: periodsAvailable, day: day, month: month, year: year});
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

exports.index = function (req, res) {
    res.render('index', {
        data: "this is data"
    });
};
var d;


exports.approveAndDenyConflicting = function (req, res) {
    var id = req.body.id;


    Event.findByIdAndUpdate(id,
        { 'viewed': true, 'approved': true },
        function (err, events) {

            Event.find({ 'viewed': false, 'day': events.day, 'month': events.month, 'year': events.year, 'room': events.room, 'period': events.period }, function (err, events) {
                if (err) {
                    res.send('error!');
                    return handleError(err);
                }
                else {
               
                    for (var i = 0; i < events.length; i++) {
                        Event.findByIdAndUpdate(events[i]._id,
                            { 'viewed': true, 'approved': false },
                            function (err, events) {


                                mailer.send(
                              {
                                  host: "smtp.mandrillapp.com"
                              , port: 587
                              , to: events.contactEmail //WILL CHANGE THIS TO USERS EMAIL, BUT NOT NOW SO RANDOM PEOPLE DON'T GET EMAILS
                              , from: "trevorkowens@gmail.com"
                              , subject: "Event Denied/Conflict"
                              , body: "Your request was denied, in favor of another request for the same day/period/room."
                              , authentication: "login"
                              , username: username
                              , password: password
                              }, function (err, result) {
                                  if (err) {
                                      console.log(err);
                                  }
                              }
                            );
                            }
                        );
                    }
               
                }
            });

            mailer.send(
          {
              host: "smtp.mandrillapp.com"
          , port: 587
          , to: events.contactEmail //WILL CHANGE THIS TO USERS EMAIL, BUT NOT NOW SO RANDOM PEOPLE DON'T GET EMAILS
          , from: "trevorkowens@gmail.com"
          , subject: "Event Approved"
          , body: "Your event, " + events.title + ", has been approved."
          , authentication: "login"
          , username: username
          , password: password
          }, function (err, result) {
              if (err) {
                  console.log(err);
              }
          }
        );
        }



    );






    res.redirect('/#!/adminview');

}


exports.approveroom = function(req, res) {
    var id = req.query.id;
    console.log(id);
    Event.findByIdAndUpdate( id, 
        { 'viewed': true, 'approved': true }, 
        function(err, events) {


    mailer.send(
  {
      host: "smtp.mandrillapp.com"
  , port: 587
  , to: events.contactEmail //WILL CHANGE THIS TO USERS EMAIL, BUT NOT NOW SO RANDOM PEOPLE DON'T GET EMAILS
  , from: "trevorkowens@gmail.com"
  , subject: "Event Approved"
  , body: "Your event, "+events.title+", has been approved."
  , authentication: "login"
  , username: username
  , password: password
  }, function (err, result) {
      if (err) {
          console.log(err);
      }
  }
);
        }
    );
    res.redirect('/#!/adminview');
};

exports.changeDates = function (req, res) {
    //var startDate = req.body.startDate;
    //var endDate = req.body.endDate;
    var startDate = req.body.startDate;
    var endDate =  req.body.endDate;

     if(startDate != null){
        var startYear = startDate.substring(0, 4);
        var startMonth = startDate.substring(5, 7);
        var startDay = startDate.substring(8, 10);
    }

    if(endDate != null){
        var endYear = endDate.substring(0, 4);
        var endMonth = endDate.substring(5, 7);
        var endDay = endDate.substring(8, 10);
    }

    if(startDate == null){
        return res.status(400).send({
            message: 'Error. Start date not entered correctly.'
        });
    }

    if(endDate == null){
        return res.status(400).send({
            message: 'Error. End date not entered correctly.'
        });
    }

    Settings.findOne({}, function (err, doc) {
        if(err){
            return handleError(err);
        }
        else{
            doc.startDay = startDay;
            doc.startMonth = startMonth;
            doc.startYear = startYear;
            doc.endDay = endDay;
            doc.endMonth = endMonth;
            doc.endYear = endYear;
            doc.save();
        }
    })
    res.redirect('/');
};

exports.denyroom = function (req, res) {
    console.log('POST!!!!');

    
    var id = req.body.id;
    var adminComment = '';
    if (req.body.adminComment)
        var adminComment = ' Here is a comment from the administrator: ' + req.body.adminComment;

    console.log('POSTED!!!!!!!!');
    console.log(req.body);
    
    Event.findByIdAndUpdate(id,
        { 'viewed': true, 'approved': false },
        function (err, events) {

            console.log(events.contactEmail);
            mailer.send(
          {
              host: "smtp.mandrillapp.com"
          , port: 587
          , to: events.contactEmail
          , from: "trevorkowens@gmail.com"
          , subject: "Event Denied"
          , body: "Your event, "+events.title+", has been denied." + adminComment
          , authentication: "login"
          , username: username
          , password: password
          }, function (err, result) {
              if (err) {
                  console.log(err);
              }
          });


        });
    res.redirect('/');
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

exports.addAdminEvent = function (req, res){
    var name = req.body.name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var roomNumber = req.body.roomNumber;
    var date = req.body.date;
    var period = req.body.period;
    var description = req.body.description;
    var length = req.body.length;

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

    var AdminEvent = new Event({
        description: description,
        title: name,
        sponsor: 'Pickeral',
        organization: 'Admin',
        contactEmail: email,
        contactPhone: telephone,
        isClass: true,
        room: roomNumber,
        day: day,
        month: month,
        year: year,
        period: period,
        length: length,
        viewed: true,
        approved: true
    });

    if(name == null){
        return res.status(400).send({
            message: 'Error. Name not entered correctly.'
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
            message: 'Error. Period not entered correctly.'
        });
    }
    AdminEvent.save(function (err) {
        if (err) console.log(err);
        if (err) return res.status(400).send({
            message: 'Error adding event. Make sure the fields are entered correctly.'
        });

        else
            res.redirect('/');
    });

}

exports.addevent = function (req, res) {
    //get is req.query
    //post is req.body
    //dont ask me why, its just how it is
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var sponsor = req.body.sponsor;
    var organization = req.body.organization;
    var date = req.body.date;
    var roomNumber = req.body.roomNumber;
    var period = req.body.period;
    var description = req.body.description;
    var length = req.body.length;

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
        organization: organization,
        contactEmail: email,
        contactPhone: telephone,
        room: roomNumber,
        day: day,
        month: month,
        year: year,
        period: period,
        length: length
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

    if (organization == null) {
        return res.status(400).send({
            message: 'Error. Organization not entered correctly.'
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
        if (err) console.log(err);
        if (err) return res.status(400).send({
            message: 'Error adding event. Make sure the fields are entered correctly.'
        });

        else
            res.redirect('/');
    });
    console.log("Done Adding to Database");
};