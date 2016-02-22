(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.cotizador', ['ngRoute'])
        .controller('CotizadorController', CotizadorController);

    CotizadorController.$inject = ['$scope', '$location'];

    function CotizadorController($scope, $location) {
        var vm = this;

        vm.sendMail = sendMail;

        function sendMail() {

        }

    };

})();

