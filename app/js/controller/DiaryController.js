/**
 * Created by TeasunKim on 2016-09-12.
 */

var __DiaryCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST, Excel) {
    var userObject = store.get('obj');
    $scope.loadingStyle = {'display': 'block'};
    $scope.quantity = 4;

    $scope.a_name = userObject.a_name;
    $scope.a_id = userObject.a_id;

    $scope.dateTime = function(date) {
        date = date.toString();
        d = (date.split(' ')[0]);
        h = (date.split(' ')[1].split(':')[0]);
        m = (date.split(' ')[1].split(':')[1].split(':')[0]);
        return d+"\n["+h+":"+m+"]";
    };

    $scope.allDiaryListPost = function () {
        $scope.loadingStyle = {'display': 'block'};
        var doctorObject = {
            a_id : $scope.a_id
        };

        $http({
            method: 'POST', //방식
            url: HOST + "/web/diary/allDiaryListPost", /* 통신할 URL */
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

    $scope.showImg=function(url) {
        url = "/storedimg/" + url;
        window.open(url,'Image','width=500px,height=500px,resizable=1');
    }
};

