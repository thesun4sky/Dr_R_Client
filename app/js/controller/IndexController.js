/**
 * Created by TeasunKim on 2016-09-12.
 */

var __IndexCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter) {
    var userObject = store.get('obj');
    $scope.quantity = 4;

    $scope.u_name = userObject.u_name;
};

