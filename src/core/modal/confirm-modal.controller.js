(function(){
    angular.module('mue.core.modal').controller('ConfirmModalController', function ($scope, $modalInstance, data) {
        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        _.extend($scope, data);
    });
})();