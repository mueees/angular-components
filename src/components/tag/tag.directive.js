/**
 * @ngdoc directive
 * @name mue.tag.directive:mueTag
 * @restrict E
 * @element mue-tag
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * @example
 <example module="mue">
 <file name="index.html">
 <mue-tag></mue-tag>
 </file>
 </example>
 */

angular.module('mue.tag')
    .directive('mueTag', function () {
        return {
            restrict: 'E',
            templateUrl: 'test',
            link: function () {
                alert(1);
            }
        }
    });