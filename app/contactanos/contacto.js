(function () {

    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.contacto', ['ngRoute'])
        .controller('ContactoController', ContactoController);

    ContactoController.$inject = ['$scope', '$location'];

    function ContactoController($scope, $location) {
        var vm = this;


    };

})();
