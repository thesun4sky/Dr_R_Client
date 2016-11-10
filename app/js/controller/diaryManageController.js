/**
 * Created by TeasunKim on 2016-09-12.
 */

var __DiaryManageCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST) {
    var userObject = store.get('obj');
    $scope.quantity = 4;

    $scope.u_name = userObject.u_name;
};

