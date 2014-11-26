
angular.module('core').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, buttonId, $http, $location) {

  $scope.items = items;
  console.log($scope.items);
  console.log(buttonId);

  $scope.request = {
    roomNumber: buttonId
  }

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
      console.log($scope.request);
      console.log('This method?');
      $http.post('/requestevent', $scope.request).success(function (response) {
         
          // And redirect to the index page
          $location.path('/');
          $modalInstance.dismiss('done');
          //ENTER SUCCESS MESSAGE CODE HERE!!
          
          //For example, redirect to a success page $location.path('/success');

      }).error(function (response) {
          $scope.error = response.message;
          console.log($scope.error);
      });
      
  };

  $scope.test = function () {
      console.log('TEST!!!!!');
  }

  $scope.deny = function (id, adminComment) {
      //$window.location.reload();
      var jsonParam = { 'id': 1 };
      jsonParam.id = id;
      jsonParam.adminComment = adminComment;
      console.log('DENIED!');
      $http.post('/denyroom', jsonParam).success(function (response) {
          $location.path('/signin');
          //$window.location.reload();
          $scope.fetchRequests();
          //$scope.signin($scope.authentication.user);
      }).error(function (response) {
          //$scope.error = response.message;
          console.log('ERROR!');
      });
      $modalInstance.dismiss('cancel');
  };

  $scope.adminRequest = function () {
      console.log('ADMIN REQUEST!!!!!!!!!!!!');
      $scope.error = '';
      console.log($scope.request);
      console.log('This method?');
      $http.post('/requestAdminEvent', $scope.request).success(function (response) {
         
          // And redirect to the index page
          $location.path('/');
          $modalInstance.dismiss('done');
          //ENTER SUCCESS MESSAGE CODE HERE!!

          //For example, redirect to a success page $location.path('/success');

      }).error(function (response) {
          $scope.error = response.message;
          console.log($scope.error);
      });
      
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});