angular.module('mue.core.components.sidebar')
    .directive('mueSidebar', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                mueConfig: '='
            },
            templateUrl: 'src/core/components/sidebar/sidebar.directive.html'
        }
    });