'use strict';

angular.module('users').controller('ModalInfoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['stuff', 'item2', 'item3'];


  $scope.info = 'info';

  $scope.setInfo = function (info) {
      if(info.period == 12)
          info.period = 'E1'
      if (info.period == 13)
          info.period = 'E2'
      if (info.period == 14)
          info.period = 'E2'
      $scope.info = info;
  }
    
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'infomodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.info;
        },
        buttonId: function () {
            return 'INFO BUTTON';
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
