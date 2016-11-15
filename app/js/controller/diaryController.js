/**
 * Created by TeasunKim on 2016-09-12.
 */

var __DiaryCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST, Excel) {
    var userObject = store.get('obj');
    $scope.loadingStyle = {'display': 'block'};
    $scope.quantity = 4;

    $scope.a_name = userObject.a_name;
    $scope.a_id = userObject.a_id;

    $scope.allDiaryListPost = function () {
        $scope.loadingStyle = {'display': 'block'};
        var doctorObject = {
            a_id : $scope.a_id
        };

        $http({
            method: 'POST', //방식
            url: HOST + "/diary/allDiaryListPost", /* 통신할 URL */
            data: doctorObject, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) { //존재하지 않음,아이디 사용가능
                    $scope.check_List = data;
                    $scope.loadingStyle = {'display': 'none'};
                }
                else {

                }
            });
    };
    $scope.allDiaryListPost();
    
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
        var exportHref=Excel.tableToExcel(tableId,"전체 환자");
        // $timeout(function(){location.href=exportHref;},100); // trigger download
        var a = document.createElement('a');
        a.href=exportHref;
        a.download = "전체 환자 일지.xls";
        a.click();
    };
};

