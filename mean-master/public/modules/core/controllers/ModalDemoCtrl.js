angular.module('core').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];


  $scope.buttonData = function (butId) {
    $scope.buttonId = butId; 
    console.log($scope.buttonId);
    $scope.open(butId);
    
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