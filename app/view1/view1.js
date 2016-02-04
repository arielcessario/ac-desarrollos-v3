(function () {

  'use strict';

  angular.module('ac.main', ['ngRoute'])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
          templateUrl: 'view1/view1.html',
          controller: 'MainController'
        });
      }])
      .controller('MainController', MainController);

  MainController.$inject = ['$scope'];

  function MainController($scope) {
    var vm = this;

  };

})();

