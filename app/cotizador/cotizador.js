(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.cotizador', ['ngRoute', ['mailer/mailer.js']])
        .controller('CotizadorController', CotizadorController);

    CotizadorController.$inject = ['$scope', '$location', 'MailerService'];

    function CotizadorController($scope, $location, MailerService) {
        var vm = this;

        vm.nombre = '';
        vm.email = '';
        vm.telefono = '';
        vm.message = '';

        //Nuestros Servicios
        vm.desarrolloweb = false;
        vm.hosting = false;
        vm.logotipos = false;
        vm.desarrollografico = false;
        vm.dominio = false;

        //Diseño de Página Web
        vm.nuevapagina = false;
        vm.comentario = '';
        vm.slider_fijo = false;
        vm.slider_administrable = false;
        vm.contactos = false;
        vm.empresa_info = false;
        vm.producto_info = false;
        vm.multipaginas = false;
        vm.noticias = false;
        vm.usuarios = false;
        vm.ecommerce = false;
        vm.caja = false;
        vm.cobros_online = false;
        vm.imagenes_admin = false;
        vm.website_referencia = '';

        //Registro de Dominios
        vm.extension_1 = false;
        vm.extension_2 = false;
        vm.extension_3 = false;
        vm.dominio_deseado = '';

        //Diseño Gráfico
        vm.logotipo = false;
        vm.tarjeta = false;
        vm.catalogo = false;
        vm.otro_disenio_grafico = '';

        vm.nuestros_servicios = [];
        vm.pagina_web = [];
        vm.registro_dominio = [];
        vm.graficos = [];
        vm.plan_hosting = [
            {id:1, name:'Plan 1'},
            {id:2, name:'Plan 2'},
            {id:3, name:'Plan 3'},
        ];

        vm.hosting_selected = {};


        vm.sendMail = sendMail;


        function sendMail() {
            if (vm.nombre.trim() == '') {
                return;
            }
            if (vm.email.trim() == '') {
                return;
            }
            if (vm.telefono.trim() == '') {
                return;
            }

            var cliente = {nombre:vm.nombre, email:vm.email, telefono:vm.telefono, message:vm.message};
            //var nueva_web = vm.nuevapagina;
            var nueva_web = 'Diseño de una nueva página web';
            var dominio_info = 'Registrar un nuevo dominio';

            addServicios();

            addPaginaWeb();

            addRegistroDominio();

            addDisenioGrafico();

            MailerService.sendCotizacion(cliente, vm.nuestros_servicios, nueva_web, vm.pagina_web,
                vm.comentario, vm.website_referencia, dominio_info, vm.registro_dominio,
                vm.dominio_deseado, vm.graficos, vm.otro_disenio_grafico, function(data){
                console.log(data);

                vm.email = '';
                vm.nombre = '';
                vm.telefono = '';
                vm.message = '';
                vm.comentario = '';
                vm.website_referencia = '';
                vm.dominio_deseado = '';
                vm.otro_disenio_grafico = '';

                vm.nuestros_servicios = [];
                vm.pagina_web = [];
                vm.registro_dominio = [];
                vm.graficos = [];
            });
        }

        function addServicios() {
            if (vm.desarrolloweb) {
                vm.nuestros_servicios.push({nombre:'Diseño de Página Web', precio:'150'});
            }
            if (vm.hosting) {
                vm.nuestros_servicios.push({nombre:'Hosting', precio:'100'});
            }
            if (vm.logotipos) {
                vm.nuestros_servicios.push({nombre:'Diseño de Logotipos', precio:'250'});
            }
            if (vm.desarrollografico) {
                vm.nuestros_servicios.push({nombre:'Diseño Gráfico', precio:'120'});
            }
            if (vm.dominio) {
                vm.nuestros_servicios.push({nombre:'Registro de Dominio', precio:'300'});
            }

            console.log(vm.nuestros_servicios);
        }

        function addPaginaWeb() {
            if (vm.slider_fijo) {
                vm.pagina_web.push({nombre:'Slider Fijo', precio:'550'});
            }
            if (vm.slider_administrable) {
                vm.pagina_web.push({nombre:'Slider Autoadministrable', precio:'100'});
            }
            if (vm.contactos) {
                vm.pagina_web.push({nombre:'Contactos', precio:'250'});
            }
            if (vm.empresa_info) {
                vm.pagina_web.push({nombre:'Información de Empresas', precio:'120'});
            }
            if (vm.producto_info) {
                vm.pagina_web.push({nombre:'Información de Productos', precio:'300'});
            }
            if (vm.multipaginas) {
                vm.pagina_web.push({nombre:'Multipágina', precio:'500'});
            }
            if (vm.noticias) {
                vm.pagina_web.push({nombre:'Noticias', precio:'400'});
            }
            if (vm.usuarios) {
                vm.pagina_web.push({nombre:'Usuarios', precio:'230'});
            }
            if (vm.ecommerce) {
                vm.pagina_web.push({nombre:'Ecommerce', precio:'100'});
            }
            if (vm.caja) {
                vm.pagina_web.push({nombre:'Caja', precio:'150'});
            }
            if (vm.cobros_online) {
                vm.pagina_web.push({nombre:'Cobros Online', precio:'200'});
            }
            if (vm.imagenes_admin) {
                vm.pagina_web.push({nombre:'Administración de Imágenes', precio:'300'});
            }

            console.log(vm.pagina_web);
        }

        function addRegistroDominio() {
            if (vm.extension_1) {
                vm.registro_dominio.push({nombre:'.com / .net /', precio:'550'});
            }
            if (vm.extension_2) {
                vm.registro_dominio.push({nombre:'.com.do / .do', precio:'100'});
            }
            if (vm.extension_3) {
                vm.registro_dominio.push({nombre:'otro', precio:'250'});
            }

            console.log(vm.registro_dominio);
        }

        function addDisenioGrafico(){
            if (vm.logotipo) {
                vm.graficos.push({nombre:'Diseño de Logotipo', precio:'550'});
            }
            if (vm.tarjeta) {
                vm.graficos.push({nombre:'Tarjetas', precio:'100'});
            }
            if (vm.catalogo) {
                vm.graficos.push({nombre:'Catálogo', precio:'250'});
            }

            console.log(vm.graficos);
        }

    };

})();

