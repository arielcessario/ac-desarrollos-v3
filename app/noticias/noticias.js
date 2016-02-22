(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.noticias', ['ngRoute'])
        .controller('NoticiasController', NoticiasController);

    NoticiasController.$inject = ['$scope', '$location', 'NoticiasService', '$interval', 'AcUtils'];

    function NoticiasController($scope, $location, NoticiasService, $interval, AcUtils) {
        var vm = this;

        vm.titulo = '';
        vm.filtro = '';
        vm.buscar = false;
        vm.slider_1 = false;
        vm.slider_2 = false;
        vm.slider_3 = false;
        vm.slider_4 = false;
        vm.slider_5 = false;

        vm.noticias = [];
        vm.noticias_resultado = [];
        vm.noticia = {};
        vm.noticias_slider_1 = [];
        vm.noticias_slider_2 = [];
        vm.noticias_slider_3 = [];
        vm.noticias_slider_4 = [];
        vm.noticias_slider_5 = [];

        vm.goToNoticia = goToNoticia;
        vm.showNoticia = showNoticia;
        vm.buscarNoticia = buscarNoticia;

        NoticiasService.getNoticias(function (data) {
            vm.noticias = data;

            if(data != null || data.length > 0) {
                for(var i=0; i < data.length; i++) {
                    var noticia = {};
                    noticia.noticia_id = data[i].noticia_id;
                    noticia.titulo = data[i].titulo;
                    noticia.detalles = data[i].detalles;
                    noticia.fotos = data[i].fotos;

                    if(i < 3) {
                        noticia.slider = 1;
                        vm.noticias_slider_1.push(noticia);

                        vm.slider_1 = true;
                    }
                    if(i >= 3 && i < 6) {
                        noticia.slider = 2;
                        vm.noticias_slider_2.push(noticia);

                        vm.slider_2 = true;
                    }
                    if(i >= 6 && i < 9) {
                        noticia.slider = 3;
                        vm.noticias_slider_3.push(noticia);

                        vm.slider_3 = true;
                    }
                    if(i >= 9 && i < 12) {
                        noticia.slider = 4;
                        vm.noticias_slider_4.push(noticia);

                        vm.slider_4 = true;
                    }
                    if(i >= 12 && i < 15) {
                        noticia.slider = 5;
                        vm.noticias_slider_5.push(noticia);

                        vm.slider_5 = true;
                    }
                }
            }
        });

        vm.slider_nro = 1;

        $interval(changeSlider, 10000);

        function changeSlider() {
            if(vm.noticias_slider_5.length > 0) {
                vm.slider_nro = (vm.slider_nro == 5) ? 1 : vm.slider_nro + 1;
            }
            else if(vm.noticias_slider_4.length > 0) {
                vm.slider_nro = (vm.slider_nro == 4) ? 1 : vm.slider_nro + 1;
            }
            else if(vm.noticias_slider_3.length > 0) {
                vm.slider_nro = (vm.slider_nro == 3) ? 1 : vm.slider_nro + 1;
            }
            else if(vm.noticias_slider_2.length > 0) {
                vm.slider_nro = (vm.slider_nro == 2) ? 1 : vm.slider_nro + 1;
            }
        }

        function goToNoticia(noticia_id) {
            //console.log(noticia_id);

            for(var i=0; i < vm.noticias.length; i++) {
                if(vm.noticias[i].noticia_id == noticia_id){
                    vm.noticia = vm.noticias[i];
                }
            }

            console.log(vm.noticia);
            $location.path('/noticia/' + noticia_id);
        }

        function showNoticia(noticia) {
            console.log(noticia);
        }

        function buscarNoticia(filtro) {
            if (filtro.length > 2) {
                AcUtils.getByParams('titulo,detalles', filtro, 'false', vm.noticias, function(data){
                    console.log(data);
                    vm.noticias_resultado = data;
                    vm.buscar = true;
                })
            } else {
                vm.buscar = false;
            }
        }

    };

})();

