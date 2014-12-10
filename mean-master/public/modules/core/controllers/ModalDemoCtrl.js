angular.module('core').controller('ModalDemoCtrl', function ($http, $location, $scope, $modal, $log) {

    // SO. MANY. MODALS.

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


  $scope.approveReq = function (id, day, month, year, room, period) {
      
      var params = { day: day, month: month, year: year, room: room, period: period };
      console.log('PARAMS' + params.day);
      var items = [];
      $http.post('/fetchRequestsForDayRoomAndPeriod', params).success(function (response) {
          //$location.path('/signin');
        
          console.log("RESPONSE " + response);
          if (response.length > 1) {// One will be the request selected
              for (var i = response.length - 1; i >= 0; i--) {
                  //console.log(response[i]._id);
                  console.log('my id' + id);
                  console.log('other id' + response[i]._id);
                  if (response[i]._id == id)
                      response.splice(i, 1);

              }
              var modalInstance = $modal.open({
                  templateUrl: 'otherRequests.html',
                  controller: 'ModalInstanceCtrl',
                  size: 100,
                  resolve: {
                      items: function () {
                          return response;
                      },
                      buttonId: function () {
                          return id;
                      }
                  }
              });
          }
          else
          {
              $scope.approve(response[0]._id);
          }
      }).error(function (response) {
          //$scope.error = response.message;

      });

      //fetchRequestsForDayRoomAndPeriod
      /*
      $http.get('/fetchEventByID?id=' + id).success(function (response) {
          //$location.path('/signin');
          console.log("RESPONSE " + response);
      }).error(function (response) {
          //$scope.error = response.message;
          
      });
      */
  };

  $scope.approve = function (id) {
      console.log('approved!!!');
      console.log(id);
      $http.get('/approveroom?id=' + id).success(function (response) {
          $location.path('/signin');
      }).error(function (response) {
          //$scope.error = response.message;

      });
  };

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

  $scope.openClass = function (butId, size) {
    var modalInstance = $modal.open({
      templateUrl: 'myClassModalContent.html',
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



  $scope.openChangedDateSettings = function (startDate, endDate) {
      
      var date = document.getElementById('selectedDate').innerHTML;
      if (document.getElementById('selectedDate').innerHTML == '')
          date = new Date().toDateString();
      var day = date.substr(8, 2);
      var year = date.substr(11, 4);
      var month = date.substr(4, 3);
      var startDate = new Date(month + ' ' + day + ', ' + year);

      
      var date2 = document.getElementById('datePicker2SelectedDate').innerHTML;
      if (document.getElementById('datePicker2SelectedDate').innerHTML == '')
          date2 = new Date().toDateString();
      var endDay = date2.substr(8, 2);
      var endYear = date2.substr(11, 4);
      var endMonth = date2.substr(4, 3);
      var endDate = new Date(endMonth + ' ' + endDay + ', ' + endYear);


      var startEndDates = [];
      startEndDates[0] = startDate.toDateString();
      startEndDates[1] = endDate.toDateString();
      
      var startDateParam = new Date(month + ' ' + day + ', ' + year).toISOString().substring(0, 10);
      var endDateParam = new Date(endMonth + ' ' + endDay + ', ' + endYear).toISOString().substring(0, 10);

      var params = { startDate: startDateParam, endDate: endDateParam };

          if (startDate.getTime() < endDate.getTime()) {
              var modalInstance = $modal.open({
                  templateUrl: 'ModalDateSuccess.html',
                  controller: 'ModalInstanceCtrl',
                  size: 100,
                  resolve: {
                      items: function () {
                          return startEndDates;

                      },
                      buttonId: function () {
                          return "ONE HUNDRED!";
                      }
                  }
              });
              $http.post('/changeDates', params).success(function (response) {
                  //$location.path('/signin');

                  
              }).error(function (response) {
                  console.log('ERROR!');
              });
          }
          else
              var modalInstance = $modal.open({
                  templateUrl: 'ModalDateFailure.html',
                  controller: 'ModalInstanceCtrl',
                  size: 100,
                  resolve: {
                      items: function () {
                          return startEndDates;

                      },
                      buttonId: function () {
                          return "ONE HUNDRED!";
                      }
                  }
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