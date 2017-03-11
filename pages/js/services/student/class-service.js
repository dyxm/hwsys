/**
 * Created by dyxm on 2017/3/3.
 */
'use strict';
angular.module('student.Class',[])
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