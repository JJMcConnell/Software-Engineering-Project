angular.module('core').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = 'DATE!!!';

  $scope.buttonData = function (butId) {
    $scope.buttonId = butId; 
    console.log($scope.buttonId);
    $scope.items = document.getElementById('selectedDate').innerHTML;
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
    $scope.items = newDateFormat.substring(0, 10);

    $scope.open(butId);

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
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
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
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.