(function () {

    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.chat', ['ngRoute'])
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', '$location', 'ContactsService', 'FireModel', 'FireService'];

    function ChatController($scope, $location, ContactsService, FireModel, FireService) {

        var fireBase = new Firebase('https://chat-acdesarrollos.firebaseio.com/');

        var vm = this;

        vm.nombre = '';
        vm.email = '';
        vm.message = '';
        vm.chatIsLogged = false;
        vm.enviando = false;
        vm.idChat = 0;


        vm.loginChat = loginChat;
        vm.sendChat = sendChat;

        vm.chatRef = FireService.createArrayRef(FireModel.refAcChats);

        fireBase.on('child_added', function (snapshot) {
            //var currentDate = Date.now();
            //var date_time = convertDate(currentDate) + ' ' + getTime(currentDate);

            var acChat = snapshot.val();

            if(acChat.chat_type != 1 && acChat.id == vm.idChat) {
                var messages = angular.element(document.querySelector('#message'));

                messages.append('<div class="chat-ac"><img src="images/logo.png" width="40px" height="40px"><div><p>' + acChat.name + ' (' + acChat.mail + ') dice: ' + acChat.message + '</p><div class="chat-hora">'+ acChat.date_time +'</div></div></div>');
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        });

        /*
         // to take an action after the data loads, use the $loaded() promise
         vm.chatRef.$loaded().then(function(){
         console.log("loaded record:", vm.chatRef);

         // To iterate the key/value pairs of the object, use angular.forEach()
         angular.forEach(vm.chatRef, function(value, key) {
         console.log(key, value);
         });
         });
         */


        vm.chatRef.$loaded(
            function (data) {
                //vm.usuarios = data;
                //console.log(data);
                console.log(data.length);

                var messages = angular.element(document.querySelector('#message'));
                /*
                 messages.append('<div class="chat-ac"><img src="images/logo.png" width="40px" height="40px"><div><p>' + vm.nombre + ' (' + vm.email + ') dice: ' + vm.message + '</p><div class="chat-hora">'+ convertDate(currentDate) +'</div></div></div>');
                 if (!$scope.$$phase) {
                 $scope.$apply();
                 }
                 */
            },
            function(error){
                console.error("Error:", error);
            }
        );

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

            ContactsService.sendMail(vm.email,
                [{mail: 'arielcessario@gmail.com'}, {mail: 'mmaneff@gmail.com'}, {mail: 'diegoyankelevich@gmail.com'}],
                vm.nombre,
                'http://192.185.67.199/~arielces/ac-desarrollos-chat/',
                'Nuevo chat de ' + vm.nombre,
                function (data, result) {
                    vm.enviando = false;
                });

            var currentDate = Date.now();
            //myDataRef.push({id: vm.idChat, name: vm.nombre, mail: vm.email, message: vm.nombre + ' se ha conectado'});

            var date_time = convertDate(currentDate) + ' ' + getTime(currentDate);

            vm.chatRef.$add({
                id: vm.idChat,
                name: vm.nombre,
                mail: vm.email,
                message: vm.nombre + ' se ha conectado',
                chat_type: 1,
                date_time: date_time});
            vm.chatIsLogged = true;

        }

        function sendChat(event) {
            //console.log(event);
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

                //myDataRef.push({id: vm.idChat, name: vm.nombre, mail: vm.email, message: vm.message});
                var currentDate = Date.now();

                var date_time = convertDate(currentDate) + ' ' + getTime(currentDate);

                vm.chatRef.$add({
                    id: vm.idChat,
                    name: vm.nombre,
                    mail: vm.email,
                    message: vm.message,
                    chat_type: 1,
                    date_time: date_time});

                var messages = angular.element(document.querySelector('#message'));
                //console.log(messages);

                messages.append('<div class="chat-cliente"><img src="images/cliente.png" width="40px" height="40px"><div><p>' + vm.nombre + ' (' + vm.email + ') dice: ' + vm.message + '</p><div class="chat-hora">'+ date_time +'</div></div></div>');
                if (!$scope.$$phase) {
                    $scope.$apply();
                }

                vm.message = '';
            }
        }

        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat);
            return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
        }

        function getTime(dateTime) {
            function pad(s) { return (s < 8) ? '0' + s : s; }
            var d = new Date(dateTime);
            return [pad(d.getHours()), pad(d.getMinutes()+1), d.getSeconds()].join(':');
        }

    };

})();

