angular.module('mue.core.components.list-group')
    .directive('mueListGroup', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/components/list-group/list-group.directive.html',
            scope: {
                mueConfig: '='
            }
        };
    });