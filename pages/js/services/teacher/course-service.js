/**
 * Created by dyxm on 2017/2/27.
 */
'use strict';
angular.module('teacher.Course', [])
//课程
    .service('Course', function ($rootScope, $http, $q, User) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;
        /**
         * 获取课程集合
         * @param $course_type
         * @param $currentPage
         * @returns {Promise}
         */
        this.getCourses = function ($course_type, $currentPage) {
            var delay = $q.defer();
            $http.get(path + '/courses/' + user.id + '/' + $course_type + '/' + $currentPage)
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
         * 获取课程所分配的班级
         * @param $course_id
         * @param $currentPage
         * @returns {Promise}
         */
        this.getCourseClasses = function ($course_id, $currentPage) {
            var delay = $q.defer();
            $http.get(path + '/courseClasses/' + user.id + '/' + $course_id + '/' + $currentPage)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.closeAll();
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }
    })