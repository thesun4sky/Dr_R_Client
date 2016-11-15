/**
 * Created by TeasunKim on 2016-09-12.
 */

var __DiaryCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST) {
    var userObject = store.get('obj');
    $scope.quantity = 4;

    $scope.a_name = userObject.a_name;

    $scope.toDiary = function(list_id) {  //상세보기
        $rootScope.list_id = list_id;
        $state.go("diaryDetail");
    }
};

