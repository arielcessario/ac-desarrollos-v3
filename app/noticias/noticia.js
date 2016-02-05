(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.noticias', ['ngRoute'])
        .controller('NoticiaController', NoticiaController);

    NoticiaController.$inject = ['$scope', '$location'];

    function NoticiaController($scope, $location) {
        var vm = this;


    };

})();

