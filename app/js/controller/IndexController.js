/**
 * Created by TeasunKim on 2016-09-12.
 */

var __IndexCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST, Excel, $timeout) {
    var userObject = store.get('obj');
    $scope.quantity = 4;
    $scope.selected_u_name ="";
    $scope.loadingStyle = {'display': 'block'};

    $scope.a_name = userObject.a_name;

    $scope.dateTime = function(date) {
        date = date.toString();
        d = (date.split(' ')[0]);
        h = (date.split(' ')[1].split(':')[0]);
        m = (date.split(' ')[1].split(':')[1].split(':')[0]);
        return d+"\n["+h+":"+m+"]";
    };

    $scope.patientListPost = function () {

        $http({
            method: 'POST', //방식
            url: HOST + "/web/api/getPatientList", /* 통신할 URL */
            data: userObject, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) { //존재하지 않음,아이디 사용가능
                    $scope.patientList = data;
                    $scope.loadingStyle = {'display': 'none'};
                }
                else {
                    alert('환자가 없습니다.');
                }
            });
    };
    $scope.patientListPost();


    $scope.diaryListPost = function (u_id,u_name) {
        $scope.selected_u_name = u_name;
        $scope.loadingStyle = {'display': 'block'};
        var patientObject = {
            u_id : u_id
        };

        $http({
            method: 'POST', //방식
            url: HOST + "/web/diary/getDiaryList", /* 통신할 URL */
            data: patientObject, /* 파라메터로 보낼 데이터 */
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
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
        var exportHref=Excel.tableToExcel(tableId,$scope.selected_u_name+" 환자");
        // $timeout(function(){location.href=exportHref;},100); // trigger download
        var a = document.createElement('a');
        a.href=exportHref;
        a.download = $scope.selected_u_name+" 환자 일지.xls";
        a.click();
    };


    $scope.showImg=function(url) {
        url = "/storedimg/" + url;
        window.open(url,'Image','width=500px,height=500px,resizable=1');
    }

};

