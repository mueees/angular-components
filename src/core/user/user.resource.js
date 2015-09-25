(function () {
    'use strict';
    angular.module('mue.core.user').factory('mueUserResource', function ($q) {
        return {
            getCurrentUser: function () {
                return $q.when();
            }
        }
    });
})();