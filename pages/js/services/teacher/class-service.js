/**
 * Created by dyxm on 2017/3/6.
 */
'use strict';
angular.module('teacher.Class', [])
//班级
    .service('Class', function ($rootScope, $http, $q, User) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;
        this.getClasses = function ($class_type, $currentPage) {
            var delay = $q.defer();
            $http.get(path + '/classes/' + user.id + '/' + $class_type + '/' + $currentPage)
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