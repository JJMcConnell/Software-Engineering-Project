
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
      
      $scope.error = '';
      $http.get('/requestevent', $scope.request).success(function (response) {
          $modalInstance.close($scope.selected.item);
          // And redirect to the index page
          $location.path('/');

          //ENTER SUCCESS MESSAGE CODE HERE!!
          //For example, redirect to a success page $location.path('/success');

      }).error(function (response) {
          $scope.error = response.message;
          console.log($scope.error);
      });
      console.log($scope.request.name);
      console.log($scope.request);
      console.log($scope.request.period);
      
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});