/**
 * @ngdoc directive
 * @name mue.directive:seed
 * @restrict E
 * @element seed
 *
 * @description
 * Test
 *
 *
 <example module="mue">

 <file name="index.html">
 <mue-seed></mue-seed>
 </file>

 <file name="script.js">
 </file>

 <file name="style.css">
 mue-seed {
        border: 1px solid black;
        background-color: white;
        min-height: 20px;
      }
 </file>

 </example>
 */

angular.module('mue.seed')
    .directive('mueSeed', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/seed/seed.directive.html',
            link: function () {
                console.log('test');
            }
        }
    });