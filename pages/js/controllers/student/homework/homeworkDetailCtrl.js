/**
 * @“作业详情”控制器
 * @作者：dyxm
 * @创建时间：2017-01-5
 */
'use strict';
app.controller('homeworkDetailCtrl', ['$rootScope', '$scope', '$state', '$filter', 'Homework', 'homework',
    function ($rootScope, $scope, $state, $filter, Homework, homework) {
        $scope.homework = homework.homeworkInfo;
        $scope.others = homework.uploadInfo;

        if ($scope.homework) {
            //获取星期
            var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            var day = new Date($scope.homework.deadline);
            $scope.week = weekArray[day.getDay()];

            //时间转换
            //是否过截止日期
            $scope.homework.create_date=new Date($scope.homework.create_date).getTime();
            $scope.homework.deadline=new Date($scope.homework.deadline).getTime();
            $scope.isDeadline = new Date().getTime() > $scope.homework.deadline;
            if($scope.homework.upload_date){
                $scope.homework.upload_date = new Date($scope.homework.upload_date).getTime();
            }
        }


        //上交按钮使能
        $scope.isFileEmpty = true;
        $scope.fileChange = function () {
            $scope.isFileEmpty = document.querySelector('input[type=file]').files[0] ? false : true;
            $scope.$apply();
        }

        //上交作业
        $scope.uplaodHomework = function () {
            var file = document.querySelector('input[type=file]').files[0];
            Homework.uploadHomework($scope.homework.homework_id, file).then(function (response) {
                if (response.data.status) {
                    layer.msg('上交成功！', {icon: 1});
                    $rootScope.newHomeworkCount--;
                    $scope.homework = response.data.homework;
                } else {
                    layer.msg(response.data.msg, {icon: 2});
                }
            });
        }

        //重交作业
        $scope.reSend = function () {
            layer.confirm('重交将覆盖原先的文件，是否继续？', {
                btn: ['是的', '取消']
            }, function () {
                $scope.homework.status = 0;
                $scope.isFileEmpty = true;
                $scope.$apply();
                layer.closeAll();
            });
        }

        //修改作业公开/不公开状态
        $scope.changeProperty = function ($index, $homework_id, $is_open) {
            $is_open = ($is_open == 0) ? 1 : 0;
            Homework.changeHomeworkProperty($homework_id, $is_open).then(function (response) {
                if (response.data.status) {
                    layer.msg(response.data.msg, {time: 2000, icon: 1});
                    $scope.others[$index]['is_open'] = $is_open;
                } else {
                    layer.msg(response.data.msg, {time: 2000, icon: 2});
                }
            })
        }
    }]);
