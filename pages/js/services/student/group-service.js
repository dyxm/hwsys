/**
 * Created by dyxm on 2017/3/3.
 */
'use strict';
angular.module('student.Group',[])
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