/**
 * Created by 이호세아 on 2016-05-17.
 */

angular.module("homeApp", [
    'chart.js',
    'ngAnimate',
    'ui.router',
    'ngFileUpload',
    'angular-storage',
    'ui.bootstrap',
    'angular-jqcloud',
    'ui.bootstrap.alert',
    'angular-confirm',
    'duScroll'
])

    .config(function (storeProvider) {
        storeProvider.setStore('sessionStorage');
    })
    .controller("findPASSCtrl", __FindPassCtrl)
    .controller("joinCtrl", __JoinCtrl)
    .controller("leftSideBarCtrl", __LeftSidebarCtrl)
    .controller("loginCtrl", __LoginCtrl)
    .controller("indexCtrl", __IndexCtrl)


    .controller('scroll', function ($scope, $document) {
            $scope.toTheTop = function () {
                $document.scrollTopAnimated(0, 5000).then(function () {
                    console && console.log('You just scrolled to the top!');
                });
            }
            var section3 = angular.element(document.getElementById('section-3'));
            $scope.toSection3 = function () {
                $document.scrollToElementAnimated(section3);
            }
        }
    ).value('duScrollOffset', 30)

    .run(function ($rootScope, $state, store) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;
            if (requireLogin && store.get('obj') == null) {
                event.preventDefault();
                $state.go('login');
            }
        });
    })

    .filter('unique', function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            return output;
        };
    })

    //게시물을 end 숫자 까지 잘라서 보여줌
    .filter('slice', function () {
        return function (arr, start, end) {
            return arr.slice(start, end);
        };
    })

    //스크롤 이벤트가 필요한 부분만 추가한다.
    .directive("scroll", function ($window) {
        return function (scope, element, attrs) {
            angular.element($window).bind("scroll", function () {

                var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                var body = document.body, html = document.documentElement;
                var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                var windowBottom = windowHeight + window.pageYOffset;
                if (windowBottom >= docHeight) {
                    scope.quantity = scope.quantity + 4;
                }
                scope.$apply();
            });
        };
    })

    //윈도우 크기 재구성
    .directive('resize', function ($window) {
        return function (scope, element) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.style = function () {
                    return {
                        'height': (newValue.h - 100) + 'px',
                        'width': (newValue.w - 100) + 'px'
                    };
                };

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
    })



    // 댓글 엔터 입력 처리
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })

    .constant('HOST', 'http://localhost:8080')

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'login.html',
                controller: 'loginCtrl',
                controllerAs: 'loginCtrl',
                data: {
                    requireLogin: false
                }
            })

            .state('login1', {
                url: '/',
                templateUrl: 'login.html',
                controller: 'loginCtrl',
                controllerAs: 'loginCtrl',
                data: {
                    requireLogin: false
                }
            })

            .state('main', {
                url: '/main',
                templateUrl: 'main.html',
                controller: 'indexCtrl',
                controllerAs: 'index',
                data: {
                    requireLogin: true
                }
            });

        $urlRouterProvider.otherwise('/');
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    });




