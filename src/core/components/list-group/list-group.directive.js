/**
 * @ngdoc directive
 * @name mue.core.list-group:mueListGroup
 * @restrict E
 * @element mue-list-group
 *
 * @description
 * Test
 *
 *
 <example module="test">

 <file name="index.html">
 <div ng-controller="Test">
 <mue-list-group mue-config='config'></mue-list-group>
 </div>
 </file>

 <file name="script.js">
 angular.module('test', ['mue.core.list-group']).controller('Test', function($scope){

    function _deleteCalendar(item) {
            _.remove($scope.config.items, function (n) {
                return n.id == item.id;
            });
        }

        function _showMenu(item) {
            alert(item.text + ' showMenu');
        }

        var actions = [
            {
                icon: 'trash',
                handler: _deleteCalendar
            },
            {
                icon: 'gear',
                handler: _showMenu
            }
        ];

    $scope.config = $scope.config = {
            clickHandler: function (item) {
                item.active = !item.active;
            },

            items: [
                {
                    id: '1',
                    active: false,
                    text: 'Birthday',
                    icon: 'desktop',
                    actions: actions
                },
                {
                    id: '2',
                    active: true,
                    text: 'Holiday',
                    icon: 'trash'
                }
            ],
            ui: {
                flat: true,
                dark: true
            }
        };
 });
 </file>

 </example>
 */

angular.module('mue.core.components.list-group')
    .directive('mueListGroup', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/list-group/list-group.directive.html',
            scope: {
                mueConfig: '='
            }
        }
    });