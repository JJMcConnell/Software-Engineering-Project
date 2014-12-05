'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
	    $scope.startDate = 'asdf';
	    $scope.generateAdmin = function () {
	        console.log("Trying to create admin ");
	        $http.post('/generateAdmin').success(function (response) {
	            console.log("Creating Admin");
      		}).error(function (response) {
      		    $scope.error = "Error creating admin";
          		console.log($scope.error);
      		});
	        $http.get('/getDateSettings').success(function (response) {
	            console.log('GOT DATE SETTINGS');
	            $scope.date = response;
	        }).error(function (response) {
	            $scope.error = "Error creating admin";
	            return $scope.error;
	        });
	        console.log('done');
	    };
	    $scope.dateSettings = function () {
	        $http.get('/getDateSettings', $scope.credentials).success(function (response) {
	            console.log(response);
	            $scope.startDate = new Date(parseInt(response.startYear), parseInt(response.startMonth)-1, parseInt(response.startDay));
	            $scope.endDate = new Date(parseInt(response.endYear), parseInt(response.endMonth)-1, parseInt(response.endDay));
	        }).error(function (response) {
	            $scope.error = 'error';
	            console.log('error');
	        });
	        console.log('done');
	    };
	    $scope.isThisGoodDate = function (date) {
	        var date = document.getElementById('selectedDate').innerHTML;
	        if (document.getElementById('selectedDate').innerHTML == '')
	            date = new Date().toDateString();
	        var day = date.substr(8, 2);
	        var year = date.substr(11, 4);
	        var month = date.substr(4, 3);
	        var selectedDate = new Date(month + ' ' + day + ', ' + year);
	        console.log((selectedDate.getTime() >= $scope.startDate.getTime()) && (selectedDate.getTime() <= $scope.endDate.getTime()));
	        return (selectedDate.getTime() >= $scope.startDate.getTime()) && (selectedDate.getTime() <= $scope.endDate.getTime());
	    }

	}]);