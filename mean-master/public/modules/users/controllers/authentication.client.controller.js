'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		// YEAH!!!
		$scope.validateLogin = function () {
		    //if ($scope.authentication.user) $location.path(path);
		    if (!$scope.authentication.user) $location.path('/');
		}

		$scope.parseWeirdDate = function (weirdDate) {
		    var newDate = weirdDate.substring(11, 19) + ', ' + weirdDate.substring(5,7) +"/"+weirdDate.substring(8,10)+"/"+ weirdDate.substring(0, 4);
		    return newDate;
		}


		$scope.events = [];
		$scope.fetchRequests = function () {
		    $http.get('/fetchRequests', $scope.credentials).success(function (response) {
		        // If successful we assign the response to the global user model
		        $scope.events = response;
		        return response;
		        console.log(response);
		    }).error(function (response) {
		        $scope.error = response.message;
		        //$location.path('/');
		    });
		    return null;
		}

		$scope.fetchApprovedEvents = function () {
		    $http.get('/fetchEvents', $scope.credentials).success(function (response) {
		        // If successful we assign the response to the global user model
		        $scope.events = response;
		        return response;
		        console.log(response);
		    }).error(function (response) {
		        $scope.error = response.message;
		        //$location.path('/');
		    });
		    return null;
		}

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/adminview');
				//window.location.replace('adminview');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);