(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.cotizador', ['ngRoute', ['mailer/mailer.js']])
        .controller('CotizadorController', CotizadorController);

    CotizadorController.$inject = ['$scope', '$location', 'MailerService'];

    function CotizadorController($scope, $location, MailerService) {
        var vm = this;

        //Contacto
        vm.nombre = '';
        vm.empresa = '';
        vm.email = '';
        vm.telefono = '';
        vm.message = '';

        //Nuestros Servicios
        vm.desarrolloweb = false;
        vm.hosting = false;
        vm.logotipos = false;
        vm.desarrollografico = false;
        vm.dominio = false;
        vm.impresion = false;

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
        vm.chat = false;
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

        //Información adicional
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
        vm.plan_hosting = [
            {id:0, name:'--- Seleccione un plan ---'},
            {id:1, name:'Hosting Emprendedores (1 GB de espacio)'},
            {id:2, name:'Hosting Empresarial (10 GB de espacio)'}
        ];

        vm.hosting_selected = vm.plan_hosting[0];

        //Funciones
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

            console.log(vm.nuevapagina);

            var cliente = {nombre:vm.nombre, empresa:vm.empresa, email:vm.email, telefono:vm.telefono, message:vm.message};

            //Diseño de Página Web
            var nueva_web = '';
            if(vm.nuevapagina == 1) {
                nueva_web = 'Diseño de una nueva página web';
            } else if(vm.nuevapagina == 2) {
                nueva_web = 'Rediseño de su página actual';
            } else if(vm.nuevapagina == 3) {
                nueva_web = 'Servicio de Mantenimiento';
            }

            //Servicio de Hosting y Correos
            var hosting_correo = '';
            if(vm.hosting_y_correo == 1) {
                hosting_correo = 'Si';
            } else if(vm.hosting_y_correo == 2) {
                hosting_correo = 'No, ya tengo el hosting';
            } else if(vm.hosting_y_correo == 3) {
                hosting_correo = 'No estoy seguro';
            }

            var hosting_plan = '';

            //Registro de Dominios
            var dominio_info = '';
            if(vm.registro_dominio == 1) {
                dominio_info = 'Registrar un nuevo dominio';
            } else if(vm.registro_dominio == 2) {
                dominio_info = 'No, ya tengo el dominio';
            } else if(vm.registro_dominio == 3) {
                dominio_info = 'No estoy seguro';
            }

            //Información Adicional
            var desea_una_reunion = '';
            if(vm.desea_reunion == 1) {
                desea_una_reunion = 'SI';
            } else if(vm.desea_reunion == 2) {
                desea_una_reunion = 'NO';
            } else if(vm.desea_reunion == 3) {
                desea_una_reunion = 'SI';
            }

            console.log(vm.fecha_reunion);
            var fecha = new Date((vm.fecha_reunion.getMonth() + 1) + '/' + (vm.fecha_reunion.getDate()) + '/' + vm.fecha_reunion.getFullYear());
            console.log(fecha);

            addServicios();

            addPaginaWeb();

            addRegistroDominio();

            addDisenioGrafico();

            MailerService.sendCotizacion(cliente, vm.nuestros_servicios, nueva_web, vm.pagina_web,
                vm.comentario, vm.website_referencia, dominio_info, vm.dominio_a_registrar,
                vm.dominio_deseado, vm.graficos, vm.otro_disenio_grafico, vm.como_nos_conocio,
                desea_una_reunion, vm.lugar_reunion, vm.fecha_reunion, hosting_correo, hosting_plan,
                function(data){
                    console.log(data);

                    cleanVariables();
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
            if (vm.impresion) {
                vm.nuestros_servicios.push({nombre:'Impresión', precio:'100'});
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
            if (vm.chat) {
                vm.pagina_web.push({nombre:'Chat en linea', precio:'150'});
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
                vm.dominio_a_registrar.push({nombre:'.com / .net /', precio:'550'});
            }
            if (vm.extension_2) {
                vm.dominio_a_registrar.push({nombre:'.com.do / .do', precio:'100'});
            }
            if (vm.extension_3) {
                vm.dominio_a_registrar.push({nombre:'otro', precio:'250'});
            }

            console.log(vm.dominio_a_registrar);
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

        function cleanVariables() {
            //Contacto
            vm.nombre = '';
            vm.empresa = '';
            vm.email = '';
            vm.telefono = '';
            vm.message = '';

            //Nuestros Servicios
            vm.desarrolloweb = false;
            vm.hosting = false;
            vm.logotipos = false;
            vm.desarrollografico = false;
            vm.dominio = false;
            vm.impresion = false;

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
            vm.chat = false;
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

            //Información adicional
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
        }

    };

})();

