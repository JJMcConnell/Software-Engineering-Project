'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	EventModel = require('./../models/article.server.model.js'),
	Event = mongoose.model('Event'),
    Settings = mongoose.model('AdminSetting');


/**
 * Globals
 */
var  myEvent;
/**
 * Unit tests
 */

var names = ['Joey', 'Trevor', 'Yana', 'McGill', 'Rob', 'Danny', 'John',
			'Aaron', 'Costello', 'Abbot', 'France', 'Tobias', 'Myriam',
			'Jacqui', 'Lesli', 'Mana', 'Boyd', 'Janean', 'Noah', 'Velia',
			'sarah', 'Caroll', 'Kattie', 'Lynell', 'Berta', 'Blanca',
			'Harry', 'Dorsey', 'Alda', 'Mariam', 'Leoma', 'Paz', 'Calvin',
			'Candie', 'Mari', 'Derek', 'Layla', 'Robert', 'Roberta'];
var name1 = names[Math.floor(Math.random()*names.length)];
var name2 = names[Math.floor(Math.random() * names.length)];
var name3 = names[Math.floor(Math.random() * names.length)];
var email = 'trevorkowens@gmail.com';//names[Math.floor(Math.random()*names.length)] + '@gmail.com';

var the_day = Math.floor((Math.random() * 30) + 1);
	// between 1 and 30
var the_month = 11 + Math.floor((Math.random() * 2));
	// between 11 and 12
var the_period = Math.floor((Math.random() * 7) + 4);
	// between 4 and 10 (for period lengths of four)

var the_length = Math.floor((Math.random() * 4) + 1);
// between 1 and 4

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
	        organization: name3,
	        contactEmail: email,
	        room: the_room,
            day: the_day,
            month: the_month,
            year: 2014,
	        period: the_period,
	        approved: false,
	        viewed: false,
            length: the_length
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
            Event.find({ 'sponsor': name2 }, function (err, events) {
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
	        Event.find({ 'room': the_room }, 'period', function (err, events) {
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
            Event.find({ 'contactEmail': email }, function (err, events) {
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

        it('by isClass (false)', function (done) {
            Event.find({ 'isClass': false }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by title', function (done) {
            Event.find({ 'title': name1 }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by sponsor', function (done) {
            Event.find({ 'sponsor': name2 }, function (err, events) {
                should.not.exist(err);
                if (events.length > 0)
                    done();
            });
        });

        it('by organization', function (done) {
            Event.find({ 'organization': name3 }, function (err, events) {
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

	    
	    it('should find events by day, month, and year', function (done) {
	        Event.find({ 'day': the_day, 'month': the_month, 'year': 2014 }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });
		

	    it('should find events by title, sponsor, and email', function (done) {
	        Event.find({ 'title': name1, 'sponsor': name2, 'contactEmail': email }, function (err, events) {
	            should.not.exist(err);
	            if (events.length > 0)
	                done();
	        });
	    });		
	});

	describe('Admin Settings', function () {
	    it('Should find admin settings', function (done) {
	        Settings.find({}, function(err, settings){
	            if (settings.length > 0)
	                done();
	        });
	    });

	    it('Should find admin settings start day', function (done) {
	        Settings.find({}, function (err, settings) {
	            if (settings[0].startDay != null)
	                done();
	        });
	    });

	    it('Should find admin settings start month', function (done) {
	        Settings.find({}, function (err, settings) {
	            if (settings[0].startMonth != null)
	                done();
	        });
	    });

	    it('Should find admin settings start year', function (done) {
	        Settings.find({}, function (err, settings) {
	            if (settings[0].startYear != null)
	                done();
	        });
	    });

	    it('Should find admin settings end day', function (done) {
	        Settings.find({}, function (err, settings) {
	            if (settings[0].endDay != null)
	                done();
	        });
	    });

	    it('Should find admin settings end month', function (done) {
	        Settings.find({}, function (err, settings) {
	            if (settings[0].endMonth != null)
	                done();
	        });
	    });

	    it('Should find admin settings end year', function (done) {
	        Settings.find({}, function (err, settings) {
	            if (settings[0].endYear != null)
	                done();
	        });
	    });

	});

	describe('Finding conflicting events', function () {
	    it('Should find unavailable periods for length 1', function (done) {
	        Event.find({ 'month': the_month, 'day': the_day, 'year': 2014, 'room': the_room }, function (err, events) {
	            var periodsAvailable = [true, true, true, true, true, true, true, true, true, true, true, true, true];
	            // There it works.
	            for (var myEvent in events) {
	                for (var x = 1; x < 14; x++) {

	                    for (var i = 0; i < 1; i++) {
	                        //somethnigs booked at period x+i
	                        //console.log(events[myEvent]);

	                        if (events[myEvent].period == (x + i)) {
	                            periodsAvailable[x - 1] = false;
	                            for (var j = 1; j < events[myEvent].length; j++) {
	                                periodsAvailable[x - 1 + j] = false;
	                            }
	                        }

	                    }
	                    //nothing booked for periods i = add period to periodsAvailable
	                }
	            }
	            if (periodsAvailable[the_period - 1] == false)
	                done();
	        });
	    });
	    it('Should find unavailable periods for length 2', function (done) {
	        Event.find({ 'month': the_month, 'day': the_day, 'year': 2014, 'room': the_room }, function (err, events) {
	            var periodsAvailable = [true, true, true, true, true, true, true, true, true, true, true, true, true];
	            // There it works.
	            for (var myEvent in events) {
	                for (var x = 1; x < 14; x++) {

	                    for (var i = 0; i < 2; i++) {
	                        //somethnigs booked at period x+i
	                        //console.log(events[myEvent]);

	                        if (events[myEvent].period == (x + i)) {
	                            periodsAvailable[x - 1] = false;
	                            for (var j = 1; j < events[myEvent].length; j++) {
	                                periodsAvailable[x - 1 + j] = false;
	                            }
	                        }

	                    }
	                    //nothing booked for periods i = add period to periodsAvailable
	                }
	            }
	            if (periodsAvailable[the_period - 1] == false && periodsAvailable[the_period-2] == false)
	                done();
	        });
	    });
	    it('Should find unavailable periods for length 3', function (done) {
	        Event.find({ 'month': the_month, 'day': the_day, 'year': 2014, 'room': the_room }, function (err, events) {
	            var periodsAvailable = [true, true, true, true, true, true, true, true, true, true, true, true, true];
	            // There it works.
	            for (var myEvent in events) {
	                for (var x = 1; x < 14; x++) {

	                    for (var i = 0; i < 3; i++) {
	                        //somethnigs booked at period x+i
	                        //console.log(events[myEvent]);

	                        if (events[myEvent].period == (x + i)) {
	                            periodsAvailable[x - 1] = false;
	                            for (var j = 1; j < events[myEvent].length; j++) {
	                                periodsAvailable[x - 1 + j] = false;
	                            }
	                        }

	                    }
	                    //nothing booked for periods i = add period to periodsAvailable
	                }
	            }
	            if (periodsAvailable[the_period - 1] == false && periodsAvailable[the_period - 2] == false && periodsAvailable[the_period - 3] == false)
	                done();
	        });
	    });
	    it('Should find unavailable periods for length 4', function (done) {
	        Event.find({ 'month': the_month, 'day': the_day, 'year': 2014, 'room': the_room }, function (err, events) {
	            var periodsAvailable = [true, true, true, true, true, true, true, true, true, true, true, true, true];
	            // There it works.
	            for (var myEvent in events) {
	                for (var x = 1; x < 14; x++) {

	                    for (var i = 0; i < 4; i++) {
	                        //somethnigs booked at period x+i
	                        //console.log(events[myEvent]);

	                        if (events[myEvent].period == (x + i)) {
	                            periodsAvailable[x - 1] = false;
	                            for (var j = 1; j < events[myEvent].length; j++) {
	                                periodsAvailable[x - 1 + j] = false;
	                            }
	                        }

	                    }
	                    //nothing booked for periods i = add period to periodsAvailable
	                }
	            }
	            if (periodsAvailable[the_period - 1] == false && periodsAvailable[the_period - 2] == false && periodsAvailable[the_period - 3] == false && periodsAvailable[the_period - 4] == false)
	                done();
	        });
	    });
	    it('Should mark periods unavailable based on event length', function (done) {
	        Event.find({ 'month': the_month, 'day': the_day, 'year': 2014, 'room': the_room }, function (err, events) {
	            var periodsAvailable = [true, true, true, true, true, true, true, true, true, true, true, true, true];
	            // There it works.
	            for (var myEvent in events) {
	                for (var x = 1; x < 14; x++) {

	                    for (var i = 0; i < 1; i++) {
	                        //somethnigs booked at period x+i
	                        //console.log(events[myEvent]);

	                        if (events[myEvent].period == (x + i)) {
	                            periodsAvailable[x - 1] = false;
	                            for (var j = 1; j < events[myEvent].length; j++) {
	                                periodsAvailable[x - 1 + j] = false;
	                            }
	                        }

	                    }
	                    //nothing booked for periods i = add period to periodsAvailable
	                }
	            }
	            for (var i = 0; i < the_length; i++)
	                periodsAvailable[the_period - 1 + i].should.equal(false);
	                done();
	        });
	    });
	});


	describe('NOT FINDING EVENTS THAT DON\'T EXIST', function() {
   		it('invalid year', function (done) {
	        Event.find({ 'year': '9999' }, function (err, events) {
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
    					{'approved': true }, 
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
    					{'approved': false }, 
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