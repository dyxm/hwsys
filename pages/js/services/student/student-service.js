/**
 * Created by dyxm on 2017/3/3.
 */
'use strict';
angular.module('studentService',[])
//班级
    .service('Class', function ($rootScope, $http, $q, User) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;
        /**
         * 查询班级集
         * @param $class_type 班级类别，0普通班级，1公共联合班级，2选修班级
         * @param $currentPage 当前页
         * @returns {Promise}
         */
        this.getClasses = function ($class_type, $currentPage) {
            var delay = $q.defer();
            $http.get(path + '/classes/' + user.id + '/' + $class_type + '/' + $currentPage)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }

        /**
         * 获取班级详情
         * @param $class_id
         * @returns {Promise}
         */
        this.getClass = function ($class_id) {
            var delay = $q.defer();
            $http.get(path + '/classDetail/' + user.id + '/' + $class_id)
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }
    })
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
    //分组
    .service('Group', function ($rootScope, $http, $q, User) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;

        /**
         * 新建分组
         * @param $groupData
         * @returns {Promise}
         */
        this.newGroup = function ($course_class_id, $groupData) {
            var delay = $q.defer();
            layer.load(1);
            $http.post(path + '/newGroup', {userID: user.id, course_class_id: $course_class_id, groupData: $groupData})
                .then(function (response) {
                    layer.closeAll('loading');
                    delay.resolve(response);
                }, function () {
                    layer.closeAll('loading');
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }

        /**
         * 解散分组
         * @param $group_id
         * @returns {Promise}
         */
        this.dissolveGroup = function ($group_id) {
            var delay = $q.defer();
            layer.load(1);
            $http.post(path + '/dissolveGroup', {userID: user.id, group_id: $group_id})
                .then(function (response) {
                    layer.closeAll('loading');
                    delay.resolve(response);
                }, function () {
                    layer.closeAll('loading');
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }

        /**
         * 加入分组
         * @param $group_id
         * @param $pass
         * @returns {Promise}
         */
        this.joinGroup = function ($group_id, $pass) {
            var delay = $q.defer();
            layer.load(1);
            $http.post(path + '/joinGroup', {userID: user.id, group_id: $group_id, pass: $pass})
                .then(function (response) {
                    layer.closeAll('loading');
                    delay.resolve(response);
                }, function () {
                    layer.closeAll('loading');
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }

        /**
         * 移出分组成员
         * @param $group_id
         * @returns {Promise}
         */
        this.removeMember = function ($group_id, $member_id) {
            var delay = $q.defer();
            layer.load(1);
            $http.post(path + '/removeMember', {userID: user.id, group_id: $group_id, member_id: $member_id})
                .then(function (response) {
                    layer.closeAll('loading');
                    delay.resolve(response);
                }, function () {
                    layer.closeAll('loading');
                    layer.msg('啊哦，网络出错了！', {time: 2000, icon: 7});
                    delay.reject(false);
                });
            return delay.promise;
        }
    })
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
    })