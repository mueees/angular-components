(function () {
    'use strict';
    angular.module('mue.core.auth-proxy').provider('mueAuthProxy', function () {
        var applicationOauthKey = null,
            timeout = 1000 * 60 * 2,
            origin = 'http://proxy.mue.in.ua',
            provideServer = 'http://proxy.mue.in.ua/provide/',
            provide = null;

        function setOauthKey(oauthKey) {
            applicationOauthKey = oauthKey;
        }

        function config(options) {
            options = options || {};

            if (options.origin) {
                origin = options.origin;
                provideServer = origin + '/provide/';
            }
        }

        return {
            setOauthKey: setOauthKey,

            config: config,

            $get: function ($q, $rootScope, MUE_AUTH_EVENTS) {
                function Provide() {
                    this.timeout = 1000 * 60; // on minute
                    this.initialize();
                }

                Provide.prototype = {
                    initialize: function () {},

                    open: function () {
                        var me = this;

                        this.defer = $q.defer();

                        this.window = window.open(provideServer + applicationOauthKey);

                        window.addEventListener("message", function (e) {
                            me.receiveMessage(e);
                        }, false);

                        this.openTimeout = setTimeout(function () {
                            me.reject('Timeout');
                        }, timeout);

                        this.openInterval = setInterval(function () {
                            me.window.postMessage({
                                origin: window.location.origin,
                                host: window.location.host,
                                href: window.location.href
                            }, '*');
                        }, 500);

                        this.windowClosedInterval = setInterval(function () {
                            if (me.window.closed) {
                                me.reject('Window was closed');
                            }
                        }, 1000);

                        return this.defer.promise;
                    },

                    reject: function (errorMessage) {
                        this.clearOpenInterval();
                        this.clearWindowClosedInterval();
                        this.clearOpenTimeout();
                        this.unSubscribeMessage();
                        this.defer.reject({
                            status: 500,
                            message: errorMessage || 'Server error'
                        });
                    },

                    unSubscribeMessage: function () {
                        window.removeEventListener("message", this.receiveMessage, false);
                    },

                    clearWindowClosedInterval: function () {
                        clearInterval(this.windowClosedInterval);
                    },

                    clearOpenInterval: function () {
                        if (this.openInterval) {
                            clearInterval(this.openInterval);
                            this.openInterval = null;
                        }
                    },

                    clearOpenTimeout: function () {
                        if (this.openTimeout) {
                            clearTimeout(this.openTimeout);
                            this.openTimeout = null;
                        }
                    },

                    receiveMessage: function (event) {
                        if (event.origin == origin) {
                            this.clearOpenInterval();
                            this.clearOpenTimeout();
                            this.unSubscribeMessage();

                            var data = JSON.parse(event.data);

                            if (data.status == 200) {
                                this.defer.resolve(data);
                            } else {
                                this.defer.reject(data);
                            }
                        }
                    }
                };

                function login() {
                    (new Provide()).open().then(function (data) {
                        $rootScope.$broadcast(MUE_AUTH_EVENTS.loginSuccess, data);
                    });
                }

                function logout() {
                    $rootScope.$broadcast(MUE_AUTH_EVENTS.logoutSuccess);
                }

                if (!applicationOauthKey) {
                    throw new Error('mueAuthUserResource service has not been configured properly.');
                }

                return {
                    login: login,
                    logout: logout
                };
            }
        };
    });
})();
