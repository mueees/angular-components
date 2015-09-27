/**
 * @ngdoc service
 * @name mueAuthentication
 *
 * @description
 * The mueAuthentication service provides the login/logout functionality and
 * ensures that a user gets authenticated before accessing the application.
 *
 * The service must be configured and injected into the application as early as possible,
 * e.g. in the main module config/run block, before any UI route changes occur.
 */
(function () {
    'use strict';
    angular.module('mue.core.security').provider('mueAuthentication', function () {
        var _loginState = null,
            _appState = null;

        /**
         * @ngdoc method
         * @name mueAuthenticationProvider#loginState
         *
         * @description
         * This method is getter / setter.
         *
         * Returns the UI state for the login view when called without any parameters.
         *
         * Sets the UI state for the login view when called with parameters.
         *
         * @param {String} stateName A name of the UI state.
         * @param {Object=} stateParams A map of parameters for the state.
         *
         * @return {Object} The UI state for the login view.
         */
        function loginState(stateName, stateParams) {
            if (arguments.length) {
                _loginState = {
                    name: stateName,
                    params: stateParams
                };
            }

            return _loginState;
        }

        /**
         * @ngdoc method
         * @name mueAuthenticationProvider#appState
         *
         * @description
         * This method is getter / setter.
         *
         * Returns the UI state to transition to after login when called without any parameters.
         *
         * Sets the UI state to transition to after login when called with parameters.
         *
         * @param {String|Object|Function} stateName A name of the UI state, a state descriptor, or a function
         *                                           that returns either a state name of a state descriptor.
         *                                           The state descriptor is an object with a 'name' and an optional
         *                                           'params' properties.
         * @param {Object=} stateParams A map of parameters for the UI state. Ignored if the stateName parameter is not
         *                              a string.
         *
         * @return {Object} The UI state to transition to after login.
         */
        function appState(stateName, stateParams) {
            if (arguments.length) {
                if (_.isString(stateName)) {
                    _appState = {
                        name: stateName,
                        params: stateParams
                    };
                } else if (_.isFunction(stateName)) {
                    _appState = stateName;
                } else if (_.isObject(stateName) && _.isString(stateName.name)) {
                    _appState = stateName;
                }
            }

            return _appState;
        }

        return {
            loginState: loginState,
            appState: appState,
            $get: function ($state, $rootScope, $q, mueAuthUserResource, MueUserResource, MueResource, mueSession, mueToken, MUE_AUTH_EVENTS) {
                if (!_loginState || !_loginState.name || !_appState) {
                    throw new Error('mueAuthentication service has not been configured properly.');
                }

                var afterLoginState = _appState;

                /**
                 * @ngdoc method
                 * @name mueAuthentication#login
                 *
                 * @description
                 * Authenticates the user.
                 */
                function login() {
                    return mueAuthUserResource.login();
                }

                /**
                 * @ngdoc method
                 * @name mueAuthentication#logout
                 *
                 * @description
                 * Signs the user out of the application.
                 *
                 * @returns {Promise} A promise that will be resolved when a user is logged out, or if the logout failed.
                 */
                function logout() {
                    mueToken.destroy();
                    mueSession.destroy();

                    $rootScope.$broadcast(MUE_AUTH_EVENTS.logoutSuccess);
                }

                /**
                 * @ngdoc method
                 * @name rxAuthentication#initSession
                 *
                 * @description
                 * Initializes session by loading details for current user.
                 *
                 * @returns {Promise} Returns a promise which will be resolved when session is initialized
                 */
                function initSession() {
                    var deferred = $q.defer();

                    if (mueSession.isAlive()) {
                        deferred.resolve();
                    } else {
                        MueUserResource.getCurrentUser().then(function (user) {
                            mueSession.create(user);
                            deferred.resolve();
                        });
                    }

                    return deferred.promise;
                }

                function _loginSuccessHandler(scope, data) {
                    mueToken.create(data.client_token);

                    var targetState = afterLoginState;

                    if (_.isFunction(targetState)) {
                        targetState = targetState();
                    }

                    if (_.isString(targetState)) {
                        targetState = {
                            name: targetState
                        };
                    }

                    $state.go(targetState.name, targetState.params);

                    afterLoginState = _appState;
                }

                function _redirectToLoginState() {
                    $state.go(_loginState.name, _loginState.params);
                }

                $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                    if (toState && toState.name !== _loginState.name) {
                        afterLoginState = {
                            name: toState.name,
                            params: toParams
                        };
                    }
                });

                $rootScope.$on(MUE_AUTH_EVENTS.notAuthenticated, function () {
                    mueSession.destroy();
                    _redirectToLoginState();
                });

                $rootScope.$on(MUE_AUTH_EVENTS.loginSuccess, _loginSuccessHandler);

                function _onLogout() {
                    afterLoginState = _appState;
                    _redirectToLoginState();
                }

                $rootScope.$on(MUE_AUTH_EVENTS.logoutSuccess, _onLogout);

                $rootScope.$on(MUE_AUTH_EVENTS.logoutFailed, _onLogout);

                MueResource.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
                    if(mueToken.hasToken()){
                        headers['Authorization'] = 'Bearer ' + mueToken.getToken();
                    }

                    return {
                        element: element,
                        params: params,
                        headers: headers,
                        httpConfig: httpConfig
                    };
                });

                return {
                    login: login,
                    logout: logout,
                    initSession: initSession
                };
            }
        };
    });
})();