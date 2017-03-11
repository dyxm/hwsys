/**
 * Created by dyxm on 2017/3/1.
 */
'use strict';
angular.module('fileService', [])
    .service('FileUpload', function ($rootScope, $http, $q, User) {
    this.upload = function ($url, $target_id, $file) {
        var user = User.getUserInfo();
        var path = $rootScope.rootURL + '/' + user.type;
        var delay = $q.defer();
        var fd = new FormData();
        fd.append('file', $file);
        $http.post(path + $url + '/' + user.id + '/' + $target_id, fd, {
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