'use strict';


angular.module('core').controller('GetMyParameters', ['$scope',
	function ($scope) {

	    $scope.getParameter = function (parameter) {
	        return $scope.getSearchParameters()[parameter];
	    }

	    $scope.getSearchParameters = function () {
	        var prmstr =// window.location.search.substr(1);
	        window.location.hash.substr(window.location.hash.indexOf('?')+1);
	        console.log(prmstr);
	        return prmstr != null && prmstr != "" ? $scope.transformToAssocArray(prmstr) : {};
	    }

	    $scope.transformToAssocArray = function (prmstr) {
	        var params = {};
	        var prmarr = prmstr.split("&");
	        for (var i = 0; i < prmarr.length; i++) {
	            var tmparr = prmarr[i].split("=");
	            params[tmparr[0]] = tmparr[1];
	        }
	        return params;
	    }
	}]);