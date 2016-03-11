(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.hacemos', ['ngRoute'])
        .controller('HacemosController', HacemosController);

    HacemosController.$inject = ['$scope', '$interval', '$location'];

    function HacemosController($scope, $interval, $location) {
        var vm = this;

        vm.slider_01 = {titulo: '', descripcion:''};
        vm.slider_02 = {titulo: '', descripcion:''};
        vm.slider_03 = {titulo: '', descripcion:''};
        vm.slider_04 = {titulo: '', descripcion:''};
        vm.slider_05 = {titulo: '', descripcion:''};

        vm.slider_nro = 1;
        //vm.slideSelected = 1;

        vm.showSlider = showSlider;

        $interval(changeSlider, 30000);

        function changeSlider() {
            vm.slider_nro = (vm.slider_nro == 5) ? 1 : vm.slider_nro + 1;

            if(vm.slider == 1) {
                $location.path('/hacemos/ecommerce');
            } else if(vm.slider == 2) {
                $location.path('/hacemos/institucionales');
            } else if(vm.slider == 3) {
                $location.path('/hacemos/sistemas');
            } else if(vm.slider == 4) {
                $location.path('/hacemos/desarrollos');
            } else if(vm.slider == 5) {
                $location.path('/hacemos/analiticas');
            }
        }

        function showSlider(slider) {
            vm.slider_nro = slider;

            if(slider == 1) {
                $location.path('/hacemos/ecommerce');
            } else if(slider == 2) {
                $location.path('/hacemos/institucionales');
            } else if(slider == 3) {
                $location.path('/hacemos/sistemas');
            } else if(slider == 4) {
                $location.path('/hacemos/desarrollos');
            } else if(slider == 5) {
                $location.path('/hacemos/analiticas');
            }
        }
    };

})();
