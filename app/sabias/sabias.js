(function () {

    //https://docs.angularjs.org/api/ng/service/$interval

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.sabias', ['ngRoute'])
        .controller('SabiasController', SabiasController);

    SabiasController.$inject = ['$scope', '$interval'];

    function SabiasController($scope, $interval) {
        var vm = this;

        vm.movie = 1;
        vm.titulo_video = '';
        vm.show_btn = true;
        var video = null;
        var stop;

        vm.videos = [
            {title:'Video 1', name:'movie1.mov'},
            {title:'Video 2', name:'movie2.mov'},
            {title:'Video 3', name:'movie3.mov'},
            {title:'Video 4', name:'movie4.mov'},
            {title:'Video 5', name:'movie5.mov'},
            {title:'Video 6', name:'movie6.mov'},
            {title:'Video 7', name:'movie7.mov'}
        ];

        vm.btn_titulo = 'Play (' + vm.videos[0].title + ')';

        //Declaro funciones
        vm.nextMovie = nextMovie;
        vm.playMovie = playMovie;


        function changeVideo() {
            //if ( angular.isDefined(stop) ) return;

            if(video.paused){
                stopVideo();
            } else {
                console.log('Video corriendo');
                vm.show_btn = false;
            }
        }

        function stopVideo() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;

                vm.movie = vm.movie + 1;
                console.log('Proximo video ' + vm.movie);

                if(vm.movie > 5)
                    vm.movie = 1;

                var index = vm.movie - 1;
                console.log('index: ' + index);

                vm.btn_titulo = 'Play (' + vm.videos[index].title + ')';
                vm.titulo_video = vm.videos[index].title;
                console.log('Video detenido');
                vm.show_btn = true;
            }
        }

        function playMovie() {
            console.log('video actual ' + vm.movie);

            if(vm.movie == 1)
                video = document.getElementById('video1');
            else if(vm.movie == 2)
                video = document.getElementById('video2');
            else if(vm.movie == 3)
                video = document.getElementById('video3');
            else if(vm.movie == 4)
                video = document.getElementById('video4');
            else if(vm.movie == 5)
                video = document.getElementById('video5');
            else if(vm.movie == 6)
                video = document.getElementById('video6');
            else if(vm.movie == 7)
                video = document.getElementById('video7');

            console.log(video);
            video.play();
            vm.show_btn = false;

            stop = $interval(changeVideo, 10000);
        }

        function nextMovie(movie) {
            vm.movie = movie;

            var index = vm.movie - 1;
            console.log('index: ' + index);

            vm.btn_titulo = 'Play (' + vm.videos[index].title + ')';
            vm.titulo_video = vm.videos[index].title;
        }


    };

})();

