angular.module('mue.core.components.sidebar')
    .directive('mueSidebar', function ($rootScope) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                mueConfig: '='
            },
            templateUrl: 'src/core/components/sidebar/sidebar.directive.html',
            link: function ($scope, element) {
                $scope.open = function () {
                    $scope.isOpen = true;
                    element.addClass('mue-sidebar-open');
                };

                $scope.close = function () {
                    $scope.isOpen = false;
                    element.removeClass('mue-sidebar-open');
                };

                $rootScope.$on('mueSidebar:close', $scope.close);
            }
        }
    });