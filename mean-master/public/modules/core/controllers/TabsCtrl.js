angular.module('TabsApp', [])
.controller('TabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'One',
            url: 'one.tpl.html'
        }, {
            title: 'Two',
            url: 'two.tpl.html'
        }, {
            title: 'Three',
            url: 'three.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);