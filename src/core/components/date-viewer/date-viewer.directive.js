/**
 * @ngdoc directive
 * @name mue.date-viewer.directive:mueDateViewer
 * @restrict E
 * @element mue-date-viewer
 *
 * @description
 * Test
 *
 *
 <example module="test">

<file name="index.html">
 <div ng-controller="Test">
 <mue-date-viewer mue-config="dateViewerConfiguration"></mue-date-viewer>
 </div>
 </file>

 <file name="script.js">
 angular.module('test', ['mue.date-viewer']).controller('Test', function($scope){
 $scope.dateViewerConfiguration = {
            type: 2,
            start: new Date(),
            end: new Date()
        }
 });
 </file>

 </example>
 */

angular.module('mue.date-viewer')
    .directive('mueDateViewer', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/date-viewer/date-viewer.directive.html',
            scope: {
                mueConfig: '='
            },
            link: function (scope, element) {
                scope.today = function () {

                };

                scope.prev = function () {

                };

                scope.next = function () {

                };


                scope.dateViewerConfiguration = {
                    type: 1,
                    start: new Date(),
                    end: new Date()
                }
            }
        }
    });