
angular.module('core').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, $http, $location) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.getUnavailablePeriods = function (roomNumber, date) {
      $http.get('/test', {params: {roomNumber: roomNumber, date: date}}).success(function (response) {
          console.log(response);
          // And redirect to the index page
          $location.path('/');
          return response;
      }).error(function (response) {
          $scope.error = response.message;
      });
  }
  $scope.ok = function () {
      
      $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});