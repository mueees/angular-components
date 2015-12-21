(function () {
    'use strict';
    angular.module('mue.core.auth-account').provider('mueAuthAccount', function () {
        return {
            $get: function ($q, $rootScope, MUE_AUTH_EVENTS) {
                function login() {
                    $rootScope.$broadcast(MUE_AUTH_EVENTS.loginSuccess, data);
                }

                function logout() {
                    $rootScope.$broadcast(MUE_AUTH_EVENTS.logoutSuccess);
                }

                return {
                    login: login,
                    logout: logout
                };
            }
        };
    });
})();
