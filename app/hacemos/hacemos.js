(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.hacemos', ['ngRoute'])
        .controller('HacemosController', HacemosController);

    HacemosController.$inject = ['$scope', '$interval'];

    function HacemosController($scope, $interval) {
        var vm = this;

        vm.slider_01 = {titulo: '', descripcion:''};
        vm.slider_02 = {titulo: '', descripcion:''};
        vm.slider_03 = {titulo: '', descripcion:''};
        vm.slider_04 = {titulo: '', descripcion:''};
        vm.slider_05 = {titulo: '', descripcion:''};

        vm.slider_nro = 1;
        //vm.slideSelected = 1;

        $interval(changeSlider, 5000);

        function changeSlider() {
            vm.slider_nro = (vm.slider_nro == 5) ? 1 : vm.slider_nro + 1;
        }
    };

})();
