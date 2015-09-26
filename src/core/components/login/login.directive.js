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
 <example module="test">

 <file name="index.html">
 <div ng-controller="Test">
 <mue-login></mue-login>
 </div>
 </file>

 <file name="script.js">
 angular.module('test', ['mue.core.seed']).controller('Test', function($scope){});
 </file>

 </example>
 */

angular.module('mue.core.login')
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