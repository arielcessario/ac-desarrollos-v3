(function () {

  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('acDesarrollos', ['oc.lazyLoad',
      'ngRoute',
      'ngAnimate',
      'firebase',
      'acUtils',
      'acContacts',
      'ac.noticias',
      'acFactory'
  ]).config(['$routeProvider', function($routeProvider) {

        $routeProvider.otherwise('/');


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
              return $ocLazyLoad.load('cotizador/cotizador.js');
            }]
          }
        });

      }])
      .controller('AppController', AppController)
      .service('LinksService', LinksService)
      .constant('_FIREREF', 'https://chat-acdesarrollos.firebaseio.com/');


  function LinksService() {
    this.links = [
      {nombre: 'INICIO', path: '/main'},
      {nombre: 'NUESTRA MISION', path: '/mision'},
      {nombre: 'QUE HACEMOS', path: '/hacemos'},
      {nombre: 'CONTACTANOS', path: '/contacto'},
      {nombre: 'SABIAS?', path: '/sabias'},
      {nombre: 'NOTICIAS', path: '/noticias'},
      {nombre: 'COTIZADOR', path: '/cotizador'},
      {nombre: 'CHATEA CON NOSOTROS!', path: '/chat'}
    ];

  }


  AppController.$inject = ['$scope', '$location', 'LinksService', '$window', 'FireService'];

  function AppController($scope, $location, LinksService, $window, FireService) {

    var vm = this;
    vm.hideLoader = true;

    vm.goTo = goTo;
    vm.selectedPage = 'INICIO';
    vm.menu_mobile_open = false;
    vm.display_menu = true;
    vm.display_header = true;
    vm.links = LinksService.links;

    //Inicio el servicio de Firebase
    FireService.init();

    if($window.location.hash != "#/") {
      var path = $window.location.hash.replace("#", "");
      goTo({nombre: '', path: path});
    }

    function goTo(location) {
      $location.path(location.path);
      vm.selectedPage = location.nombre;

      vm.display_menu = true;
      vm.display_header = true;

      /*
       if(location.nombre != 'INICIO') {
       //vm.display_menu = true;
       //vm.display_header = true;
       } else {
       //vm.display_menu = true;
       //vm.display_header = true;
       vm.selectedPage = 'INICIO';
       }
       */
    }

  }


})();
