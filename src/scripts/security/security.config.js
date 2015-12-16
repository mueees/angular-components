(function () {
    'use strict';
    angular.module('mue.core.security').config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($rootScope, $q, MUE_AUTH_EVENTS) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: MUE_AUTH_EVENTS.notAuthenticated,
                        403: MUE_AUTH_EVENTS.notAuthorized
                    }[response.status]);

                    return $q.reject(response);
                }
            };
        });
    });
})();