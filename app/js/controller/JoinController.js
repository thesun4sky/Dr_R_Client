/**
 * Created by TeasunKim on 2016-09-12.
 */


var __JoinCtrl = function ($scope, $http, $state, HOST) {
    var checkedId = "";
    $scope.join = [{
        login_id: "", password: "", passwordck: "", name: "", hospital: ""
    }];

    $scope.idCheck = function (id) {
        if(!id) alert("알맞은 이메일을 입력하세요.");
        else{
        $http({
            method: 'POST', //방식
            url: HOST + "/user/checkID", /* 통신할 URL */
            data: {login_id: id}, /* 파라메터로 보낼 데이터 */
            headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
        })
            .success(function (data, status, headers, config) {
                    if (data) { //존재하지 않음,아이디 사용가능
                        checkedId = id;
                        alert('"' + id + '"' + '는 사용 가능합니다.');
                        /* 맞음 */
                    }
                    else {
                        alert('"' + id + '"' + '는 사용 불가능합니다.');
                            $scope.join.login_id = "";
                        console.log('아이디 사용 불가');
                        /* 틀림 */
                    }
            })
        }
    };

    $scope.joinPost = function () {
        var joinObject = {
            login_id: $scope.join.login_id,
            u_password: $scope.join.password,
            u_name: $scope.join.name,
            u_hospital: $scope.join.hospital
        };


        if (checkedId != joinObject.login_id) {
            alert('아이디를 중복 체크 해주세요!!');
        }
        else {

            if ($scope.join.password != $scope.join.passwordck) {
                alert('비밀번호가 틀립니다.');
                $scope.join.password = "";
                $scope.join.passwordck = "";
            }
            else {
                $http({
                    method: 'POST', //방식
                    url: HOST + "/user/join", /* 통신할 URL */
                    data: joinObject, /* 파라메터로 보낼 데이터 */
                    headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
                })
                    .success(function (data, status, headers, config) {
                        if (data) {
                            alert("계정이 등록되었습니다.");
                            $state.go('re_login');
                            /* 맞음 */
                        }
                        else {
                            console.log('join_fail');
                            /* 틀림 */
                        }
                    })
                    .error(function (data, status, headers, config) {
                        /* 서버와의 연결이 정상적이지 않을 때 처리 */
                        console.log(status);
                    });
            }
        }
    }
};
