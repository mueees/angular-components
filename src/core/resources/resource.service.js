(function () {
    'use strict';
    angular.module('mue.core.resources').factory('MueResource', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:10002/api');
        });
    });
})();