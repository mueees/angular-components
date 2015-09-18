(function () {
    angular.module('mue.view-designer')
        .factory('mueViewDesignerManager', function ($templateCache) {
            var _components = [],
                _layouts = [];

            function registerLayout(layout) {
                _layouts.push(layout);
            }

            function registerComponent(component) {
                $templateCache.put(component.url, component.html);

                _components.push(component);
            }

            function getComponents(){
                return _components;
            }

            return {
                registerComponent: registerComponent,
                getComponents: getComponents,
                registerLayout: registerLayout
            }
        });
})();