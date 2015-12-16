(function () {
    'use strict';
    angular.module('mue.core.error-handler').constant('MUE_ERROR_MESSAGES', {
        httpDefaultError: 'An unexpected server communication error has occurred. Status: %s.',
        httpNetworkError: 'Network communication error has occurred.',
        scriptError: 'An unexpected script error has occurred.'
    });
})();