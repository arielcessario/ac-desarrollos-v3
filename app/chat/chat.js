(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.chat', ['ngRoute'])
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', '$location'];

    function ChatController($scope, $location) {
        var vm = this;


    };

})();

