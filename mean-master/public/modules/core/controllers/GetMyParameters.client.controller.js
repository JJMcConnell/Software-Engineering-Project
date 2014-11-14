'use strict';


angular.module('core').controller('GetMyParameters', ['$scope',
	function ($scope) {

	    $scope.getGetTagAfter = function (pageName) {
	        console.log(window.localStorage);
	        var prmstr = window.location.pathname.substr(window.location.pathname.indexOf(pageName) + pageName.length);
	        return prmstr;
	    }

	    $scope.getTagAfter = function (tag) {
	        console.log("SOMETHING CHANGED!!!!!!!!!!!!!!!!!!!!!!!");
	        console.log(window.location.href);
	        var prmstr = window.location.href.substr(window.location.href.indexOf(tag) + tag.length);
	        return prmstr;
	    }

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