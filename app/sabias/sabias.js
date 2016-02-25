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

        vm.nextMovie = nextMovie;

        function nextMovie() {
            vm.movie = vm.movie + 1;
            if(vm.movie > 10)
                vm.movie = 1;

            console.log(vm.movie);
        }

    };

})();

