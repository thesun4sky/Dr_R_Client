/**
 * Created by TeasunKim on 2016-09-12.
 */

var __IndexCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST, Excel, $timeout) {
    var userObject = store.get('obj');
    $scope.quantity = 4;
    $scope.selected_u_name ="";
    $scope.loadingStyle = {'display': 'block'};
    $scope.showType = "list";
    $scope.a_name = userObject.a_name;

    $scope.dateTime = function(date) {
        date = date.toString();
        d = (date.split(' ')[0]);
        d = (d.split('-')[1] + "월" + d.split('-')[2] + "일");
        return d;
    };

    $scope.timeSplit = function(mill) {
        var str = "";
        h = parseInt(mill/360);
        if(h > 0) str += h + "시간 ";
        mill = mill%360;
        m = parseInt(mill/60);
        if(m > 0) str += m + "분 ";
        s = mill%60;
        return str+s+"초";
    };

    $scope.patientListPost = function () {

        $http({
            method: 'POST', //방식
            url: HOST + "/web/api/getAllPatientList", /* 통신할 URL */
            data: userObject, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) { //존재하지 않음,아이디 사용가능
                    console.log(data);
                    $scope.patientList = data;
                    $scope.loadingStyle = {'display': 'none'};
                }
                else {
                    alert('환자가 없습니다.');
                }
            });
    };

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
                    console.log(data);
                    $scope.check_List = data;
                    $scope.loadingStyle = {'display': 'none'};
                    $scope.sleepListPost(u_id,u_name);
                    $scope.feedListPost(u_id,u_name);
                }
                else {

                }
            });
    };


    $scope.sleepListPost = function (u_id,u_name) {
        $scope.selected_u_name = u_name;
        $scope.loadingStyle = {'display': 'block'};
        var patientObject = {
            u_id : u_id
        };

        $http({
            method: 'POST', //방식
            url: HOST + "/web/diary/getSleepList", /* 통신할 URL */
            data: patientObject, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) { //존재하지 않음,아이디 사용가능
                    $scope.sleep_List = data;
                    $scope.loadingStyle = {'display': 'none'};
                }
                else {

                }
            });
    };


    $scope.feedListPost = function (u_id,u_name) {
        $scope.selected_u_name = u_name;
        $scope.loadingStyle = {'display': 'block'};
        var patientObject = {
            u_id : u_id
        };

        $http({
            method: 'POST', //방식
            url: HOST + "/web/diary/getFeedList", /* 통신할 URL */
            data: patientObject, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) { //존재하지 않음,아이디 사용가능
                    $scope.feed_List = data;
                    $scope.loadingStyle = {'display': 'none'};
                }
                else {

                }
            });
    };

    $scope.showList = function () {
        $scope.showType = 'list';
    };

    $scope.showGraph = function () {
        $scope.showType = 'graph';
    };


    $scope.patientListPost();


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

