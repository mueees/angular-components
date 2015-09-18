(function () {
    angular.module('mue.view-designer')
        .directive('mueViewComponentLayout', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'src/core/components/view-designer/view-designer-components/view-component-layout/view-component-layout.html',
                scope: {
                    mueConfiguration: '='
                },
                link: function ($scope, element) {
                    if ($scope.mueConfiguration.isDraggable) {
                        element.attr('draggable', 'true');

                        element.bind("dragstart", function (e) {
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData("component:type", 'mueViewComponentLayout');

                            return true;
                        });
                    }

                    $scope.components = [];

                    element.bind("dragenter", function (e) {
                        e.preventDefault();
                        return true;
                    });

                    element.bind("dragover", function (e) {
                        e.preventDefault();
                    });

                    $scope.componentConfiguration = {
                        isDraggble: false
                    };

                    element.bind("drop", function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        $scope.$apply(function () {
                            $scope.components.push({
                                type: e.dataTransfer.getData('component:type'),
                                url: e.dataTransfer.getData('component:url'),
                                html: e.dataTransfer.getData('component:html')
                            });
                        });
                    });
                }
            }
        });
})();