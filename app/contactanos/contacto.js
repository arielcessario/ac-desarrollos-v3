'use strict';

angular.module('ac.contacto', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacto', {
            templateUrl: 'contactanos/contacto.html',
            controller: 'ContactoController'
        });
    }])

    .controller('ContactoController', [function() {

    }]);