(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.chat', ['ngRoute', ['mailer/mailer.js']])
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', '$location', 'MailerService'];

    function ChatController($scope, $location, MailerService) {
        var vm = this;

        vm.nombre = '';
        vm.email = '';
        vm.message = '';
        vm.chatIsLogged = false;
        vm.enviando = false;
        vm.idChat = 0;
        var myDataRef = new Firebase('https://chat-acdesarrollos.firebaseio.com/');

        vm.loginChat = loginChat;
        vm.sendChat = sendChat;


        function loginChat() {
            if (vm.nombre.trim() == '') {
                return;
            }
            if (vm.email.trim() == '') {
                return;
            }
            if(vm.enviando){
                return;
            }
            vm.enviando = true;

            vm.idChat = Math.floor((Math.random() * 1000) + 1);

            MailerService.sendMailForChat( vm.email, vm.nombre, function(data){
                //console.log(data);
                vm.enviando = false;
            });

            myDataRef.push({id: vm.idChat, name: vm.nombre, mail: vm.email, message: vm.nombre + ' se ha conectado'});
            vm.chatIsLogged = true;
        }

        function sendChat(event) {
            if (event.keyCode == 13) {
                if (vm.nombre.trim() == '') {
                    return;
                }
                if (vm.email.trim() == '') {
                    return;
                }
                if (vm.message.trim() == '') {
                    return;
                }

                myDataRef.push({id: vm.idChat, name: vm.nombre, mail: vm.email, message: vm.message});

                vm.message = '';
            }
        }

        myDataRef.on('child_added', function (snapshot) {
            if(snapshot.val().id != vm.idChat){
                return;
            }

            var messages = angular.element(document.querySelector('#message'));
            messages.append('<p>' + snapshot.val().name + ' dice: ' + snapshot.val().message + '</p>');
            if (!$scope.$$phase) {
                //$digest or $apply
                $scope.$apply();
            }
        });

    };

})();

