/**
 * Created by TeasunKim on 2016-09-12.
 */

var __PatientListCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST, Excel) {
    var userObject = store.get('obj');
    $scope.quantity = 4;
    $scope.numDiary = 0;
    $scope.loading = true;
    $scope.a_name = userObject.a_name;
    $scope.loadingStyle = {'display': 'block'};


    $scope.allPatientListPost = function () {

        $http({
            method: 'POST', //방식
            url: HOST + "/api/getPatientList", /* 통신할 URL */
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


    $scope.diaryListPost = function (u_id,u_name) {
        $scope.selected_u_name = u_name;
        $scope.u_id = u_id;
        $scope.loading = true;
        $scope.loadingStyle = {'display': 'block'};
        var patientObject = {
            u_id : u_id
        };

        $http({
            method: 'POST', //방식
            url: HOST + "/diary/getDiaryList", /* 통신할 URL */
            data: patientObject, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) { //존재하지 않음,아이디 사용가능
                    $scope.check_List = data;
                    $scope.numDiary = $scope.check_List.length;
                    $scope.loading = false;
                    $scope.loadingStyle = {'display': 'none'};
                }
                else {

                }
            });
    };
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
        var exportHref=Excel.tableToExcel(tableId,$scope.selected_u_name+" 환자");
        // $timeout(function(){location.href=exportHref;},100); // trigger download
        var a = document.createElement('a');
        a.href=exportHref;
        a.download = $scope.selected_u_name+" 환자 일지.xls";
        a.click();
    };

};

