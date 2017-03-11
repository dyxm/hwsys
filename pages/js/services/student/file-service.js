/**
 * Created by dyxm on 2017/3/1.
 */
'use strict';
angular.module('fileService', [])
    .service('FileUpload', function ($rootScope, $http, $q, User) {
    this.upload = function ($url, $homework_id, $file) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;
        var delay = $q.defer();
        var fd = new FormData();
        fd.append('file', $file);
        $http.post(path + $url + '/' + user.id + '/' + $homework_id, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function (response) {
            delay.resolve(response);
        }, function () {
            delay.reject("网络错误！");
        });
        return delay.promise;
    }
})