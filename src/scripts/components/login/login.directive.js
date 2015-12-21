angular.module('mue.core.components.login')
    .directive('mueLogin', function (mueAuthProxy) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/components/login/login.directive.html',

            scope: {
                mueConfig: '='
            },

            link: function (scope) {
                scope.login = mueAuthProxy.login;
            }
        };
    });