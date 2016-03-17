(function () {

    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.contacto', ['ngRoute'])
        .controller('ContactoController', ContactoController);

    ContactoController.$inject = ['$scope', 'ContactsService', '$location'];

    function ContactoController($scope, ContactsService, $location) {
        var vm = this;

        vm.email = '';
        vm.nombre = '';
        vm.mensaje = '';
        vm.asunto = '';
        //vm.enviado = false;
        vm.enviando = false;


        // FUNCTIONS
        vm.sendMail = sendMail;

        function sendMail() {
            if(vm.enviando){
                return;
            }
            vm.enviando = true;

            goog_report_conversion($location.absUrl());

            ContactsService.sendMail(vm.email,
                [{mail: 'arielcessario@gmail.com'}, {mail: 'mmaneff@gmail.com'}, {mail: 'diegoyankelevich@gmail.com'}],
                vm.nombre,
                vm.mensaje,
                vm.asunto,
                function (data, result) {
                    vm.enviando = false;

                    vm.email = '';
                    vm.nombre = '';
                    vm.asunto = '';
                    vm.mensaje = '';

                    //vm.enviando = false;
                });

        }

        function goog_snippet_vars() {
            var w = window;
            w.google_conversion_id = 956728168;
            w.google_conversion_label = "_8PjCNaT810Q6IaayAM";
            w.google_remarketing_only = false;
        }
        // DO NOT CHANGE THE CODE BELOW.
        function goog_report_conversion(url) {
            goog_snippet_vars();
            window.google_conversion_format = "3";
            var opt = new Object();
            opt.onload_callback = function() {
                if (typeof(url) != 'undefined') {
                    window.location = url;
                }
            }
            var conv_handler = window['google_trackConversion'];
            if (typeof(conv_handler) == 'function') {
                conv_handler(opt);
            }
        }

    };

})();
