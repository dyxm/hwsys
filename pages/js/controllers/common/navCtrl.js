/**
 * Created by dyxm on 2017/2/27.
 */
'use strict';
app.controller('navCtrl', ['$rootScope', '$scope', 'Homework', function ($rootScope, $scope, Homework) {
    //获取新作业总数
    Homework.getHomeworkCount(0).then(function (response) {
        $rootScope.newHomeworkCount = response.homeworkCount;
    });

}]);
