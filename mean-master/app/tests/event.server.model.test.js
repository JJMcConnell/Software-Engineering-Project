'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	EventModel = require('./../models/article.server.model.js'),
	Event = mongoose.model('Event');


/**
 * Globals
 */
var  myEvent;
/**
 * Unit tests
 */

var names = ['Joey', 'Trevor', 'Yana', 'McGill', 'Rob', 'Danny', 'John',
			'Aaron', 'Costello', 'Abbot', 'Vermont', 'Maine', 'Florida',
			'Michael', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta',
			'Beatles', 'Zeppelin', 'Floyd', 'Amber', 'Ruby', 'Charmander',
			'Treeko', 'Apple', 'Orange', 'Red', 'Blue'];
var name1 = names[Math.floor(Math.random()*names.length)];
var name2 = names[Math.floor(Math.random()*names.length)];
var email = names[Math.floor(Math.random()*names.length)] + '@gmail.com';

var the_day = Math.floor((Math.random() * 30) + 1);
	// between 1 and 30
var the_month = 11 + Math.floor((Math.random() * 2));
	// between 11 and 12
var the_period = Math.floor((Math.random() * 7) + 1);
	// between 1 and 7

var rooms = ['101', '106', '120', '121', '142', '143',
			'144', '145', '146', '147', '232', '233'];
var the_room = rooms[Math.floor(Math.random()*rooms.length)];

console.log('title: '+name1+'\nsponsor: '+name2+
		  '\nemail: '+email+'\nday: '+the_day+'\nmonth: '+
		  the_month+'\nperiod: '+the_period+'\nroom: '+the_room);
 
describe('Event Model Unit Tests:', function() {

    beforeEach(function(done) {
		// create sample event
	    myEvent = new Event({
	        title: name1,
	        sponsor: name2,
	        contactEmail: email,
	        room: the_room,
            day: the_day,
            month: the_month,
            year: 2014,
	        period: the_period,
	        approved: false,
	        viewed: false
	    });
	    done();
	});

	var assert = require('assert'),
    http = require('http');

	describe('/', function () {
	    it('should connect to localhost', function (done) {
	        http.get('http://localhost:3000', function (res) {
	            done();
	        });
	    });

	});

	describe('Method Save', function() {
		it("should connect to database", function (done) {
	        var db = mongoose.connect('mongodb://master:master@ds039850.mongolab.com:39850/projectdb', function (err) {  
	            if (err)
	                mongoose.connection.on('error', function (err) {
	                    should.not.exist(err);      
	                });
	            done();
	        });
	    });


	    it('should be able to save events in database', function (done) {
       	    return myEvent.save(function (err) {
	            should.not.exist(err);
	            done();
	        });
	    });
	});

	describe('Where events should be found', function() {

	    it('should find events given no parameters', function (done) {
	        Event.find({ }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });	

	    it('should find events by day and room number', function (done) {
	        Event.find({ 'room': '121', 'date': '10-12-2014' }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    it('should find events by day and period', function (done) {
	        Event.find({ 'room': '121', 'time_period': '5' }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    it('should find events by period only', function (done) {
	        Event.find({ 'time_period': '5' }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    it('should find events by room number', function (done) {
	        Event.find({ 'room': '121' }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });	
	    it('should find events by day', function (done) {
	        Event.find({ 'date': '10-12-2014' }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });		
	});

	describe('Where no events should be found', function() {
   		it('should not find events in date w/ no events', function (done) {
	        Event.find({ 'date': '10-12-2015' }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length == 0)
	                done();
	        });
	    });	


   		it('should not find events in room w/ no events', function (done) {
	        Event.find({ 'room': '123' }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length == 0)
	                done();
	        });
	    });	

	    it('should not find events at room with no period', function (done) {
	        Event.find({ 'room': '123', 'time_period': '5' }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length == 0)
	                done();
	        });
	    });
	});


	afterEach(function(done) {
		done();
	});

/*
describe('Event Model Unit Tests:', function () {
    beforeEach(function (done) {
        // create sample event
        myEvent = new Event({
            title: 'TestTitle',
            sponsor: 'TestSponsor',
            contactEmail: 'trevorkowens@gmail.com',
            room: '121',
            year: '2014',
            month: '12',
            day: '10',
            period: '5'
        });
        done();
    });

    var assert = require('assert'),
    http = require('http');

    describe('/', function () {
        it('should connect to localhost', function (done) {
            http.get('http://localhost:3000', function (res) {
                done();
            });
        });

    });


    describe('Method Save', function () {
        it("should connect to database", function (done) {
            var db = mongoose.connect('mongodb://master:master@ds039850.mongolab.com:39850/projectdb', function (err) {
                if (err)
                    mongoose.connection.on('error', function (err) {
                        should.not.exist(err);
                    });
                done();
            });
        });


        it('should be able to save events in database', function (done) {
            return myEvent.save(function (err) {
                console.log(err);
                should.not.exist(err);
                done();
            });
        });
    });
    describe('Where events should be found', function () {

        it('should find events given no parameters', function (done) {
            Event.find({}, function (err, events) {
                should.not.exist(err);
                console.log(err);
                if (events.length > 0)
                    done();
            });
        });

        it('should find events by day and room number', function (done) {
            Event.find({ 'room': '121', 'year': '2014', 'day':'10', month:'12' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('should find events by day and period', function (done) {
            Event.find({ 'room': '121', 'period': '5' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('should find events by period only', function (done) {
            Event.find({ 'period': '5' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('should find events by room number', function (done) {
            Event.find({ 'room': '121' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });
        it('should find events by day', function (done) {
            Event.find({ 'day': '10', 'month':'12', 'year': '2014' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });
        it('should find events by month', function (done) {
            Event.find({'month': '12', 'year': '2014' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('should find events by year', function (done) {
            Event.find({ 'month': '12', 'year': '2014' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });
    });

    describe('Where no events should be found', function () {
        it('should not find events in date w/ no events', function (done) {
            Event.find({ 'day': '40', 'month':'12', 'year':'2014' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length == 0)
                    done();
            });
        });


        it('should not find events in room w/ no events', function (done) {
            Event.find({ 'room': '123' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length == 0)
                    done();
            });
        });

        it('should not find events at room with no period', function (done) {
            Event.find({ 'room': '123', 'period': '5' }, 'period', function (err, events) {
                should.not.exist(err);
                if (events.length == 0)
                    done();
            });
        });
    });
    */


    afterEach(function (done) {
        Event.remove({ _id: myEvent.id }, function (err) {
            if (!err) {
                done();
            }
            else {
                console.log('error with afterEach');
            }
        });
        done();
    });
});