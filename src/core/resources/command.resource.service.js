(function () {
    'use strict';
    angular.module('mue.core.resources').factory('mueCommandResource', function (mueResource) {
        var CommandInstanceResource = function (resourceType) {
            var _resource = mueResource.withSubUrlConfiguration(RX_RESOURCE_URLS.command, function (RestangularConfigurer) {

            });
        };

        return {
            create: function (resourceType) {
                return new CommandInstanceResource(resourceType);
            }
        };
    });
})();