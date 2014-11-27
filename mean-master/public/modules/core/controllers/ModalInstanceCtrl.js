
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
  $scope.message = 'Loading request status...';
  $scope.otherRequests = function (room) {
      var date = items.date;
      var requestYear = date.substring(0, 4);
      var requestMonth = date.substring(5, 7);
      var requestDay = date.substring(8, 10);
      $http.get('/fetchRequestsForDayRoomAndPeriod?day='+requestDay+'&year='+requestYear+'&month='+requestMonth+'&room='+room+'&period='+items.period).success(function (response) {
          $scope.message = 'No other requests have been made for this space.';
          if(response.length == 1)
              $scope.message = 'One other request has been made for this space.';
          if (response.length > 1)
              $scope.message = response.length + ' other requests have been made for this space.';
      }).error(function (response) {
          $scope.error = response.message;
          $scope.message = 'Error';
      });
  }
  $scope.ok = function () {
      $scope.request.period = items.period;
      $scope.request.length = 1;
      $scope.error = '';
      console.log($scope.request);
      console.log('This method?');
      $http.post('/requestevent', $scope.request).success(function (response) {
         
          // And redirect to the index page
          $location.path('/');
          $modalInstance.dismiss('done');
          
      }).error(function (response) {
          $scope.error = response.message;
          console.log($scope.error);
      });
      
  };

  $scope.test = function () {
      console.log('TEST!!!!!');
      return 'test';
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
          //$location.path('/');
          $modalInstance.dismiss('done');
          
      }).error(function (response) {
          $scope.error = response.message;
          console.log($scope.error);
      });
      
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});