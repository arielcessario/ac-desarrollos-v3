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

  MainController.$inject = ['$scope', '$location', 'LinksService'];

  function MainController($scope, $location, LinksService) {
    var vm = this;

      var vm = this;
      vm.goTo = goTo;
      vm.selectedPage = 'INICIO';
      vm.menu_mobile_open = false;
      vm.display_menu = false;
      vm.links = LinksService.links;

      function goTo(location) {
          console.log(location.path);
          $location.path(location.path);
          vm.selectedPage = location.nombre;

          if(location.nombre != 'CHATEA CON NOSOTROS') {
              vm.display_menu = true;
          } else {
              vm.display_menu = false;
          }

      }

  };

})();

