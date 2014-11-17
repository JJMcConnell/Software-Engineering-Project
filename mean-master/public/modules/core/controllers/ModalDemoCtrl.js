angular.module('core').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = 'DATE!!!';

  $scope.buttonData = function (butId) {
    $scope.buttonId = butId; 
    console.log($scope.buttonId);
    $scope.items = document.getElementById('selectedDate').innerHTML;
    var date = new Date(document.getElementById('selectedDate').innerHTML);
    var day = document.getElementById('selectedDate').innerHTML.substr(8, 2);
    var month = document.getElementById('selectedDate').innerHTML.substr(11, 4);
    var year = document.getElementById('selectedDate').innerHTML.substr(4, 3);
    $scope.items = new Date(month + ' ' + day + ', ' + year);
    if (document.getElementById('selectedDate').innerHTML == '')
        $scope.items = new Date();
    $scope.open(butId);

  }

  $scope.setDate = function () {
      console.log($scope.items);
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
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.