/**
 * @ngdoc directive
 * @name mue.directive:mue
 * @restrict E
 * @element tag
 *
 * @description
 * Test
 *
 *
 * @example
 <example module="mue">

 <file name="index.html">
 <tag></tag>
 </file>

 </example>
 */

angular.module('mue')
    .directive('tag', function () {
        return {
            restrict: 'E',
            template: 'maybe Yes or Maybe No!',
            link: function () {
            }
        }
    });