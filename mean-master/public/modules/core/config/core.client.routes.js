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
		state('calendar', {
		    url: '/calendar',
		    templateUrl: 'modules/core/views/calendar.client.view.html'
		}).
        state('home', {
            url: '/',
            templateUrl: 'modules/core/views/home.client.view.html'
        });

	    // Home state routing

	}



]);