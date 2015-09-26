(function () {
    'use strict';
    angular.module('mue.core.user').factory('MueUserResource', function ($q, MueResource) {
        var user = MueResource.one('account/user');

        return {
            getCurrentUser: function () {
                return user.get();
            }
        }
    });
})();