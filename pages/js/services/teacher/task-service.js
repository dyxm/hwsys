/**
 * Created by dyxm on 2017/2/27.
 */
'use strict';
angular.module('teacher.Task', [])
//任务
    .service('Task', function ($rootScope, $http, $q, User) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;

        this.getTask = function ($task_id) {
            var delay = $q.defer();
            $http.get(path + '/task/' + user.id + '/' + $task_id)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.closeAll();
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }
        /**
         * 获取任务集
         * @param $course_class_id
         * @param $currentPage
         * @returns {Promise}
         */
        this.getTasks = function ($course_class_id, $currentPage) {
            var delay = $q.defer();
            $http.get(path + '/tasks/' + user.id + '/' + $course_class_id + '/' + $currentPage)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.closeAll();
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }

        /**
         * 创建任务
         * @param $course_class_id
         * @returns {Promise}
         */
        this.createTask = function ($taskData) {
            var delay = $q.defer();
            $http.post(path + '/createTask', {userID: user.id, taskData: $taskData})
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.closeAll();
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }
        /**
         * 上传附件
         * @param $file
         * @returns {Promise}
         */
        this.uploadAttachFile = function ($task_id, $file) {
            var delay = $q.defer();
            var fd = new FormData();
            fd.append('file', $file);
            $http.post(path + '/uploadAttachFile' + '/' + user.id + '/' + $task_id, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                delay.resolve(response);
            }, function () {
                layer.closeAll();
                layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                delay.reject(false);
            });
            return delay.promise;
        }
    })