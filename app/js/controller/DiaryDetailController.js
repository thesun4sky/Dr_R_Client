/**
 * Created by TeasunKim on 2016-09-12.
 */

var __DiaryDetailCtrl = function ($interval, $scope, $http, store, $state, $uibModal, $rootScope, $filter, HOST) {
    var userObject = store.get('obj');
    $scope.list_id = $rootScope.list_id ;
    $scope.loadingStyle = {'display':'block'};
    var diaryObject = {
        list_id: $scope.list_id
    };

    $scope.diaryDetailPost = function () {
        $http({
            method: 'POST', //방식
            url: HOST + "/diary/getDiary", /* 통신할 URL */
            data: diaryObject, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) { //존재하지 않음,아이디 사용가능
                    $scope.breakfast = data.c_breakfast;
                    $scope.lunch = data.c_lunch;
                    $scope.dinner = data.c_dinner;
                    $scope.temperature = data.c_temperature;
                    $scope.humid = data.c_humid;
                    $scope.sleepTime = data.c_sleepTime;
                    $scope.bloodPressure = data.c_bloodPressure;
                    $scope.drinking = data.c_drinking;

                    $scope.loadingStyle = {'display':'none'};
                }
                else {

                }
            });
    };
    $scope.diaryDetailPost();
    $scope.u_name = userObject.u_name;
};

