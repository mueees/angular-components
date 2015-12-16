angular.module('mue.core.components.date-viewer')
    .directive('mueDateViewer', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/date-viewer/date-viewer.directive.html',
            scope: {
                mueConfig: '='
            },
            link: function (scope, element) {

            }
        };
    });