/**
 * @ngdoc directive
 * @name mue.view-designer.directive:mueViewDesigner
 * @restrict E
 * @element mueViewDesigner
 *
 * @description
 * View Designer directive
 */
(function () {
    angular.module('mue.view-designer')
        .directive('mueViewDesigner', function (mueViewDesignerManager, $rootScope) {
            return {
                restrict: 'E',
                templateUrl: 'src/core/components/view-designer/view-designer.directive.html',
                scope: {
                    mueConfiguration: '='
                },
                link: function ($scope) {
                    // mock component data
                    mueViewDesignerManager.registerComponent({
                        type: 'mueViewComponentSimple',
                        url: 'view-component-simple/view-component-simple.html',
                        html: '<mue-view-component-simple mue-configuration="componentConfiguration"></mue-view-component-simple>',
                        properties: {
                            name: 'cardName',
                            label: 'Card name',
                            type: 'string'
                        }
                    });

                    mueViewDesignerManager.registerComponent({
                        type: 'mueViewComponentLayout',
                        url: 'view-component-layout/view-component-layout.html',
                        html: '<mue-view-component-layout mue-configuration="componentConfiguration" mue-components="childComponents"></mue-view-component-layout>'
                    });

                    $scope.componentConfiguration = {
                        isDraggable: true
                    };

                    $scope.components = mueViewDesignerManager.getComponents();

                    $scope.structure = {
                        url: '#/bmc/views/{id}',
                        components: [
                            {
                                type: 'mueViewComponentLayout',
                                url: 'view-component-layout/view-component-layout.html',
                                id: 'views.components.layout.1'
                            },
                            {
                                type: 'mueViewComponentCard',
                                url: 'view-component-card/view-component-card.html',
                                id: 'views.components.card.1',
                                properties: [
                                    {
                                        name: 'cardName',
                                        label: 'Card name',
                                        type: 'string',
                                        expression: 'Hard code expression'
                                    }
                                ]
                            },
                            {
                                type: 'mueViewComponentSimple',
                                id: 'views.components.card.2',
                                url: 'view-component-simple/view-component-simple.html',
                                properties: [
                                    {
                                        name: 'simpleName',
                                        label: 'Simple name',
                                        type: 'string',
                                        expression: '${views.components.card.1.properties.cardName}'
                                    }
                                ]
                            }
                        ],
                        layout: {
                            type: 'mueViewComponentLayout',
                            region: {
                                content: [
                                    {
                                        id: 'views.components.card.1'
                                    },
                                    {
                                        id: 'views.components.card.2'
                                    }
                                ]
                            }
                        }
                    };

                    $rootScope.$on('mueViewLayout:ready', function (scope, data) {
                        data.layout.initComponents($scope.structure);
                    });

                    $rootScope.$on('mueViewLayout:add:before', function (scope, data) {
                        if (data.component.type == 'mueViewComponentCard') {
                            data.deferred.reject();
                        } else {
                            data.deferred.resolve();
                        }
                    });
                }
            }
        });
})();