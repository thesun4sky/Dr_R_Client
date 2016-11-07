/**
 * Created by TeasunKim on 2016-09-12.
 */


var __LoginCtrl = function ($scope, $http, store, $state, $filter, $interval, $rootScope) {
    $scope.login = [{
        login_id: "", password: ""
    }];

    $scope.logout = function () {

        $http({
            method: 'POST', //방식
            url: "/user/logOut", /* 통신할 URL */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                alert("logout success");
                store.set('obj', null);
                $state.go('login');
            })
            .error(function () {
                alert("logout error");
            });
    };

    $scope.loginPost = function () {
        var loginObject = {
            login_id: $scope.login.login_id,
            password: $scope.login.password
        };
        var myInfo = {
            login_id: "dd",
            user_id: "add",
            login_time: '2016-11-07 10-34-12',
            updated_time: '2016-11-07 10-34-12'
        };
        store.set('obj', myInfo);
        $rootScope.checkedTime = '2016-11-07 10-34-12';
        $state.go('main');
       /* $http({
            method: 'POST', //방식
            url: "/user/login", /!* 통신할 URL *!/
            data: loginObject, /!* 파라메터로 보낼 데이터 *!/
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                if (data) {
                    if (data.msg != 'fales') {
                        var myInfo = {
                            login_id: data.msg,
                            user_id: data.result,
                            login_time: $filter('date')(new Date(), 'yyyy-MM-dd HH-mm-ss'),
                            updated_time: data.updated_time
                        };

                        store.set('obj', myInfo);
                        $rootScope.checkedTime = $filter('date')(new Date(), 'yyyy-MM-dd HH-mm-ss');
                        $state.go('main');
                        /!* 맞음 *!/
                    }
                    else {
                        console.log('login_fail');
                        alert("아이디 혹은 패스워드를 다시 확인하세요.")
                        /!* 틀림 *!/
                    }
                }
                else {
                    console.log('에러에러에러');
                }
            })
            .error(function (data, status, headers, config) {
                /!* 서버와의 연결이 정상적이지 않을 때 처리 *!/
                console.log(status);
            });*/
    };
};

