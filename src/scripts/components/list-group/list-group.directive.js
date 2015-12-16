angular.module('mue.core.components.list-group')
    .directive('mueListGroup', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/list-group/list-group.directive.html',
            scope: {
                mueConfig: '='
            }
        };
    });