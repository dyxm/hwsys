/**
 * @新建任务
 * @作者：dyxm
 * @创建时间：2017-03-6
 */
'use strict';
app.controller('createTaskCtrl', ['$scope', '$modal', 'Course', 'Class', 'Task', function ($scope, $modal, Course, Class, Task) {
    $scope.task = {};
    $scope.fileIsReady=true;
    $scope.fileDeleteBtn=false;

    //选择课程
    $scope.selectCourse = function () {
        layer.load(1);
        $modal.open({
            templateUrl: 'tpl/teacher/task/tpls/selectCourseTpl.html',
            controller: 'selectCourseCtrl',
        }).result.then(function (response) {
            $scope.task = response;
        });
    }

    //选择班级
    $scope.selectClass = function () {
        if ($scope.task.course_id) {
            layer.load(1);
            $modal.open({
                templateUrl: 'tpl/teacher/task/tpls/selectClassTpl.html',
                controller: 'selectClassCtrl',
                resolve: {
                    taskData: function () {
                        return $scope.task;
                    }
                }
            }).result.then(function (response) {
                $scope.task = response;
            });
        } else {
            layer.alert('请先选择一门课程', {icon: 7});
        }
    }

    //选择日期
    $scope.chooseDate = function () {
        laydate({
            elem: '#deadline',
            format: 'YYYY-MM-DD hh:mm:ss', //日期格式
            istime: true, //是否开启时间选择
            isclear: true, //是否显示清空
            istoday: true, //是否显示今天
            issure: true, //是否显示确认
            festival: true, //是否显示节日
            min: laydate.now(), //最小日期
            max: '2099-12-31 23:59:59', //最大日期
            choose: function (dates) { //选择好日期的回调
                if ($('#deadline').val()) {
                    $('#deadline').addClass('ng-dirty').addClass('ng-valid');
                } else {
                    $('#deadline').removeClass('ng-valid');
                }
                $scope.task.deadline = dates;
                $scope.$apply();
            }
        });
    }

    //检测文件的合法性
    $scope.checkFile = function () {
        var file = document.querySelector('input[type=file]').files[0];
        var text=$(':file').next().find(':text');
        if (file) {
            $scope.fileDeleteBtn=true;
            var maxSize=10*1024*1024;
            var type = ['pdf', 'doc', 'docx', 'rar', 'zip'];
            var ext = file.name.split('.')[1];
            var size=file.size;
            if (!($.inArray(ext, type) > -1)) {
                layer.msg('文件格式不允许', {time: 2000, icon: 7});
                text.addClass('ng-dirty').addClass('ng-invalid').removeClass('ng-valid');
                $scope.fileIsReady=false;
            }else if(size>maxSize){
                layer.msg('文件不得超过10M', {time: 2000, icon: 7});
                text.addClass('ng-dirty').addClass('ng-invalid').removeClass('ng-valid');
                $scope.fileIsReady=false;
            }else{
                text.addClass('ng-dirty').addClass('ng-valid');
            }
        }else{
            text.removeClass('ng-dirty').removeClass('ng-invalid').removeClass('ng-valid');
            $scope.fileDeleteBtn=false;
        }
        $scope.$apply();
    }

    //取消已选择的文件
    $scope.deleteFile=function () {
        var text=$(':file').next().find(':text');
        text.val('');
        text.removeClass('ng-dirty').removeClass('ng-invalid').removeClass('ng-valid');
        $scope.fileDeleteBtn=false;
        $scope.fileIsReady=true;
    }

    //创建任务
    $scope.createTask = function () {
        if($scope.fileIsReady){
            var file = document.querySelector('input[type=file]').files[0];
            layer.confirm('是否确认无误？', {
                btn: ['是的', '再检查一遍']
            }, function () {
                layer.load(1);
                Task.createTask($scope.task).then(function (response) {
                    if(response.data.status){
                        if(file){
                            Task.uploadAttachFile(response.data.task_id,file).then(function (response) {
                                if(response.data.status){
                                    layer.closeAll();
                                    layer.msg('作业布置成功', {time: 2000, icon: 1});
                                }else{
                                    layer.closeAll();
                                    layer.msg(response.data.msg, {time: 2000, icon: 2});
                                }
                            })
                        }else{
                            layer.closeAll();
                            layer.msg('作业布置成功', {time: 2000, icon: 1});
                        }

                    }else{
                        layer.closeAll();
                        console.log(response.data.msg);
                        // layer.msg(response.data.msg, {time: 2000, icon: 2});
                    }
                });
            });
        }else{
            layer.msg('附件不符合要求', {time: 2000, icon: 7});
        }
    }
}]);
