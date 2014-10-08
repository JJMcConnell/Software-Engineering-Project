'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});

		// Home state routing
		$stateProvider.
		state('room', {
			url: '/room/:tagId',
			templateUrl: 'modules/core/views/room.client.view.html'
		});
	}



]);