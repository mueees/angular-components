(function () {
    'use strict';
    angular.module('mue.core.security').factory('mueSession', function () {
        var _user = null;

        /**
         * Creates session with provided user data
         *
         * @param {!Object} user
         * @private
         */
        function _create(user) {
            _user = user;
        }

        function _destroy() {
            _user = null;
        }

        function _getUser() {
            return _user;
        }

        function _isAlive() {
            return _user !== null;
        }

        return {
            create: _create,
            destroy: _destroy,
            getUser: _getUser,
            isAlive: _isAlive
        };
    });
})();
