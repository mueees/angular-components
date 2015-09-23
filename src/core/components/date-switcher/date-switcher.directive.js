/**
 * @ngdoc directive
 * @name mue.date-switcher.directive:mueDateSwitcher
 * @restrict E
 * @element mue-date-switcher
 *
 * @description
 * Test
 *
 *
 <example module="test">

 <file name="index.html">
 <div ng-controller="Test">
 <mue-date-switcher mue-config="config"></mue-date-switcher>
 </div>
 </file>

 <file name="script.js">
 angular.module('test', ['mue.date-switcher']).controller('Test', function($scope){
     $scope.config = {
                type: 2,
                start: new Date(),
                end: new Date()
            }
 });
 </file>

 </example>
 */

angular.module('mue.date-switcher')
    .directive('mueDateSwitcher', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/date-switcher/date-switcher.directive.html',
            scope: {
                mueConfig: '='
            },
            link: function () {
            }
        }
    });