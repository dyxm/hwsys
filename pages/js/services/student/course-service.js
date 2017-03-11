/**
 * Created by dyxm on 2017/3/3.
 */
'use strict';
angular.module('student.Course',[])
    //课程
    .service('Course', function ($rootScope, $http, $q, User) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;
        /**
         * 查询课程集
         * @param $course_type 班级类别，0必修课程，1公共必修，2选修课程
         * @param $currentPage 当前页
         * @returns {Promise}
         */
        this.getCourses = function ($course_type, $currentPage) {
            var delay = $q.defer();
            $http.get(path + '/courses/' + user.id + '/' + $course_type + '/' + $currentPage)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }

        /**
         *获取单个课程详情
         * @param $course_id
         * @returns {Promise}
         */
        this.getCourse = function ($course_class_id) {
            var delay = $q.defer();
            $http.get(path + '/courseDetail/' + user.id + '/' + $course_class_id)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }
    })