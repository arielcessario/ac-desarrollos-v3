(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.sabias', ['ngRoute'])
        .controller('SabiasController', SabiasController);

    SabiasController.$inject = ['$scope', '$location'];

    function SabiasController($scope, $location) {
        var vm = this;

        vm.slider_nro = 1;
    };

})();

