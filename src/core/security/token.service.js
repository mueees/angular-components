(function () {
    'use strict';
    angular.module('mue.core.security').factory('mueToken', function () {
        var itemName = 'mueToken';

        /**
         * Creates token
         *
         * @param {!String} token
         * @private
         */
        function _create(token) {
            localStorage.setItem(itemName, token);
        }

        function _destroy() {
            localStorage.setItem(itemName, null);
        }

        function _getToken() {
            localStorage.getItem(itemName);
        }

        function _hasToken() {
            return Boolean(localStorage.getItem(itemName));
        }

        return {
            create: _create,
            destroy: _destroy,
            getToken: _getToken,
            hasToken: _hasToken
        };
    });
})();
