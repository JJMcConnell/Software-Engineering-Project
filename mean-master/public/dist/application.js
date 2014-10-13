'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'mean';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);angular.module('core').controller('ModalDemoCtrl', [
  '$scope',
  '$modal',
  '$log',
  function ($scope, $modal, $log) {
    $scope.items = [
      'item1',
      'item2',
      'item3'
    ];
    $scope.open = function (size) {
      var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
]);  // Please note that $modalInstance represents a modal window (instance) dependency.
     // It is not the same as the $modal service used above.
angular.module('core').controller('ModalInstanceCtrl', [
  '$scope',
  '$modalInstance',
  'items',
  function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = { item: $scope.items[0] };
    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);angular.module('TabsApp', []).controller('TabsCtrl', [
  '$scope',
  function ($scope) {
    $scope.tabs = [
      {
        title: 'One',
        url: 'one.tpl.html'
      },
      {
        title: 'Two',
        url: 'two.tpl.html'
      },
      {
        title: 'Three',
        url: 'three.tpl.html'
      }
    ];
    $scope.currentTab = 'one.tpl.html';
    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.url;
    };
    $scope.isActiveTab = function (tabUrl) {
      return tabUrl == $scope.currentTab;
    };
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  function ($scope) {
  }
]);