/**
 * Created by dyxm on 2017/2/28.
 */
'use strict';
app.controller('myClassCtrl', ['$rootScope', '$scope', '$stateParams', 'Class', 'classesData',
    function ($rootScope, $scope, $stateParams, Class, classesData) {
    $scope.classes = classesData.classes;

    $scope.maxSize = 5;//分页的长度
    $scope.totalItems = classesData.totalCount;//总记录数
    $scope.perPage = classesData.perPage;//每页多少记录
    $scope.currentPage = 1;//当前页
    $scope.pageChanged = function () {
        Class.getClasses($stateParams.class_type, $scope.currentPage).then(function (response) {
            $scope.classes = response.data.classes;
        }, function () {
            layer.alert('啊哦，出错了！', {icon: 5});
        });
    }
}]);
