/**
 * Created by dyxm on 2017/2/27.
 */
'use strict';
angular.module('student.Homework',[])
//作业
    .service('Homework', function ($rootScope, $http, $q, User) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;
        /**
         * 获取作业集
         * @param $status 0表查询未交且没过截止日期的作业，1表查询过了截止日期或已上交的作业
         * @param $currentPage 当前第几页
         * @returns {Promise}
         */
        this.getHomeworks = function ($status, $currentPage) {
            var delay = $q.defer();
            $http.get(path + '/homeworks/' + user.id + '/' + $status + '/' + $currentPage)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }
        /**
         * 获取单个作业详情
         * @param homework_id
         * @returns {Promise}
         */
        this.getOneHomework = function (homework_id) {
            var delay = $q.defer();
            $http.get(path + '/homeworkDetail/' + user.id + '/' + homework_id)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }
        /**
         * 设置作业公开/不公开状态
         * @param $homework_id
         * @param $is_open
         * @returns {Promise}
         */
        this.changeHomeworkProperty = function ($homework_id, $is_open) {
            var delay = $q.defer();
            layer.load(1);
            $http.post(path + '/changeHomeworkProperty', {
                userID: user.id,
                homeworkID: $homework_id,
                is_open: $is_open
            }).then(function (response) {
                layer.closeAll('loading');
                delay.resolve(response);
            }, function () {
                layer.closeAll('loading');
                layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
            });
            return delay.promise;
        }
        /**
         * 获取总记录数
         * @param $status 0表示查询未交作业总数，1表示查询已交作业总数
         * @returns {Promise}
         */
        this.getHomeworkCount = function ($status) {
            var delay = $q.defer();
            $http.get(path + '/homeworkCount/' + user.id + '/' + $status)
                .then(function (response) {
                    delay.resolve(response.data);
                }, function () {
                    delay.reject(false);
                });
            return delay.promise;
        }
        /**
         * 上交作业
         * @param $homework_id
         * @param $file
         * @returns {Promise}
         */
        this.uploadHomework = function ($homework_id, $file) {
            layer.load(1);
            var delay = $q.defer();
            var fd = new FormData();
            fd.append('file', $file);
            $http.post(path + '/uploadHomework/' + user.id + '/' + $homework_id, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                layer.closeAll();
                delay.resolve(response);
            }, function () {
                layer.closeAll();
                layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                delay.reject(false);
            });
            return delay.promise;
        }
    })