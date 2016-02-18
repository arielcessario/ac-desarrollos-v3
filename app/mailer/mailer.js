(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.mailer', ['ngRoute'])
        .controller('MailerController', MailerController)
        .service('MailerService', MailerService);


    MailerController.$inject = [];
    function MailerController() {}


    MailerService.$inject = ['$http'];
    function MailerService($http) {

        //Variables
        var service = {};

        service.sendMail = sendMail;
        service.sendMailForChat = sendMailForChat;


        return service;

        /**
         *
         * @param
         * @param callback
         * @returns {*}
         */
        function sendMail(email, nombre, mensaje, asunto, callback) {
            return $http.post('mailer/mailer.php',
                {
                    function: 'sendMail',
                    'email': email,
                    'nombre': nombre,
                    'mensaje': mensaje,
                    'asunto': asunto
                })
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data);
                })
        }

        function sendMailForChat(email, nombre, callback) {
            return $http.post('mailer/mailer.php',
                {
                    function: 'sendMailForChat',
                    'email': email,
                    'nombre': nombre
                })
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data);
                })
        }

    }

})();