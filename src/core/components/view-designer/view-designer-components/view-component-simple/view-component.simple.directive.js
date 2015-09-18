(function () {
    angular.module('mue.view-designer')
        .directive('mueViewComponentSimple', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'src/core/components/view-designer/view-designer-components/view-component-simple/view-component-simple.html',
                scope: {
                    mueConfiguration: '='
                },
                link: function ($scope, element) {
                    if ($scope.mueConfiguration.isDraggable) {
                        element.attr('draggable', 'true');

                        element.bind("dragstart", function (e) {
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData("component:type", 'mueViewComponentSimple');
                            return true;
                        });
                    }
                }
            }
        });
})();