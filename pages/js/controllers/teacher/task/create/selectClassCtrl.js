/**
 * @选择班级
 * @作者：dyxm
 * @创建时间：2017-03-6
 */
'use strict';
app.controller('selectClassCtrl', ['$scope', '$modalInstance', 'Class', 'taskData',
    function ($scope, $modalInstance, Class, taskData) {
        $scope.task = taskData;
        $scope.course_type = 0;
        $scope.last_choose = -1;
        $scope.maxSize = 5;//分页的长度
        $scope.currentPage = 1;//当前页
        loadClasses($scope.task.course_id, $scope.currentPage);//初始加载专业必修课程

        //选某个班级
        $scope.selectClass = function ($index) {
            if ($scope.last_choose != $index) {
                if ($scope.last_choose != -1) {
                    $scope.classes[$scope.last_choose]['isChosen'] = false;
                }
                $scope.classes[$index]['isChosen'] = true;
                $scope.last_choose = $index;
            } else if ($scope.last_choose == $index) {
                $scope.classes[$index]['isChosen'] = !$scope.classes[$index]['isChosen'];
                $scope.last_choose = $scope.classes[$index]['isChosen'] ? $index : -1;
            }
        }

        //分页改变
        $scope.pageChanged = function () {
            loadClasses($scope.task.course_id, $scope.currentPage);
        }

        //确定
        $scope.ok = function () {
            $scope.task['course_class_id'] = $scope.classes[$scope.last_choose]['course_class_id'];
            $scope.task['class_id'] = $scope.classes[$scope.last_choose]['class_id'];
            $scope.task['class_name'] = $scope.classes[$scope.last_choose]['class_name'];
            $scope.task['is_group'] = $scope.classes[$scope.last_choose]['is_group'];
            $modalInstance.close($scope.task);//将更新的task返回到父控制器
        };
        //关闭
        $scope.close = function () {
            $modalInstance.dismiss();
        };

        //loadClasses函数
        function loadClasses($course_id, $currentPage) {
            Class.getCourseClasses($course_id, $currentPage).then(function (response) {
                layer.closeAll();
                $scope.classes = response.data.classes;
                $scope.totalItems = response.data.totalCount;//总记录数
                $scope.perPage = response.data.perPage;//每页多少记录
            });
        }
    }]);


