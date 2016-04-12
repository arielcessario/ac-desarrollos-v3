(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.hacemos', ['ngRoute'])
        .component('sliderEcommerce', {
            controllerAs: 'hacemosCtrl',
            templateUrl: "hacemos/hacemos/ecommerce.html"
        })
        .component('sliderInstitucional', {
            controllerAs: 'hacemosCtrl',
            templateUrl: "hacemos/hacemos/institucionales.html"
        })
        .component('sliderSistema', {
            controllerAs: 'hacemosCtrl',
            templateUrl: "hacemos/hacemos/sistemas.html"
        })
        .component('sliderDesarrollo', {
            controllerAs: 'hacemosCtrl',
            templateUrl: "hacemos/hacemos/desarrollos.html"
        })
        .component('sliderAnalitica', {
            controllerAs: 'hacemosCtrl',
            templateUrl: "hacemos/hacemos/analiticas.html"
        })
        .controller('HacemosController', HacemosController);

    HacemosController.$inject = ['$scope', '$interval', '$location'];

    function HacemosController($scope, $interval, $location) {
        var vm = this;

        vm.view = 'hacemos/hacemos/ecommerce.html';
        vm.slider_nro = 1;

        vm.slider_01 = {titulo: '', descripcion:''};
        vm.slider_02 = {titulo: '', descripcion:''};
        vm.slider_03 = {titulo: '', descripcion:''};
        vm.slider_04 = {titulo: '', descripcion:''};
        vm.slider_05 = {titulo: '', descripcion:''};

        vm.showSlider = showSlider;

        $interval(changeSlider, 30000);
        //$interval(changeSlider, 5000);

        function changeSlider() {
            vm.slider_nro = (vm.slider_nro == 5) ? 1 : vm.slider_nro + 1;

            if(vm.slider_nro == 1) {
                vm.view = 'hacemos/hacemos/ecommerce.html';
            } else if(vm.slider_nro == 2) {
                vm.view = 'hacemos/hacemos/institucionales.html';
            } else if(vm.slider_nro == 3) {
                vm.view = 'hacemos/hacemos/sistemas.html';
            } else if(vm.slider_nro == 4) {
                vm.view = 'hacemos/hacemos/desarrollos.html';
            } else if(vm.slider_nro == 5) {
                vm.view = 'hacemos/hacemos/analiticas.html';
            }
            //console.log(vm.view);
            //console.log($location);
            //console.log($location.path());
            //console.log($location.absUrl());
        }

        function showSlider(slider) {
            vm.slider_nro = slider;

            if(slider == 1) {
                vm.view = 'hacemos/hacemos/ecommerce.html';
                //$location.path('hacemos/ecommerce.html');
            } else if(slider == 2) {
                vm.view = 'hacemos/hacemos/institucionales.html';
            } else if(slider == 3) {
                vm.view = 'hacemos/hacemos/sistemas.html';
            } else if(slider == 4) {
                vm.view = 'hacemos/hacemos/desarrollos.html';
            } else if(slider == 5) {
                vm.view = 'hacemos/hacemos/analiticas.html';
            }
            //console.log(vm.view);
            //console.log($location);
        }
    };

})();
