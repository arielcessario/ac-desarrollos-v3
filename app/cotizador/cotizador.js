(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.cotizador', ['ngRoute', ['mailer/mailer.js']])
        .controller('CotizadorController', CotizadorController);

    CotizadorController.$inject = ['$scope', '$location', 'MailerService'];

    function CotizadorController($scope, $location, MailerService) {
        var vm = this;

        vm.enviando = false;
        vm.enableDominio = false;
        vm.enableReunion = false;
        vm.enableHosting = false;
        vm.enableFecha = false;

        //Nuestros Servicios
        vm.desarrolloweb = false;
        vm.hosting = false;
        vm.logotipos = false;
        vm.desarrollografico = false;
        vm.dominio = false;
        vm.impresion = false;

        //Dise�o de P�gina Web
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
        vm.chat = false;
        vm.cobros_online = false;
        vm.imagenes_admin = false;
        vm.website_referencia = '';

        //Registro de Dominios
        vm.extension_1 = false;
        vm.extension_2 = false;
        vm.extension_3 = false;
        vm.dominio_deseado = '';

        //Dise�o Gr�fico
        vm.logotipo = false;
        vm.tarjeta = false;
        vm.catalogo = false;
        vm.otro_disenio_grafico = '';

        //Informaci�n adicional
        vm.como_nos_conocio = '';
        vm.desea_reunion = [];
        vm.lugar_reunion = '';
        vm.fecha_reunion = '';

        vm.clienteEntity = {};
        vm.reunionEntity = {};
        vm.hostingEntity = {};

        vm.nuestros_servicios = [];
        vm.pagina_web = [];
        vm.registro_dominio = [];
        vm.dominio_a_registrar = [];
        vm.hosting_y_correo = [];
        vm.graficos = [];
        vm.plan_hosting = [
            {id:0, nombre:'--- Seleccione un plan ---'},
            {id:1, nombre:'Hosting Emprendedores', precio: 50},
            {id:2, nombre:'Hosting Empresarial', precio: 150}
        ];

        vm.hosting_selected = vm.plan_hosting[0];

        //Funciones
        vm.setSliderFijo = setSliderFijo;
        vm.setSliderAdministrable = setSliderAdministrable;
        vm.enableDominioDeseado = enableDominioDeseado;
        vm.enableDeseaReunion = enableDeseaReunion;
        vm.enablePlanHosting = enablePlanHosting;
        vm.sendMail = sendMail;


        function setSliderFijo(value) {
            if(!value) {
                vm.slider_fijo = false;
            } else if(value) {
                vm.slider_fijo = true;
                vm.slider_administrable = false;
            }
        }

        function setSliderAdministrable(value) {
            if(!value) {
                vm.slider_administrable = false;
            } else if(value) {
                vm.slider_administrable = true;
                vm.slider_fijo = false;
            }
        }

        function enableDominioDeseado(value) {
            if(value == 3) {
                vm.enableDominio = true;
            }
            else {
                vm.enableDominio = false;
                vm.dominio_deseado = '';
            }
        }

        function enableDeseaReunion(value) {
            if(value == 3) {
                vm.enableReunion = true;
            }
            else {
                vm.enableReunion = false;
                vm.lugar_reunion = '';
            }
            if(value == 1 || value == 3)
                vm.enableFecha = true;
            else
                vm.enableFecha = false;
        }

        function enablePlanHosting(value) {
            if(value == 1 || value == 3) {
                vm.enableHosting = true;
            }
            else {
                vm.enableHosting = false;
                vm.hosting_selected = vm.plan_hosting[0];
            }
        }

        function sendMail() {
            if (vm.clienteEntity.nombre.trim() == '') {
                return;
            }
            if (vm.clienteEntity.email.trim() == '') {
                return;
            }
            if (vm.clienteEntity.telefono.trim() == '') {
                return;
            }
            if (vm.fecha_reunion != undefined || vm.fecha_reunion != null) {
                var currentDate = new Date();
                if(vm.fecha_reunion < currentDate)
                    return;
            }

            console.log(vm.nuevapagina);

            //Dise�o de P�gina Web
            var nueva_web = '';
            if(vm.nuevapagina == 1) {
                nueva_web = 'Dise�o de una nueva p�gina web';
            } else if(vm.nuevapagina == 2) {
                nueva_web = 'Redise�o de su p�gina actual';
            } else if(vm.nuevapagina == 3) {
                nueva_web = 'Servicio de Mantenimiento';
            }

            //Servicio de Hosting y Correos
            createHosting();

            //Registro de Dominios
            var dominio_info = '';
            if(vm.registro_dominio == 1) {
                dominio_info = 'Registrar un nuevo dominio';
            } else if(vm.registro_dominio == 2) {
                dominio_info = 'No, ya tengo el dominio';
            } else if(vm.registro_dominio == 3) {
                dominio_info = 'No estoy seguro';
            }

            addServicios();

            addPaginaWeb();

            addRegistroDominio();

            addDisenioGrafico();

            //Informaci�n Adicional
            createReunion();


            MailerService.sendCotizacion(vm.clienteEntity, vm.nuestros_servicios, nueva_web,
                vm.pagina_web, vm.comentario, vm.website_referencia, dominio_info,
                vm.dominio_a_registrar, vm.dominio_deseado, vm.graficos, vm.otro_disenio_grafico,
                vm.reunionEntity, vm.hostingEntity, function(data){
                    console.log(data);

                    cleanVariables();
                });
        }

        function createHosting() {
            var hosting_correo = '';
            if(vm.hosting_y_correo == 1) {
                hosting_correo = 'Si';
            } else if(vm.hosting_y_correo == 2) {
                hosting_correo = 'No, ya tengo el hosting';
            } else if(vm.hosting_y_correo == 3) {
                hosting_correo = 'No estoy seguro';
            }

            console.log(vm.hosting_selected);

            vm.hostingEntity = {
                solicitar_hosting: hosting_correo,
                plan: (vm.hosting_selected.id == 0) ? "" : vm.hosting_selected.nombre,
                precio: (vm.hosting_selected.id == 0) ? "" : vm.hosting_selected.precio
            }
        }

        function createReunion() {
            var desea_una_reunion = '';
            if(vm.desea_reunion == 1 || vm.desea_reunion == 3) {
                desea_una_reunion = 'SI';
            } else if(vm.desea_reunion == 2) {
                desea_una_reunion = 'NO';
            }

            vm.reunionEntity = {
                como_nos_conocio: vm.como_nos_conocio,
                desea_reunion: desea_una_reunion,
                lugar_reunion: vm.lugar_reunion,
                fecha_reunion: formattedDate(vm.fecha_reunion)
            };
        }


        function addServicios() {
            if (vm.desarrolloweb) {
                vm.nuestros_servicios.push({nombre:'Dise�o de P�gina Web', precio:'2500'});
            }
            //if (vm.hosting) {
            //    vm.nuestros_servicios.push({nombre:'Hosting', precio:'100'});
            //}
            if (vm.logotipos) {
                vm.nuestros_servicios.push({nombre:'Dise�o de Logotipos', precio:'250'});
            }
            if (vm.desarrollografico) {
                vm.nuestros_servicios.push({nombre:'Dise�o Gr�fico', precio:'1500'});
            }
            if (vm.dominio) {
                vm.nuestros_servicios.push({nombre:'Registro de Dominio', precio:'300'});
            }
            if (vm.impresion) {
                vm.nuestros_servicios.push({nombre:'Impresi�n', precio:'100'});
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
                vm.pagina_web.push({nombre:'Contactos', precio:'300'});
            }
            if (vm.empresa_info) {
                vm.pagina_web.push({nombre:'Informaci�n de Empresas', precio:'300'});
            }
            if (vm.producto_info) {
                vm.pagina_web.push({nombre:'Informaci�n de Productos', precio:'300'});
            }
            if (vm.multipaginas) {
                vm.pagina_web.push({nombre:'Multip�gina', precio:'500'});
            }
            if (vm.noticias) {
                vm.pagina_web.push({nombre:'Noticias', precio:'1000'});
            }
            if (vm.usuarios) {
                vm.pagina_web.push({nombre:'Usuarios', precio:'230'});
            }
            if (vm.ecommerce) {
                vm.pagina_web.push({nombre:'Ecommerce', precio:'100'});
            }
            if (vm.chat) {
                vm.pagina_web.push({nombre:'Chat en linea', precio:'150'});
            }
            if (vm.cobros_online) {
                vm.pagina_web.push({nombre:'Cobros Online', precio:'200'});
            }
            if (vm.imagenes_admin) {
                vm.pagina_web.push({nombre:'Administraci�n de Im�genes', precio:'300'});
            }

            console.log(vm.pagina_web);
        }

        function addRegistroDominio() {
            if (vm.extension_1 == 1) {
                vm.dominio_a_registrar.push({nombre:'.com / .net /', precio:'550'});
            } else if (vm.extension_1 == 2) {
                vm.dominio_a_registrar.push({nombre:'.com.ar / .org', precio:'100'});
            } else if (vm.extension_1 == 3) {
                vm.dominio_a_registrar.push({nombre:'otro', precio:'250'});
            }

            console.log(vm.dominio_a_registrar);
        }

        function addDisenioGrafico(){
            if (vm.logotipo) {
                vm.graficos.push({nombre:'Dise�o de Logotipo', precio:'1500'});
            }
            if (vm.tarjeta) {
                vm.graficos.push({nombre:'Tarjetas', precio:'100'});
            }
            if (vm.catalogo) {
                vm.graficos.push({nombre:'Cat�logo', precio:'250'});
            }

            console.log(vm.graficos);
        }

        function formattedDate(date) {
            var d = new Date(date || Date.now()),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [day, month, year].join('/');
        }

        function cleanVariables() {
            vm.clienteEntity = {};
            vm.reunionEntity = {};
            vm.hostingEntity = {};

            //Nuestros Servicios
            vm.desarrolloweb = false;
            vm.hosting = false;
            vm.logotipos = false;
            vm.desarrollografico = false;
            vm.dominio = false;
            vm.impresion = false;

            //Dise�o de P�gina Web
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
            vm.chat = false;
            vm.cobros_online = false;
            vm.imagenes_admin = false;
            vm.website_referencia = '';

            //Registro de Dominios
            vm.extension_1 = false;
            vm.extension_2 = false;
            vm.extension_3 = false;
            vm.dominio_deseado = '';

            //Dise�o Gr�fico
            vm.logotipo = false;
            vm.tarjeta = false;
            vm.catalogo = false;
            vm.otro_disenio_grafico = '';

            //Informaci�n adicional
            vm.como_nos_conocio = '';
            vm.desea_reunion = [];
            vm.lugar_reunion = '';
            vm.fecha_reunion = '';

            vm.nuestros_servicios = [];
            vm.pagina_web = [];
            vm.registro_dominio = [];
            vm.dominio_a_registrar = [];
            vm.hosting_y_correo = [];
            vm.graficos = [];

            vm.hosting_selected = vm.plan_hosting[0];
        }

    };

})();


