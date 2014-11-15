'use strict';


angular.module('core').controller('HomeController', ['$scope',
	function($scope) {
	      $scope.generateAdmin = function () {
	     $http.post('/generateAdmin').success(function (response) {
      		}).error(function (response) {
          		$scope.error = "Error creating admin";
          		console.log($scope.error);
      		});
	    };
	}]);