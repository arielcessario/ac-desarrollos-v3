'use strict';

angular.module('ac.noticias', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/noticia', {
            templateUrl: 'noticias/noticia.html',
            controller: 'NoticiaController'
        });
    }])

    .controller('NoticiaController', [function() {

    }]);