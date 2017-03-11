/**
 * @任务详情
 * @作者：dyxm
 * @创建时间：2017-03-10
 */
'use strict';
app.controller('taskDetailCtrl', ['$scope', 'Task','taskData', function ($scope, Task, taskData) {
    $scope.task=taskData.task;
    $scope.others=taskData.uploadInfo;
    if($scope.task){
        var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var day = new Date($scope.task.deadline);
        $scope.week = weekArray[day.getDay()];
    }

    //评阅


    //催交


    //打包


}]);