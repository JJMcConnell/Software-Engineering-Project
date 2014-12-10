'use strict';

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
			'Aaron', 'Costello', 'Abbot', 'France', 'Tobias', 'Myriam',
			'Jacqui', 'Lesli', 'Mana', 'Boyd', 'Janean', 'Noah', 'Velia',
			'sarah', 'Caroll', 'Kattie', 'Lynell', 'Berta', 'Blanca',
			'Harry', 'Dorsey', 'Alda', 'Mariam', 'Leoma', 'Paz', 'Calvin',
			'Candie', 'Mari', 'Derek', 'Layla', 'Robert', 'Roberta'];

	var name1 = names[Math.floor(Math.random()*names.length)];
	var name2 = names[Math.floor(Math.random()*names.length)];
	var name3 = names[Math.floor(Math.random()*names.length)];
	var email = names[Math.floor(Math.random()*names.length)] + '@gmail.com';

	var the_day = Math.floor((Math.random() * 30) + 1);
		// between 1 and 30
	var the_month = 1 + Math.floor((Math.random() * 2));
		// between 11 and 12
	var the_period = Math.floor((Math.random() * 7) + 1);
		// between 1 and 7
	var the_length = Math.floor((Math.random() * 4) + 1);
        // between 1 and 4


	var rooms = ['101', '106B', '120', '121', '142', '143',
				'144', '145', '146', '147', '232', '233A'];
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
	            year: 2015,
		        period: the_period,
		        approved: true,
		        viewed: true,
                length: the_length
		    });
		    done();
		});

		var assert = require('assert'),
	    http = require('http');

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
		            //the_id = document._id;
		            //console.log(the_id);
		            done();
		        });
		    });
		});


	    afterEach(function (done) {
	        done();
	    });
	});
