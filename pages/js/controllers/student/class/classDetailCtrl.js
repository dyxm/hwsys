/**
 * @“班级详情”控制器
 * @作者：dyxm
 * @创建时间：2017-03-1
 */
'use strict';
app.controller('classDetailCtrl', ['$rootScope', '$scope', '$state','classData', function ($rootScope, $scope, $state,classData) {
    $scope.class=classData.class;
    $scope.students=classData.students;
    // $scope.groups=classData.groups;
    console.log(classData)
}]);
