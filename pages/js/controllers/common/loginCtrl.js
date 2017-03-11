/**
 * @“登录”控制器
 * @作者：dyxm
 * @创建时间：2017-01-11
 */
'use strict';

/* loginCtrl */
app.controller('loginCtrl', ['$scope', '$state', '$rootScope', '$localStorage', 'User', function ($scope, $state, $localStorage, $rootScope, User) {
    $scope.user = {};
    $scope.stu = {};
    $scope.teac = {};
    $scope.admin = {};
    $scope.authError = null;
    $scope.stuLogin = function () {
        $scope.user = $scope.stu;
        $scope.login();
    };
    $scope.teacLogin = function () {
        $scope.user = $scope.teac;
        $scope.login();
    };
    $scope.adminLogin = function () {
        $scope.user = $scope.admin;
        $scope.login();
    };
    $scope.login = function () {
        $scope.authError = null;
        User.login($scope.user)
            .then(function (response) {
                if (!response.data.status) {
                    $scope.authError = response.data.msg;
                } else {
                    layer.msg('欢迎回来' + response.data.userInfo.name, {time:2000,icon: 6});
                    //学生跳转
                    if(response.data.userInfo.type=='Student'){
                        $state.go('student');
                    }
                    //教师跳转
                    if(response.data.userInfo.type=='Teacher'){
                        $state.go('teacher');
                    }
                    //管理员跳转
                    if(response.data.userInfo.type=='Admin'){

                    }
                }
            }, function (errorMsg) {
                $scope.authError = errorMsg;
            });
    };
}]);