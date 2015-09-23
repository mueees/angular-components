/**
 * @ngdoc directive
 * @name mue.seed.directive:mueSeed
 * @restrict E
 * @element mue-seed
 *
 * @description
 * Test
 *
 *
 <example module="test">

 <file name="index.html">
 <div ng-controller="Test">
 <mue-seed></mue-seed>
 </div>
 </file>

 <file name="script.js">
 angular.module('test', ['mue.seed']).controller('Test', function($scope){});
 </file>

 </example>
 */

angular.module('mue.seed')
    .directive('mueSeed', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/seed/seed.directive.html'
        }
    });