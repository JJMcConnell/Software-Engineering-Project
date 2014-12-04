angular.module('core').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = [];

$scope.buttonData = function (butId) {
      $scope.buttonId = butId;
      console.log($scope.buttonId);
      var date = document.getElementById('selectedDate').innerHTML;
      if (document.getElementById('selectedDate').innerHTML == '')
          date = new Date().toDateString();
      var day = date.substr(8, 2);
      var year = date.substr(11, 4);
      var month = date.substr(4, 3);
      if (document.getElementById('selectedDate').innerHTML == '') {
          console.log(new Date().toDateString());
      }
      var newDateFormat = new Date(month + ' ' + day + ', ' + year).toISOString(); // This sets it to mm/dd/yyyy
      console.log('THIS SHOULD BE CORRECT: ' + newDateFormat);
      $scope.items[0] = newDateFormat.substring(0, 10);
      $scope.items[1] = butId;
      $scope.open(butId);
  }

  $scope.periodData = function (butId, goodDate) {

    if(!goodDate){

          $scope.openDateError();
          
    }

    else{

    $scope.buttonId = butId; 
    console.log($scope.buttonId);
    var date = document.getElementById('selectedDate').innerHTML;
    if (document.getElementById('selectedDate').innerHTML == '')
        date = new Date().toDateString();
    var day = date.substr(8, 2);
    var year = date.substr(11, 4);
    var month = date.substr(4, 3);
    if (document.getElementById('selectedDate').innerHTML == '') {
        console.log(new Date().toDateString());
    }
    var newDateFormat = new Date(month + ' ' + day + ', ' + year).toISOString(); // This sets it to mm/dd/yyyy
    console.log('THIS SHOULD BE CORRECT: ' + newDateFormat);
    $scope.items[0] = newDateFormat.substring(0, 10);
    $scope.items[1] = butId;
    $scope.open();
    }

  }

  $scope.setDate = function () {
      console.log($scope.items);
  }

  $scope.comment = function (id, size) {
      $scope.items = id;
      var modalInstance = $modal.open({
          templateUrl: 'myCommentContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
              items: function () {
                  return $scope.items;
              },
              buttonId: function () {
                  return id;
              }
          }
      });
  }

  $scope.open = function (butId, size) {


    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        },
         buttonId: function() {
          return butId;
        }
      }
     

    });

    modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        console.log('selected item' +   selectedItem);
    }, function (message) {
        console.log(message);
        $log.info('Modal dismissed at: ' + new Date());
        if(message == 'done')
            $scope.openSuccess(); 
    });
  }

  $scope.openSuccess = function (){
    var modalInstance = $modal.open({
      templateUrl: 'ModalSuccess.html',
      controller: 'ModalInstanceCtrl',
      size: 100,
      resolve:{
        items: function () {
          return "Success!";

        },
        buttonId: function () {
          return "ONE HUNDRED!";
        }
      }
    });
  }

  $scope.openDateError = function (){
/*
          $http.get('/getDateSettings', $scope.credentials).success(function (response) {
              console.log(response);
              $scope.startDate = new Date(parseInt(response.startYear), parseInt(response.startMonth), parseInt(response.startDay));
              $scope.endDate = new Date(parseInt(response.endYear), parseInt(response.endMonth), parseInt(response.endDay));
          }).error(function (response) {
              $scope.error = 'error';
              console.log('error');
          });
          console.log('done');
*/
    var modalInstance = $modal.open({
      templateUrl: 'ModalDateError.html',
      controller: 'ModalInstanceCtrl',
      size: 100,
      resolve:{
        items: function () {
          return "Success!";

        },
        buttonId: function () {
          return "ONE HUNDRED!";
        }
      }
    });
  }

      $scope.openRequestPage = function (room, goodDate) {
        if(!goodDate){

          $scope.openDateError();
          
        }

        else{
          var date = document.getElementById('selectedDate').innerHTML;
          if (document.getElementById('selectedDate').innerHTML == '')
              date = new Date().toDateString();
          var day = date.substr(8, 2);
          var year = date.substr(11, 4);
          var month = date.substr(4, 3);
          if (document.getElementById('selectedDate').innerHTML == '') {
              console.log(new Date().toDateString());
          }
          var newDateFormat = new Date(month + ' ' + day + ', ' + year).toISOString(); // This sets it to mm/dd/yyyy
          month = newDateFormat.substring(5, 7);
          console.log('THIS SHOULD BE CORRECT: ' + newDateFormat);
          console.log('request page');
          document.location = '#!/calendarRequest?day='+day+'&month='+month+'&year='+year+'&length=1&room='+room;
      }

      }


});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.