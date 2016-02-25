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
        service.sendCotizacion = sendCotizacion;


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

        function sendCotizacion(cliente, nuestros_servicios, nueva_web, pagina_web,
                                comentario, website_referencia, dominio_info,
                                registro_dominio, dominio_deseado, graficos,
                                otro_disenio_grafico, como_nos_conocio, desea_reunion,
                                lugar_reunion, fecha_reunion, hosting_correo, callback) {
            return $http.post('mailer/mailer.php',
                {
                    function: 'sendCotizacion',
                    'cliente': JSON.stringify(cliente),
                    'nuestros_servicios': JSON.stringify(nuestros_servicios),
                    'nueva_web': JSON.stringify(nueva_web),
                    'pagina_web': JSON.stringify(pagina_web),
                    'comentario': comentario,
                    'website_referencia': website_referencia,
                    'dominio_info': dominio_info,
                    'registro_dominio': JSON.stringify(registro_dominio),
                    'dominio_deseado': dominio_deseado,
                    'graficos': JSON.stringify(graficos),
                    'otro_disenio_grafico': otro_disenio_grafico,
                    'como_nos_conocio': como_nos_conocio,
                    'desea_reunion': desea_reunion,
                    'lugar_reunion': lugar_reunion,
                    'fecha_reunion': fecha_reunion,
                    'hosting_correo': hosting_correo
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