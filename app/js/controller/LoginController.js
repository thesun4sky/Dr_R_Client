/**
 * Created by TeasunKim on 2016-09-12.
 */


var __LoginCtrl = function ($scope, $http, store, $state, $filter, $interval, $rootScope, HOST) {
    $scope.login = [{
        login_id: "", password: ""
    }];

    $scope.logout = function () {
        //
        // $http({
        //     method: 'POST', //방식
        //     url: "/user/logOut", /* 통신할 URL */
        //     headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        // })
        //     .success(function (data, status, headers, config) {
                alert("로그아웃 되었습니다.");
                store.set('obj', null);
                $state.go('login');
            // })
            // .error(function () {
            //     alert("logout error");
            // });
    };

    $scope.loginPost = function () {
        var loginObject = {
            e_mail: $scope.login.login_id,
            a_password: $scope.login.password
        };
       $http({
            method: 'POST', //방식
            url: HOST + "/user/login",
            data: loginObject,
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {

                if (data.num == 1) {
                        var myInfo = {
                            a_name: data.msg,
                            login_time: $filter('date')(new Date(), 'yyyy-MM-dd HH-mm-ss')
                        };

                        store.set('obj', myInfo);
                        $rootScope.checkedTime = $filter('date')(new Date(), 'yyyy-MM-dd HH-mm-ss');
                        $state.go('main');
                    }
                    else {
                    alert(data.msg);
                     }

            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    };
};

