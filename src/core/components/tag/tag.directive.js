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
 <example module="mue">

 <file name="index.html">
 <tag></tag>
 </file>

 <file name="script.js">

 </file>

 <file name="style.css">
 tag {
        border: 1px solid black;
        background-color: white;
        min-height: 20px;
      }
 </file>

 </example>
 */

angular.module('mue')
    .directive('tag', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/tag/tag.directive.html',
            link: function () {

            }
        }
    });