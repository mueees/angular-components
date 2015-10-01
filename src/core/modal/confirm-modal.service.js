(function(){
    angular.module('mue.core.modal').factory('ConfirmModal', function ($modal) {

        function open(data){
            return $modal.open({
                templateUrl: 'src/core/modal/confirm-modal.view.html',
                controller: 'ConfirmModalController',
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });
        }

        return {
            open: open
        }
    });
})();