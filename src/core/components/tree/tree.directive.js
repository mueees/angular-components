angular.module('mue.tree')
    .controller('Test', function ($scope) {
        $scope.row = [
            {
                'id': 1,
                'title': 'node1',
                'nodes': [
                    {
                        'id': 11,
                        'title': 'node1.1',
                        'nodes': [
                            {
                                'id': 111,
                                'title': 'node1.1.1',
                                'nodes': []
                            }
                        ]
                    },
                    {
                        'id': 12,
                        'title': 'node1.2',
                        'nodes': []
                    }
                ]
            }
        ]
    })
    .controller('MueTreeController', function ($scope, $element) {
        this.scope = $scope;

        $scope.$nodesScope = null; // root nodes

        // Check if it's a empty tree
        $scope.isEmpty = function () {
            return ($scope.$nodesScope && $scope.$nodesScope.$modelValue
            && $scope.$nodesScope.$modelValue.length === 0);
        };
    })
    .controller('MueTreeNodesController', function ($scope, $element) {
        this.scope = $scope;

        $scope.$nodeScope = null; // the scope of node which the nodes belongs to
    })
    .directive('mueTree', function () {
        return {
            restrict: 'A',
            scope: true,
            controller: 'MueTreeController',
            link: function (scope, element, attrs, ctrl) {
                scope.$watch('$nodesScope.$modelValue.length', function () {
                    if (!scope.$nodesScope.$modelValue) {
                        return;
                    }

                    ctrl.resetEmptyElement();
                }, true);
            }
        }
    })
    .directive('mueTreeNodes', function () {
        return {
            require: ['ngModel', '?^mueTreeNode', '^mueTree'],
            restrict: 'A',
            scope: true,
            controller: 'MueTreeNodesController',
            link: function (scope, element, attrs, controllersArr) {
                var ngModel = controllersArr[0],
                    treeNodeCtrl = controllersArr[1],
                    treeCtrl = controllersArr[2];

                if (treeNodeCtrl) {
                    treeNodeCtrl.scope.$childNodesScope = scope;
                    scope.$nodeScope = treeNodeCtrl.scope;
                } else {
                    // find the root nodes if there is no parent node and have a parent mue-tree
                    treeCtrl.scope.$nodesScope = scope;
                }

                scope.$treeScope = treeCtrl.scope;

                if (ngModel) {
                    ngModel.$render = function () {
                        scope.$modelValue = ngModel.$modelValue;
                    };
                }
            }
        }
    });