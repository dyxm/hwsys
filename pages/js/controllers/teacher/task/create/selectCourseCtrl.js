/**
 * @选择课程
 * @作者：dyxm
 * @创建时间：2017-03-6
 */
'use strict';
app.controller('selectCourseCtrl', ['$scope', '$modalInstance', 'Course',
    function ($scope, $modalInstance, Course) {
        $scope.course_type = 0;
        $scope.last_choose = -1;
        $scope.maxSize = 5;//分页的长度
        $scope.currentPage = 1;//当前页
        loadCourses(0, 1);//初始加载专业必修课程

        //改变课程类别
        $scope.changeCourseType = function ($course_type) {
            if ($scope.course_type != $course_type) {
                layer.load(1);
                $scope.course_type = $course_type;
                $scope.currentPage = 1;
                $scope.last_choose = -1;
                loadCourses($scope.course_type, $scope.currentPage);
            }
        }

        //选某个课程
        $scope.selectCourse = function ($index) {
            if ($scope.last_choose != $index) {
                if ($scope.last_choose != -1) {
                    $scope.courses[$scope.last_choose]['isChosen'] = false;
                }
                $scope.courses[$index]['isChosen'] = true;
                $scope.last_choose = $index;
            } else if ($scope.last_choose == $index) {
                $scope.courses[$index]['isChosen'] = !$scope.courses[$index]['isChosen'];
                $scope.last_choose = $scope.courses[$index]['isChosen'] ? $index : -1;
            }
        }

        //分页改变
        $scope.pageChanged = function () {
            loadCourses($scope.course_type, $scope.currentPage);
        }

        //确定
        $scope.ok = function () {
            $modalInstance.close($scope.courses[$scope.last_choose]);//将选择的course_id，course_name返回到父控制器
        };
        //关闭
        $scope.close = function () {
            $modalInstance.dismiss();
        };

        //loadCourses函数
        function loadCourses($course_type, $currentPage) {
            Course.getCourses($course_type, $currentPage).then(function (response) {
                layer.closeAll();
                $scope.courses = response.data.courses;
                $scope.totalItems = response.data.totalCount;//总记录数
                $scope.perPage = response.data.perPage;//每页多少记录
            });
        }
    }]);