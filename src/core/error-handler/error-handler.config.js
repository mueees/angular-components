(function () {
    'use strict';
    angular.module('mue.core.error-handler').config(function ($provide) {
        // decorate angular $exceptionHandler service to intercept script errors
        $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
            return function (exception, cause) {
                $injector.get('mueScriptErrorHandler').handleScriptError(exception, cause);
                $delegate(exception, cause);
            };
        });
    });
})();
