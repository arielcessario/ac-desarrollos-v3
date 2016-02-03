'use strict';

angular.module('ac.hacemos', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/hacemos', {
            templateUrl: 'hacemos/hacemos.html',
            controller: 'HacemosController'
        });
    }])

    .controller('HacemosController', [function() {

    }]);