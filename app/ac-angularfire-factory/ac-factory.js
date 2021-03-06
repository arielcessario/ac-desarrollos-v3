(function () {
    'use strict';

    angular.module('acFactory', ['ngRoute'])
        .factory('FireService', FireService)
        .factory('FireModel', FireModel)
        .service('FireVars', FireVars);


    FireService.$inject = ['FireVars', '_FIREREF', '$firebaseObject', '$firebaseArray'];
    function FireService(FireVars, _FIREREF, $firebaseObject, $firebaseArray) {
        var service = this;
        service.createObjectRef = createObjectRef;
        service.createArrayRef = createArrayRef;
        service.init = init;
        service.cacheFactory = cacheFactory;
        service.bindTo = bindTo;
        service.getIndex = getIndex;
        service.formatObj = formatObj;

        return service;


        function init() {
            FireVars._FIREREF = new Firebase(_FIREREF);

        }

        function cacheFactory(ref) {
            var _strCache = ref.path.u[0].toUpperCase();
            var _cache = {};

            if (!FireVars.hasOwnProperty('_cache_' + _strCache)) {
                FireVars['_cache_' + _strCache] = {};
            }

            _cache = FireVars['_cache_' + _strCache];


            _cache.$load = function (_id) {
                var _response = [];
                var ids = (Object.getOwnPropertyNames(_id));

                for (var i = 0; i < ids.length; i++) {

                    if (!_cache.hasOwnProperty(ids[i])) {
                        _cache[ids[i]] = $firebaseObject(ref.child(ids[i]));
                    }
                }

                // Devuelve solos los que pertenecen a ese objeto
                for (var i = 0; i < ids.length; i++) {
                    _response.push(_cache[ids[i]]);
                }
                return _response;
            };
            _cache.$dispose = function () {
                angular.forEach(_cache, function (elem) {
                    elem.$off();
                });
            };
            return _cache;
        }

        function getIndex(key, array){
            for(var i = 0; i<array.length; i++){
                if(array[i].$id == key){
                    return i;
                }
            }
        }

        function formatObj(obj){
            var props = Object.getOwnPropertyNames(obj);

            for(var i = 0; i<props.length; i++){
                if(obj[props[i]].hasOwnProperty('$id')){
                    var key = obj[props[i]].$id;
                    obj[props[i]] = {};
                    obj[props[i]][key] = true;
                }
            }

            return obj;
        }


        /**
         *
         * @param FireObj String del tipo 'nombreController.nombreVar'
         * @param scope
         * @returns {*}
         */
        function bindTo(scope, FireObj) {
            return FireObj.$bindTo(scope, FireObj);
        }

        function createObjectRef(ref) {
            return $firebaseObject(ref);
        }

        function createArrayRef(ref, orderBy, startAt, endAt) {
            if(orderBy == undefined){

                return $firebaseArray(ref);
            }else{
                var filtered = ref.orderByChild(orderBy).startAt(startAt).endAt(endAt);
                return $firebaseArray(filtered);
            }
        }
    }

    FireVars.$inject = [];
    function FireVars() {

        this._FIREREF = {};

    }


    FireModel.$inject = ['FireVars'];
    /**
     * @description Modelo de datos de la aplicación
     * @returns {FireModel}
     * @constructor
     */
    function FireModel(FireVars) {

        var factory = this;

        factory.acChat = {
            id: '',
            mail: '',
            message: '',
            name: '',
            date_time:''
            //date_time: Firebase.ServerValue.TIMESTAMP
        };

        //factory.refAcChats = FireVars._FIREREF.child('/chat-acdesarrollos/');
        factory.refAcChats = FireVars._FIREREF;

        /*
         factory.cliente = {
         id: '',
         email: '',
         nombre: ''
         };

         factory.refClientes = FireVars._FIREREF.child('/cliente/');

         factory.conversacion = {
         id: '',
         cliente: {},
         mensaje: '',
         fecha_hora: ''
         };

         factory.refConversaciones = FireVars._FIREREF.child('/conversacion/');
         */
        return factory;
    }

})();