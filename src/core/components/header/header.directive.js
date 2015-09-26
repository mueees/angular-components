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

angular.module('mue.core.header')
    .directive('mueHeader', function (mueAuthentication) {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/header/header.directive.html',
            scope: {
                mueConfig: '='
            },
            link: function (scope) {
                scope.logoutHandler = function () {
                    mueAuthentication.logout();
                }
            }
        }
    });