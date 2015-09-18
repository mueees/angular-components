/**
 * @ngdoc directive
 * @name mue.view-designer.directive:mueViewLayout
 * @restrict E
 * @element mueViewLayout
 *
 * @description
 * Manage layouts
 */
angular.module('mue.view-designer')
    .directive('mueViewLayout', function ($rootScope, $q, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                structure: '='
            },
            templateUrl: 'src/core/components/view-designer/view-layout/view-layout.directive.html',
            link: function ($scope, element) {
                function Layout() {
                    var that = this;

                    this._components = [];

                    this.tree = {};

                    this.getComponents = function () {
                        return this._components;
                    };

                    this.getTree = function () {
                        return this.tree;
                    };

                    this.add = function (component) {
                        this._components.push(component);
                    };

                    this.initComponents = function (structure) {
                        $timeout(function () {
                            structure.components.forEach(function (component) {
                                that.add(component);
                            });
                        });
                    }
                }

                var layout = new Layout();

                $scope.components = layout.getComponents();

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
                    var deferred = $q.defer(),
                        component = {
                            type: e.dataTransfer.getData('component:type'),
                            url: e.dataTransfer.getData('component:url'),
                            html: e.dataTransfer.getData('component:html')
                        };

                    deferred.promise.then(function () {
                        $timeout(function () {
                            layout.add(component);
                        });
                    }, function () {

                    });

                    $rootScope.$broadcast('mueViewLayout:add:before', {
                        component: component,
                        layout: layout,
                        deferred: deferred
                    });
                });

                $rootScope.$broadcast('mueViewLayout:ready', {
                    layout: layout
                });
            }
        }
    });