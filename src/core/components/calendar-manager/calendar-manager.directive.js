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
    .directive('mueCalendarManager', function (MueCalendarResource, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/calendar-manager/calendar-manager.directive.html',
            scope: {
                mueConfig: '='
            },
            link: function (scope, element) {
                scope.title = 'My calendars';

                function deleteHandler() {
                    console.log('delete handler');
                }

                function settingHandler() {
                    console.log('setting handler');
                }

                function clickHandler(item) {
                    item.active = !item.active;

                    _.find(scope.mueConfig.calendars, {
                        _id: item._id
                    }).active = item.active;

                    MueCalendarResource.edit({
                        _id: item._id,
                        active: item.active
                    });
                }

                var actions = [
                    {
                        handler: deleteHandler,
                        icon: 'trash'
                    },
                    {
                        handler: settingHandler,
                        icon: 'gear'
                    }
                ];

                scope.listConfig = {
                    ui: {
                        flat: true,
                        dark: true
                    },
                    clickHandler: clickHandler,
                    items: []
                };

                _.each(scope.mueConfig.calendars, function (calendar) {
                    scope.listConfig.items.push({
                        _id: calendar._id,
                        actions: actions,
                        icon: 'desktop',
                        text: calendar.name,
                        active: calendar.active
                    })
                });

                scope.add = function () {
                    MueCalendarResource.create({
                        name: 'Test name',
                        description: 'Test description'
                    }).then(function () {
                        scope.listConfig.items.push({
                            actions: actions,
                            icon: 'desktop',
                            text: 'Test name',
                            active: false
                        });
                    });
                };

                scope.selectAll = function () {
                    _.each(scope.listConfig.items, function (item) {
                        item.active = true;
                    });

                    _.each(scope.mueConfig.calendars, function (calendar) {
                        calendar.active = true;
                    });
                };

                scope.deselectAll = function () {
                    _.each(scope.listConfig.items, function (item) {
                        item.active = false;
                    });

                    _.each(scope.mueConfig.calendars, function (calendar) {
                        calendar.active = false;
                    });
                };
            }
        }
    });