'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$localStorage', '$window', '$rootScope', '$state','$location', 'User',
        function ($scope, $localStorage, $window, $rootScope, $state, $location,User) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            //配置异步访问根目录
            $rootScope.rootURL = 'http://127.0.0.1:82/PHPworkplace/hwsys/api';
            
            // 配置
            $scope.app = {
                name: '作业管理系统',
                version: '0.0.1',
                // 图表颜色
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                // 全局样式
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-black',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-black',
                    //arrowColor:'arrow-primary',
                    headerFixed: true,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            }

            // 将全局样式配置保存至localStorage
            if (angular.isDefined($localStorage.settings)) {
                $scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }
            // 监听全局样式配置变化
            $scope.$watch('app.settings', function () {
                if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                    // aside dock and fixed must set the header fixed.
                    $scope.app.settings.headerFixed = true;
                }
                // save to local storage
                $localStorage.settings = $scope.app.settings;
            }, true);

            //查看是否登录
            if(User.isLogin()){
                if(!$scope.userInfo){
                    $scope.userInfo=User.getUserInfo();
                }
            }else{
                $location.path('access/welcome');
            }

            //当路由变化时检验是否登录及访问权限验证
            $rootScope.$on('$stateChangeStart', function (event, toState, fromState, fromParams) {
                // 未登录时允许进入欢迎页、登录页、找回密码页
                if (!User.hasAuth(toState.name)) {
                    event.preventDefault();// 取消默认跳转行为
                    layer.alert('您无权访问此页面！如果还未登陆，请登录后再试！'+toState.name, {icon: 5});
                    //隐藏等待条
                    event.targetScope.$watch('$viewContentLoaded', function(){
                        $('.butterbar ').addClass('hide').removeClass('active');
                    });
                    if (!User.isLogin()) {
                        $state.go('access.login');//未登录时跳转到登录界面
                    } else {
                        $state.go(fromParams.name);//已登录时返回原界面
                    }
                } else if (User.isLogin() && (toState.name == 'access.welcome'||toState.name == 'access.login'||toState.name == 'access.forgotPwd')) {
                    event.preventDefault();
                    layer.alert('检测到您已登录！', {icon: 6});
                    //隐藏等待条
                    event.targetScope.$watch('$viewContentLoaded', function(){
                        $('.butterbar ').addClass('hide').removeClass('active');
                    });
                    if($scope.userInfo.type=='stu'){
                        $location.path('student/myHomework')
                    }
                    //教师跳转
                    if($scope.userInfo.type=='teac'){

                    }
                    //管理员跳转
                    if($scope.userInfo.type=='admin'){

                    }
                }
            });

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

        }]);