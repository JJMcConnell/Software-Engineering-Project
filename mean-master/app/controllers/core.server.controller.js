'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	passport = require('passport'),
    Event = mongoose.model('Event');





exports.index = function(req, res) {
    res.render('index');
    console.log("index");
};

exports.addevent = function (req, res) {
    //get is req.query
    //post is req.body
    //dont ask me why, its just how it is
    var name = req.body.name;


    var testEvent = new Event({
        title: name,
        sponsor: name,
        contactEmail: 'trevorkowens@gmail.com',
        room: '121',
        date: new Date(2014, 10, 10),
        time_period: '5'
    });

    testEvent.save(function (err, thor) {
        if (err) return console.error(err);
        console.dir(thor);
    });
    
    Event.find({ "title": 'Trevor' }, function (err, doc) {

        //happens later - too late to return stuff, function has ran already

        if (err) {
            //callback(err);
            return;
        }
        //callback(doc);
        console.log(doc);

        //res.jsonp(doc);
    })

    console.log(name);
    res.redirect('/');
    console.log("Done Adding to Database");
};