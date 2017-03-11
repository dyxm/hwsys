/**
 * @“我的作业”控制器
 * @作者：dyxm
 * @创建时间：2017-01-5
 */
'use strict';

app.controller('myHomeworkCtrl', ['$scope','$state','Homework','homeworkList', function($scope,$state,Homework,homeworkList) {
    $scope.newHomeworks = homeworkList.homeworks;
    $scope.maxSize = 5;//分页的长度
    $scope.totalItems = homeworkList.totalCount;//总记录数
    $scope.perPage = homeworkList.perPage;//每页多少记录
    $scope.currentPage = 1;//当前页
    // $scope.numPages=1;
    $scope.pageChanged = function () {
        Homework.getHomeworks(0, $scope.currentPage).then(function (response) {
            console.log($scope.currentPage);
            $scope.newHomeworks = response.data.homeworks;
        }, function () {
            layer.alert('啊哦，出错了！', {icon: 5});
        });
    }
}]);