/**
 * @任务分布
 * @作者：dyxm
 * @创建时间：2017-03-9
 */
'use strict';
app.controller('taskDistributionCtrl', ['$scope', 'Course', 'Class', 'Task', 'tasksData', function ($scope, Course, Class, Task, tasksData) {
    $scope.tasks = tasksData.tasks;
    $scope.totalItems = tasksData.totalCount;//总记录数
    $scope.perPage = tasksData.perPage;//每页多少记录
    $scope.maxSize = 5;//分页的长度
    $scope.currentPage = 1;//当前页
    $scope.course_type = '';
    $scope.course_id = '';
    $scope.course_class_id = '';


    //选择课程类别
    $scope.typeChange = function () {
        $scope.course_id = '';
        $scope.course_class_id = '';
        if ($scope.tasks) {
            $scope.tasks = '';
            $scope.$apply();
        }
        Course.getCourses($scope.course_type, 0).then(function (response) {
            $scope.courses = response.data.courses;
            var selectCourse = $('#selectCourse');
            var selectClass = $('#selectClass');
            var courseHtml = '';
            selectCourse.html('<option value=""></option>');//每次更改都置空
            selectClass.html('<option value=""></option>');
            for (var i = 0; i < $scope.courses.length; i++) {//解决插件与angular js 不兼容。由于页面渲染导致无法显示样式,参考http://blog.csdn.net/ios_king/article/details/51971202
                courseHtml = "<option value='" + $scope.courses[i].course_id + "' class='ng-binding ng-scope'>" + $scope.courses[i].course_name + "</option>";
                selectCourse.append(courseHtml);
            }
            selectCourse.trigger("chosen:updated");
            selectClass.trigger("chosen:updated");
        });
    }

    //选择课程
    $scope.courseChange = function () {
        $scope.course_class_id = '';
        if ($scope.tasks) {
            $scope.tasks = '';
            $scope.$apply();
        }
        Course.getCourseClasses($scope.course_id, 0).then(function (response) {
            $scope.classes = response.data.classes;
            var selectClass = $('#selectClass');
            var classHtml = '';
            selectClass.html('<option value=""></option>');
            for (var i = 0; i < $scope.classes.length; i++) {
                classHtml = "<option value='" + $scope.classes[i].course_class_id + "' class='ng-binding ng-scope'>" + $scope.classes[i].class_name + "</option>";
                selectClass.append(classHtml);
            }
            selectClass.trigger("chosen:updated");
        });
    }

    //选择班级
    $scope.classChange = function () {
        $scope.currentPage = 1;
        loadTasks($scope.course_class_id, $scope.currentPage);
    }

    //查询
    $scope.search = function () {
        $scope.currentPage = 1;
        loadTasks($scope.course_class_id, $scope.currentPage);
    }

    //分页
    $scope.pageChanged = function () {
        loadTasks($scope.course_class_id, $scope.currentPage);
    }

    //加载作业
    function loadTasks($course_class_id, $currentPage) {
        layer.load(1);
        Task.getTasks($course_class_id, $currentPage).then(function (response) {
            layer.closeAll();
            $scope.tasks = response.data.tasks;
            $scope.totalItems = response.data.totalCount;
            $scope.perPage = response.data.perPage;
        });
    }
}]);