(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.hacemos', ['ngRoute'])
        .controller('HacemosController', HacemosController);

    HacemosController.$inject = ['$scope', '$location'];

    function HacemosController($scope, $location) {
        var vm = this;


    };

})();
