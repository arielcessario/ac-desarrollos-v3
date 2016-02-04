(function () {

  'use strict';

// Declare app level module which depends on views, and components
  angular.module('myApp', [
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
      .controller('AppController', AppController);

  AppController.$inject = ['$scope'];

  function AppController($scope) {

    var vm = this;


  };


})();
