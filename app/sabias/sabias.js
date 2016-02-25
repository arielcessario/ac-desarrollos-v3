(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.sabias', ['ngRoute'])
        .controller('SabiasController', SabiasController);

    SabiasController.$inject = ['$scope'];

    function SabiasController($scope) {
        var vm = this;

        vm.movie = 1;
        vm.videos = [
            {title:'Video 1', name:'movie1.mov'},
            {title:'Video 2', name:'movie2.mov'},
            {title:'Video 3', name:'movie3.mov'},
            {title:'Video 4', name:'movie4.mov'},
            {title:'Video 5', name:'movie5.mov'},
            {title:'Video 6', name:'movie6.mov'},
            {title:'Video 7', name:'movie7.mov'}
        ];

        vm.nextMovie = nextMovie;

        function nextMovie() {
            vm.movie = vm.movie + 1;
            if(vm.movie > 7)
                vm.movie = 1;

            console.log(vm.movie);
        }

    };

})();

