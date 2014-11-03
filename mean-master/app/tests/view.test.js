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

describe('Front End View Test', function(){

	var assert = require('assert'),
    http = require('http');

	describe('FRONT PAGE VIEW', function () {
	    it('should connect to localhost', function (done) {
	        http.get('http://localhost:3000/', function (res) {
	            done();
	        });
	    });
	});

	describe('ADMIN VIEW', function () {
	    it('should connect to localhost', function (done) {
	        http.get('http://localhost:3000/adminview', function (res) {
	            done();
	        });
	    });
	});

	describe('CALENDAR VIEW', function () {
	    it('should connect to localhost', function (done) {
	        http.get('http://localhost:3000/#!/calendar', function (res) {
	            done();
	        });
	    });
	});

	describe('ROOM VIEW', function () {
	    it('should connect to localhost', function (done) {
	        http.get('http://localhost:3000/room120', function (res) {
	            done();
	        });
	    });
	});


	afterEach(function (done) {
	        /* ._id.$oid
	        Event.remove({ _id: myEvent.id }, function (err) {
	            if (!err) {
	                done();
	            }
	            else {
	                console.log('error with afterEach');
	            }
	        });*/
	        done();
	    });
});