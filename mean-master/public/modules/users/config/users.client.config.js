'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
<<<<<<< HEAD
				return {
=======
			    return {
>>>>>>> 3bae882d87d195c73aaae43d23a4404cddc33ffd
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}
<<<<<<< HEAD

=======
						$location.path('/calendar');
>>>>>>> 3bae882d87d195c73aaae43d23a4404cddc33ffd
						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);