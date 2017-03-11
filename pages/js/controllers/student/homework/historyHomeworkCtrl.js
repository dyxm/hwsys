/**
 * @“历史作业列表”控制器
 * @作者：dyxm
 * @创建时间：2017-01-5
 */
'use strict';

app.controller('historyHomeworkCtrl', ['$scope','Homework', 'historyHomeworks', function ($scope, Homework, historyHomeworks) {
    $scope.homeworks = historyHomeworks.homeworks;

    $scope.maxSize = 5;//分页的长度
    $scope.totalItems = historyHomeworks.totalCount;//总记录数
    $scope.perPage = historyHomeworks.perPage;//每页多少记录
    $scope.currentPage = 1;//当前页
    // $scope.numPages=1;
    $scope.pageChanged = function () {
        Homework.getHomeworks(0, $scope.currentPage).then(function (response) {
            $scope.homeworks = response.data.homeworks;
        }, function () {
            layer.alert('啊哦，出错了！', {icon: 5});
        });
    }
}]);
