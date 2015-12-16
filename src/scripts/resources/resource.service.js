(function () {
    'use strict';
    angular.module('mue.core.resources').provider('MueResource', function () {
        var baseUrl = 'http://proxy.mue.in.ua/api';

        return {
            setBaseUrl: function (url) {
                if (url) {
                    baseUrl = url;
                }
            },
            $get: function (Restangular) {
                return Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(baseUrl);
                })
            }
        };
    });
})();