/**
 * @ngdoc directive
 * @name mue.core.header.directive:mueHeader
 * @restrict E
 * @element mue-header
 *
 * @description
 * Test
 *
 *
 <example module="test">

 <file name="index.html">
 <div ng-controller="Test">
 <mue-header></mue-header>
 </div>
 </file>

 <file name="script.js">
 angular.module('test', ['mue.core.header']).controller('Test', function($scope){});
 </file>

 </example>
 */

angular.module('mue.core.components.header')
    .directive('mueHeader', function (mueAuthProxy) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/components/header/header.directive.html',

            scope: {
                mueConfig: '='
            },

            link: function (scope) {
                scope.logoutHandler = mueAuthProxy.logout;
            }
        };
    });