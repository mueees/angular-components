(function () {
    angular.module('mue.core.error-handler').factory('mueScriptErrorHandler', function (growl, MUE_ERROR_MESSAGES) {
        function handleScriptError(exception, cause) {
            var message = MUE_ERROR_MESSAGES.scriptError;

            if (_.isString(exception.message)) {
                message += ' ' + exception.message;
            }

            growl.addErrorMessage(message);
        }

        return {
            handleScriptError: handleScriptError
        };
    });
})();