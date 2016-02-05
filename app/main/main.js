(function () {

  'use strict';
  var scripts = document.getElementsByTagName("script");
  var currentScriptPath = scripts[scripts.length - 1].src;

  angular.module('acdesarrollos.main', ['ngRoute'])
      .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$location'];

  function MainController($scope, $location) {
      var vm = this;

  };

})();

