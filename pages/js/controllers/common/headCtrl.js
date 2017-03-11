/**
 * Created by dyxm on 2017/2/27.
 */
'use strict';
app.controller('headCtrl', ['$rootScope','$scope', '$state', 'User', function ($rootScope,$scope, $state, User) {
    //获取用户信息
    $rootScope.userInfo = User.getUserInfo();

    //前进与后退
    $scope.goBack = function () {
        history.go(-1);
    }
    $scope.goPrev=function(){
        history.forward(1);
    }

    //退出登录
    $scope.logout = function () {
        layer.confirm('您确定退出？', {// time: 0 //不自动关闭
            btn: ['去意已决', '点错了']
        }, function () {
            User.logout().then(function (response) {
                if (response.data.status) {
                    layer.msg(response.data.msg, {time:2000,icon: 1});
                    // layer.alert(response.data.msg, {icon: 6});
                } else {
                    layer.alert('糟糕，网络错误！', {icon: 5});
                }
                $state.go('access.welcome');
            }, function (errorMsg) {
                //layer.alert(errorMsg, {icon: 5});
                $state.go('access.welcome');
            });
        });
    }
}]);
