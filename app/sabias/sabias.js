'use strict';

angular.module('ac.sabias', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sabias', {
            templateUrl: 'sabias/sabias.html',
            controller: 'SabiasController'
        });
    }])

    .controller('SabiasController', [function() {

    }]);