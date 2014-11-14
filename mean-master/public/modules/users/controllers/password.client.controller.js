   'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		//if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function () {
		    console.log("yay");
			$scope.success = $scope.error = null;
			
			/*
			mailer.send(
              {
                  host: "smtp.mandrillapp.com"
              , port: 587
              , to: "trevorkowens@gmail.com"
              , from: "trevorkowens@gmail.com"
              , subject: "Mandrill knows Javascript!"
              , body: "Reset your password using this link! \n www.link.com"
              , authentication: "login"
              , username: username
              , password: password
              }, function (err, result) {
                  if (err) {
                      console.log(err);
                  }
              }
            );
            */
			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);