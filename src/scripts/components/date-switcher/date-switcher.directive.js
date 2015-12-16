/**
 * @ngdoc directive
 * @name mue.core.date-switcher.directive:mueDateSwitcher
 * @restrict E
 * @element mue-date-switcher
 *
 * @description
 * Test
 *
 *
 <example module="test">

 <file name="index.html">
 <div ng-controller="Test">
 <mue-date-switcher mue-config="config"></mue-date-switcher>
 </div>
 </file>

 <file name="script.js">
 angular.module('test', ['mue.core.date-switcher']).controller('Test', function($scope){
     $scope.config = {
            type: 2,
            start: new Date(),
            end: moment(new Date()).add(5, 'd').toDate()
        };
 });
 </file>

 </example>
 */

angular.module('mue.core.components.date-switcher')
    .directive('mueDateSwitcher', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/core/components/date-switcher/date-switcher.directive.html',
            scope: {
                mueConfig: '='
            },
            link: function (scope, element) {
                scope.today = function () {
                    switch (scope.mueConfig.type) {
                        case 1:
                            scope.mueConfig.start = new Date();
                            break;
                        case 2:
                            var period = _getPeriod();
                            scope.mueConfig.start = new Date();
                            scope.mueConfig.end = moment(new Date()).add(period, 'd').toDate();
                            break;
                    }
                };

                function _getPeriod() {
                    return Math.floor((scope.mueConfig.end - scope.mueConfig.start) / (1000 * 60 * 60 * 24));
                }

                scope.prev = function () {
                    var period = _getPeriod();

                    switch (scope.mueConfig.type) {
                        case 1:
                            scope.mueConfig.start = moment(scope.mueConfig.start).add(-1, 'd').toDate();
                            break;
                        case 2:
                            scope.mueConfig.start = moment(scope.mueConfig.start).add(-period, 'd').toDate();
                            scope.mueConfig.end = moment(scope.mueConfig.end).add(-period, 'd').toDate();
                            break;
                    }
                };

                scope.next = function () {
                    var period = _getPeriod();

                    switch (scope.mueConfig.type) {
                        case 1:
                            scope.mueConfig.start = moment(scope.mueConfig.start).add(1, 'd').toDate();
                            break;
                        case 2:
                            scope.mueConfig.start = moment(scope.mueConfig.start).add(period, 'd').toDate();
                            scope.mueConfig.end = moment(scope.mueConfig.end).add(period, 'd').toDate();
                            break;
                    }
                };

                scope.isDisabled = function () {
                    var isDisabled = true,
                        startMoment = moment(scope.mueConfig.start);

                    switch (scope.mueConfig.type) {
                        case 1:
                            isDisabled = (startMoment.format('DD') == moment(new Date()).format('DD'));
                            break;
                        case 2:
                            isDisabled = (startMoment.format('DD') == moment(new Date()).format('DD'));
                            break;
                    }

                    return isDisabled;
                };

                scope.dateViewerConfiguration = scope.mueConfig;
            }
        }
    });