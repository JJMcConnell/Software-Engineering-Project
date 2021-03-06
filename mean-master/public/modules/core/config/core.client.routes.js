'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
	    // Redirect to home view when route not found
	    $urlRouterProvider.otherwise('/');
	    /*
	    $urlRouterProvider
			.when('/c', {
			    templateUrl: 'modules/core/views/calendar.client.view.html',
			    controller: mainController
			});*/
	    // Home state routing
	    $stateProvider.
        /*state('home', {
            url: '/',
            templateUrl: 'modules/core/views/home.client.view.html'
        }).        */
		state('calendar', {
		    url: '/',
		    templateUrl: 'modules/core/views/calendar.client.view.html'
		}).
		state('uncalendar', {
			url: '/uncalendar',
			templateUrl: 'modules/core/views/uncalendar.client.view.html'
		}).

        state('room calendar', {
            url: '/calendarForRoom',
            templateUrl: 'modules/core/views/roomCalendar.client.view.html'
        }).
        state('contact', {
            url: '/contact',
            templateUrl: 'modules/core/views/contact.client.view.html'
        }).
        state('event request', {
        	url: '/calendarRequest',
        	templateUrl: 'modules/core/views/requestCalendar.client.view.html'
        }).
        state('room', {
        	url: '/room',
        	templateUrl: 'modules/core/views/pickRoom.client.view.html'
        }).
        state('period', {
        	url: '/period',
        	templateUrl: 'modules/core/views/pickPeriod.client.view.html'
        });
		// Home state routing
	}



]);