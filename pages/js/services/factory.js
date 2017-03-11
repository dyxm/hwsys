/**
 * Created by dyxm on 2017/2/25.
 */
'use strict';
// app.factory('Homework', ['$rootScope','$resource',function($rootScope,$resource){
//     return {
//         getNewHomeworks:function (user) {
//             var delay = $q.defer();
//             $http.get($rootScope.rootURL + '/newHomeworks', {user_id: user.id ,type:0,})
//                 .then(function (newHomeworks) {
//                     delay.resolve(newHomeworks);
//                 }, function () {
//                     delay.reject("获取作业失败！");
//                 });
//             return delay.promise;
//         }
//     }
// }]);
// app.factory('NewHomeworkList', ['Homework','$q',function(Homework,$q){
//     return function () {
//         var delay=$q.defer();
//         Homework.query(function (newHomeworks) {
//             delay.resolve(newHomeworks);
//         },function () {
//             delay.reject('获取作业列表失败！');
//         });
//         return delay.promise;
//     };
// }]);
