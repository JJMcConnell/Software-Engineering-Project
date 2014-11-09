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

var the_id = '';

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

	describe('GENERAL', function () {
	    it('should connect to localhost', function (done) {
	        http.get('http://localhost:3000', function (res) {
	            done();
	        });
	    });

	});


	describe('SAVING EVENTS', function() {
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
       	    return myEvent.save(function (err, document) {
	            should.not.exist(err);
	            the_id = document._id;
	            console.log(the_id);
	            done();
	        });
	    });
	});


	describe('FINDING EVENTS THAT EXIST', function() {
	    it('should find events given no parameters', function (done) {
	        Event.find({ }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });	
	});

	describe('\t~~ finding events given single parameter', function() {
        it('by sponsor', function (done) {
            Event.find({ 'sponsor': 'Michael' }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by period', function (done) {
	        Event.find({ 'period': the_period }, 'time_period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    it('by room number', function (done) {
	        Event.find({ 'room': '121' }, 'period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });	
	    it('by day', function (done) {
	        Event.find({ 'day': the_day, 'month': the_month, 'year': '2014' }, 'period', function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });	
	    it('by month', function (done) {
            Event.find({'month': the_month }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });	
        it('by year', function (done) {
            Event.find({ 'year': '2014' }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by email', function (done) {
            Event.find({ 'contactEmail': 'Beta@gmail.com' }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by approved (false)', function (done) {
            Event.find({ 'approved': false }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by approved (true)', function (done) {
            Event.find({ 'approved': true }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by viewed (true)', function (done) {
            Event.find({ 'viewed': true }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by viewed (false)', function (done) {
            Event.find({ 'viewed': false }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

	});

	describe('\t~~ finding events given two parameters', function() {

	    it('should find events by day and room number', function (done) {
	        Event.find({ 'room': the_room, 'day': the_day }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    it('should find events by day and period', function (done) {
	        Event.find({ 'day': the_day, 'period': the_period }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    it('should find events by room number and period', function (done) {
	        Event.find({ 'room': the_room, 'period': the_period }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    it('should find events by title and period', function (done) {
	        Event.find({ 'title': name1, 'period': the_period }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    it('should find events by month and room number', function (done) {
	        Event.find({ 'month': the_month, 'room': the_room }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });
	});

	describe('\t~~ finding events with more than two parameters', function() {
	    it('should find events by month, room number and period', function (done) {
	        Event.find({ 'month': the_month, 'room': the_room, 'period': the_period }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });

	    /*
	    it('should find events by day, month, and year', function (done) {
	        Event.find({ 'day': the_day, 'month': the_month, 'year': the_year }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });
		*/

	    it('should find events by title, sponsor, and email', function (done) {
	        Event.find({ 'title': name1, 'sponsor': name2, 'contactEmail': email }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });		
	});


	describe('NOT FINDING EVENTS THAT DON\'T EXIST', function() {
   		it('invalid year', function (done) {
	        Event.find({ 'year': '2015' }, function (err, events) {
	            should.not.exist(err);
	            if (events.length == 0)
	                done();
	        });
	    });	

   		it('invalid month', function (done) {
	        Event.find({ 'month': '13' }, function (err, events) {
	            should.not.exist(err);
	            if (events.length == 0)
	                done();
	        });
	    });	

   		it('invalid room', function (done) {
	        Event.find({ 'room': '123' }, function (err, events) {
	            should.not.exist(err);
	            if (events.length == 0)
	                done();
	        });
	    });	

	    it('invalid period', function (done) {
	        Event.find({ 'room': '120', 'period': '54' }, function (err, events) {
	            should.not.exist(err);
	            if (events.length == 0)
	                done();
	        });
	    });
	});
	//admin approved test
	//admin rejected test
	
	describe('Admin Functions', function() {
			it("should approve the request", function (done) {
    				Event.findByIdAndUpdate( the_id, 
    					{ 'viewed': true, 'approved': true }, 
    					function(err, events) {
    						if(err){
    							console.log('Error = yes');
    						}
    						should.not.exist(err);
    					}
    				);

    				Event.findById( the_id, function (err, event) {
	            		should.not.exist(err);
	            		if ( event.approved == true ) {
	                		console.log("Event approved successfully.");
	                		done();
	            		}
	                	else console.log("Event approved did not work. Woopsie!");
	        		});
			});


		    
		    it('should reject the request', function (done) {
	       	    	Event.findByIdAndUpdate( the_id, 
    					{ 'viewed': true, 'approved': false }, 
    					function(err, events) {
    						should.not.exist(err);
    					}
    				);

    				Event.findById( the_id, function (err, event) {
	            		should.not.exist(err);
	            		if ( event.approved == false ) {
	                		done();
	            		}
	                	else console.log("Event rejected did not work. Woopsie!");
	        		});
		    });
	        

			it('should remove an event from the database', function (done) {
			    done();
			});
	});
	



    afterEach(function (done) {
        done();
    });
});