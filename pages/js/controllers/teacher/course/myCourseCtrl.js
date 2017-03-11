/**
 * Created by dyxm on 2017/3/11.
 */
'use strict';
app.controller('myCourseCtrl', ['$rootScope', '$scope', '$stateParams','Course', 'coursesData',
    function ($rootScope, $scope, $stateParams, Course, coursesData) {
    $scope.courses = coursesData.courses;

    $scope.maxSize = 5;//分页的长度
    $scope.totalItems = coursesData.totalCount;//总记录数
    $scope.perPage = coursesData.perPage;//每页多少记录
    $scope.currentPage = 1;//当前页
    $scope.pageChanged = function () {
        Course.getCourses($stateParams.course_type, $scope.currentPage).then(function (response) {
            $scope.courses = response.data.courses;
        }, function () {
            layer.alert('啊哦，出错了！', {icon: 5});
        });
    }
}]);
