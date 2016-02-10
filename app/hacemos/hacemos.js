(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.hacemos', ['ngRoute'])
        .controller('HacemosController', HacemosController);

    HacemosController.$inject = ['$scope', '$interval'];

    function HacemosController($scope, $interval) {
        var vm = this;

        vm.slider_01 = {titulo: 'Ecommerce, Mcommerce y Comercio Social:', descripcion:'El comercio electronico, tambien conocido como e-commerce (electronic commerce en inglés), consiste en la compra y venta de productos o de servicios a traves de medios electronicos. La mayor parte del comercio electronico consiste en la compra y venta de productos o servicios entre personas y empresas, sin embargo un porcentaje considerable del comercio electrónico consiste en la adquisición de artículos virtuales (software y derivados en su mayoría), tales como el acceso a contenido "premium" de un sitio web.'};
        vm.slider_02 = {titulo: 'Institucionales', descripcion:'los sitios web institucionales'};
        vm.slider_03 = {titulo: 'Sistema de Gestion', descripcion:'Un sistema robusto y completo'};

        vm.slider_nro = 1;
        //vm.slideSelected = 1;

        $interval(changeSlider, 5000);

        function changeSlider() {
            vm.slider_nro = (vm.slider_nro == 3) ? 1 : vm.slider_nro + 1;
        }
    };

})();
