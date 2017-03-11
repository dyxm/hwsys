/**
 * Created by dyxm on 2017/2/16.
 */
'use strict';

//用户服务
app
    .service('User', function ($rootScope, $localStorage, $http, $q) {
        var defaultAccess = ['access.welcome', 'access.login', 'access.forgotpwd', 'teacher.newhomework'];
        /**
         * 登录
         * @param user
         * @returns {Promise}
         */
        this.login = function (user) {
            layer.load(1);
            var delay = $q.defer();
            $http.post($rootScope.rootURL + '/login', {user: user})
                .then(function (response) {
                    layer.closeAll('loading');
                    if (response.data.status) {
                        //保存用户信息
                        $localStorage.hw_userInfo = response.data.userInfo;
                        //保存用户token
                        $localStorage.hw_token = response.data.token;
                    }
                    delay.resolve(response);
                }, function () {
                    layer.closeAll('loading');
                    delay.reject("网络错误！");
                });
            return delay.promise;
        }
        /**
         * 登出
         * @returns {Promise}
         */
        this.logout = function () {
            var delay = $q.defer();
            $http.post($rootScope.rootURL + '/logout', {token: $localStorage.hw_token})//读取数据的函数。
                .then(function (response) {
                    delay.resolve(response);
                }, function () {
                    delay.reject("网络错误！");
                });
            //删除用户信息
            $localStorage.hw_userInfo = null;
            //删除token
            $localStorage.hw_token = null;
            return delay.promise;
        }
        //判断是否登录
        this.isLogin = function () {
            // return ((userInfo || !!$localStorage.hw_userInfo) && (token || !!$localStorage.hw_token)) ? true : false;
            return ((!!$localStorage.hw_userInfo) && (!!$localStorage.hw_token)) ? true : false;
        }
        //判断是否有权限
        this.hasAuth = function (toUrl) {
            if ($.inArray(toUrl.toLowerCase(), defaultAccess) > -1) {
                return true;
            } else if ((!!$localStorage.hw_userInfo) && ($.inArray(toUrl.toLowerCase(), $localStorage.hw_userInfo.authList) > -1)) {
                return true;
            } else {
                return false;
            }
        }
        //获取用户信息
        this.getUserInfo = function () {
            // return userInfo ? userInfo : $localStorage.hw_userInfo;
            return $localStorage.hw_userInfo;
        }
        //获取用户id
        this.getUserID = function () {
            // return userInfo ? userInfo.id : $localStorage.hw_userInfo.id;
            return $localStorage.hw_userInfo.id;
        }
        //获取token
        this.getToken = function () {
            // return token ? token : $localStorage.hw_token;
            return $localStorage.hw_token;
        }
    })