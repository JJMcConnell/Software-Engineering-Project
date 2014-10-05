'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Event = mongoose.model('Event');

/**
 * Globals
 */
var user, article;

/**
 * Unit tests
 */
describe('Event Model Unit Tests:', function() {
	beforeEach(function(done) {

	    myEvent = new Event({
	        room: "120",
	        date: new Date(2014, 10, 10),
	        time_period: 1
	    });

		myEvent.save(function() {

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return myEvent.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

	});

	afterEach(function(done) {
		Event.remove().exec();
		done();
	});
});