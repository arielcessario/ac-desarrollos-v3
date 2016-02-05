(function () {

  'use strict';
  var scripts = document.getElementsByTagName("script");
  var currentScriptPath = scripts[scripts.length - 1].src;

  angular.module('acdesarrollos.mision', ['ngRoute'])
      .controller('MisionController', MisionController);

  MisionController.$inject = ['$scope', '$location'];

  function MisionController($scope, $location) {
    var vm = this;


  };

})();

