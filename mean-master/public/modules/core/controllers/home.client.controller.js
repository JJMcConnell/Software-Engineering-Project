'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {
	    $scope.generateAdmin = function () {
	        console.log("Trying to create admin ");
	        $http.post('/generateAdmin').success(function (response) {
	            console.log("Creating Admin");
      		}).error(function (response) {
      		    $scope.error = "Error creating admin";
          		console.log($scope.error);
      		});
	    };
	}]);