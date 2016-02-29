(function () {

  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('acDesarrollos', ['oc.lazyLoad',
    'ngRoute',
    'ngAnimate',
    'acUtils',
    'acContacts',
    'ac.noticias'
  ]).config(['$routeProvider', function($routeProvider) {

        $routeProvider.otherwise('/');

        /*
        $routeProvider.when('/main', {
          templateUrl: 'main/main.html',
          controller: 'MainController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('main/main.min.js');
            }]
          }
        });
        */

        $routeProvider.when('/contacto', {
          templateUrl: 'contactanos/contacto.html',
          controller: 'ContactoController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('contactanos/contacto.min.js');
            }]
          }
        });

        $routeProvider.when('/hacemos', {
          templateUrl: 'hacemos/hacemos.html',
          controller: 'HacemosController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('hacemos/hacemos.min.js');
            }]
          }
        });

        $routeProvider.when('/noticias', {
          templateUrl: 'noticias/noticias.html',
          controller: 'NoticiasController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('noticias/noticias.min.js');
            }]
          }
        });

        $routeProvider.when('/noticia/:id', {
          templateUrl: 'noticia/noticia.html',
          controller: 'NoticiaController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('noticia/noticia.min.js');
            }]
          }
        });

        $routeProvider.when('/sabias', {
          templateUrl: 'sabias/sabias.html',
          controller: 'SabiasController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('sabias/sabias.min.js');
            }]
          }
        });

        $routeProvider.when('/chat', {
          templateUrl: 'chat/chat.html',
          controller: 'ChatController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('chat/chat.min.js');
            }]
          }
        });

        $routeProvider.when('/mision', {
          templateUrl: 'mision/mision.html',
          controller: 'MisionController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('mision/mision.min.js');
            }]
          }
        });

        $routeProvider.when('/cotizador', {
          templateUrl: 'cotizador/cotizador.html',
          controller: 'CotizadorController',
          //data: {requiresLogin: false},
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load('cotizador/cotizador.min.js');
            }]
          }
        });

      }])
      .controller('AppController', AppController)
      .service('LinksService', LinksService);


  function LinksService() {
    this.links = [
      {nombre: 'NUESTRA MISION', path: '/mision'},
      {nombre: 'QUE HACEMOS', path: '/hacemos'},
      {nombre: 'CONTACTANOS', path: '/contacto'},
      {nombre: 'SABIAS?', path: '/sabias'},
      {nombre: 'NOTICIAS', path: '/noticias'},
      {nombre: 'COTIZADOR', path: '/cotizador'},
      {nombre: 'CHATEA CON NOSOTROS!', path: '/chat'}
    ];

  }


  AppController.$inject = ['$scope', '$location', 'LinksService'];

  function AppController($scope, $location, LinksService) {

    var vm = this;
    vm.hideLoader = true;

    vm.goTo = goTo;
    vm.selectedPage = 'INICIO';
    vm.menu_mobile_open = false;
    vm.display_menu = true;
    vm.display_header = true;
    vm.links = LinksService.links;

    function goTo(location) {
      //console.log(location.path);
      $location.path(location.path);
      vm.selectedPage = location.nombre;

      if(location.nombre != 'INICIO') {
        vm.display_menu = true;
        vm.display_header = true;
      } else {
        vm.display_menu = true;
        vm.display_header = true;
        vm.selectedPage = 'INICIO';
      }

    }

  }


})();
