/**
 * @ngdoc directive
 * @name mue.core.calendar-manager.directive:mueCalendarManager
 * @restrict E
 * @element mue-calendar-manager
 *
 * @description
 *
 *
 <example module="test">

 <file name="index.html">
 <div ng-controller="Test">
 <mue-calendar-manager></mue-calendar-manager>
 </div>
 </file>

 <file name="script.js">
 angular.module('test', ['mue.seed']).controller('Test', function($scope){});
 </file>

 </example>
 */

angular.module('mue.core.calendar-manager')
    .directive('mueCalendarManager', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/calendar-manager/calendar-manager.directive.html',
            link: function (scope, element) {
                scope.title = 'My calendars';

                function _deleteCalendar(){

                }

                function _showMenu(){

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

                scope.listConfig = [
                    {
                        id: '1',
                        active: false,
                        text: 'Birthday',
                        icon: 'desktop',
                        actions: actions
                    },
                    {
                        id: '1',
                        active: false,
                        text: 'Birthday',
                        icon: 'desktop',
                        actions: actions
                    }
                ];
            }
        }
    });