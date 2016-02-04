(function () {

  'use strict';

// Declare app level module which depends on views, and components
  angular.module('acDesarrollos', [
    'ngRoute',
    'ac.main',
    'myApp.view2',
    'ac.contacto',
    'ac.noticias',
    'ac.sabias',
    'ac.hacemos'
  ]).
      config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
      }])
      .controller('AppController', AppController)
      .service('LinksService', LinksService);


  function LinksService() {
    this.links = [
      {nombre: 'NUESTRA MISION', path: '/view2'},
      {nombre: 'QUE HACEMOS', path: '/hacemos'},
      {nombre: 'CONTACTANOS', path: '/contacto'},
      {nombre: 'SABIAS?', path: '/sabias'},
      {nombre: 'NOTICIAS', path: '/noticia'},
      {nombre: 'CHATEA CON NOSOTROS!', path: '/revistas'},
      //{nombre: 'Volver', path: '/view1'}
    ];

  }


  AppController.$inject = ['$scope', '$location', '$rootScope', 'LinksService'];
  function AppController($scope, $location, $rootScope, LinksService) {

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

      if(location.nombre != 'Volver') {
        vm.display_menu = true;
      } else {
        vm.display_menu = false;
      }

    }

  };


})();
