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
        .controller('HacemosController', HacemosController)
        .service('SliderService', SliderService);


    HacemosController.$inject = ['$scope', '$interval', '$location', '$routeParams', 'SliderService'];

    function HacemosController($scope, $interval, $location, $routeParams, SliderService) {
        var vm = this;

        //VARIABLES
        vm.slider_01 = {titulo: '', descripcion:''};
        vm.slider_02 = {titulo: '', descripcion:''};
        vm.slider_03 = {titulo: '', descripcion:''};
        vm.slider_04 = {titulo: '', descripcion:''};
        vm.slider_05 = {titulo: '', descripcion:''};

        //FUNCIONES
        vm.showSlider = showSlider;


        vm.id = $routeParams.id === undefined ? 'ecommerce' : $routeParams.id;
        vm.slider_nro = getSliderNro(vm.id);

        console.log(vm.id);

        $interval(changeSlider, 30000);
        //$interval(changeSlider, 10000);
        /*
         SliderService.listen(function () {
         $location.path('/hacemos/' + SliderService.showSliderSelected);

         $timeout(function () {

         }, 10);

         console.log($location.path());
         console.log(vm.slider_nro);
         });
         */
        function getSliderNro(slider) {
            var numero = 0;

            if(slider == 'ecommerce') {
                numero = 1;
            } else if(slider == 'institucionales') {
                numero = 2;
            } else if(slider == 'sistemas') {
                numero = 3;
            } else if(slider == 'desarrollos') {
                numero = 4;
            } else if(slider == 'analiticas') {
                numero = 5;
            }

            return numero;
        }

        function changeSlider() {
            vm.slider_nro = (vm.slider_nro == 5) ? 1 : vm.slider_nro + 1;

            if(vm.slider_nro == 1) {
                vm.id = 'ecommerce';
            } else if(vm.slider_nro == 2) {
                vm.id = 'institucionales';
            } else if(vm.slider_nro == 3) {
                vm.id = 'sistemas';
            } else if(vm.slider_nro == 4) {
                vm.id = 'desarrollos';
            } else if(vm.slider_nro == 5) {
                vm.id = 'analiticas';
            }

            //SliderService.showSliderSelected = vm.id;
            //SliderService.broadcast();
            console.log(vm.slider_nro);
            $location.path('/hacemos/' + vm.id);
        }

        function showSlider(slider) {
            vm.slider_nro = slider;

            if(slider == 1) {
                vm.id = 'ecommerce';
            } else if(slider == 2) {
                vm.id = 'institucionales';
            } else if(slider == 3) {
                vm.id = 'sistemas';
            } else if(slider == 4) {
                vm.id = 'desarrollos';
            } else if(slider == 5) {
                vm.id = 'analiticas';
            }

            //SliderService.showSliderSelected = vm.id;
            //SliderService.broadcast();
            $location.path('/hacemos/' + vm.id);
        }
    };

    SliderService.$inject = ['$rootScope'];
    function SliderService($rootScope) {

        this.showSliderSelected = '';

        this.broadcast = function () {
            $rootScope.$broadcast("refreshSelectedPage")
        };

        this.listen = function (callback) {
            $rootScope.$on("refreshSelectedPage", callback)
        };

    }

})();
