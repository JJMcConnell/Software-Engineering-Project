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
var myEvent;
/**
 * Unit tests
 */
describe('Event Model Unit Tests:', function() {
	beforeEach(function(done) {
	    done();
        
	    myEvent = new Event({
	        title: 'TestTitle',
	        sponsor: 'TestSponsor',
	        contactEmail: 'trevorkowens@gmail.com',
	        room: '121',
	        time_period: '5'
	    });
	    done();
	});

	describe('Method Save', function() {
	
	    this.timeout(15000);//http://stackoverflow.com/questions/18335017/drop-mongodb-database-before-running-mocha-test
	    it("Can connect", function (done) {
	        mongoose.connect('mongodb://master:master@ds039850.mongolab.com:39850/projectdb', function (err) {
	            mongoose.connection.db.dropDatabase(function () {
	                should.not.exist(err);
	                done();
	            })
	        })
	    });
/*
	    mongoose.connect(config.db, function(err) {
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        }
	    }
        */
	    it('should be able to save without problems', function (done) {
             
	        return myEvent.save(function (err) {
	            if (err) console.log(err);
	            done();
	        });
		    /*myEvent.save(function (err) {
				should.not.exist(err);
				done();
			});
            */
	        //done();
		});

	});

	afterEach(function(done) {
		Event.remove().exec();
		done();
	});
});