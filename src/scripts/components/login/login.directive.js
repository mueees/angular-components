/**
 * @ngdoc directive
 * @name mue.core.login.directive:mueLogin
 * @restrict E
 * @element mue-login
 *
 * @description
 * Test
 *
 *
 */

angular.module('mue.core.components.login')
    .directive('mueLogin', function (mueAuthentication, MUE_AUTH_EVENTS, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/login/login.directive.html',
            scope: {
                mueConfig: '='
            },
            link: function (scope) {
                scope.login = function () {
                    mueAuthentication.login().then(function (data) {
                        $rootScope.$broadcast(MUE_AUTH_EVENTS.loginSuccess, data);
                    });
                }
            }
        }
    });