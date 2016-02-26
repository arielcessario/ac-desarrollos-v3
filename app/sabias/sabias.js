(function () {

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

        var video = document.getElementsByTagName('video')[0];


        vm.nextMovie = nextMovie;
        vm.playMovie = playMovie;


        //$interval(changeVideo, 10000);

        function changeVideo() {
            if(video != undefined) {
                if(video.paused){
                    console.log('Video detenido');
                    $interval.cancel(changeVideo);
                    vm.show_btn = true;
                } else {
                    console.log('Video corriendo');
                    vm.show_btn = false;
                }
            } else {
                console.log('undefined');
                vm.show_btn = false;
            }
        }

        function playMovie() {
            var index = vm.movie - 1;
            console.log(index);

            video = document.getElementsByTagName('video')[0];
            console.log(video);
            video.play();
            vm.show_btn = false;
            //vm.btn_titulo = vm.videos[index].title;
            //vm.titulo_video = vm.videos[index].title;
            vm.btn_titulo = 'Play (' + vm.videos[vm.movie].title + ')';
            vm.titulo_video = vm.videos[vm.movie].title;

            vm.movie = vm.movie + 1;
            console.log(vm.movie);

            //$interval(changeVideo, 10000);
        }

        function nextMovie(movie) {
            vm.movie = movie;

            video = document.getElementsByTagName('video')[0];
            console.log(video);

            video.play();
            vm.show_btn = false;

            vm.titulo_video = vm.videos[movie - 1].title;

            console.log(vm.movie);
        }


    };

})();

