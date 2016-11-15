/**
 * Created by TeasunKim on 2016-09-12.
 */

var __PatientListCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST) {
    var userObject = store.get('obj');
    $scope.quantity = 4;

    $scope.a_name = userObject.a_name;


    $scope.allPatientListPost = function () {

        $http({
            method: 'POST', //방식
            url: HOST + "/api/getAllPatientList", /* 통신할 URL */
            data: userObject, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) { //존재하지 않음,아이디 사용가능
                    $scope.allPatientList = data;
                    $scope.loadingStyle = {'display': 'none'};
                }
                else {
                    alert('환자가 없습니다.');
                }
            });
    };
    $scope.allPatientListPost();
};

