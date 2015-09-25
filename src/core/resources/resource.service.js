(function () {
    'use strict';
    angular.module('mue.core.resources').factory('mueResource', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api');
        });
    });
})();