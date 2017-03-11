/**
 * @“课程详情”控制器
 * @作者：dyxm
 * @创建时间：2017-03-2
 */
'use strict';
app.controller('courseDetailCtrl', ['$rootScope', '$scope', '$state', '$modal', 'Group', 'courseData',
    function ($rootScope, $scope, $state, $modal, Group, courseData) {
        $scope.courseInfo = courseData.courseInfo;
        $scope.groups = courseData.groups;
        console.log($scope.courseInfo);
        //是否过截止日期
        $scope.isGroupDeadline = new Date().getTime() > new Date($scope.courseInfo.grouping_deadline).getTime();

        $scope.showGroup = function ($index,$max_member_count,$groupData) {
            $modal.open({
                templateUrl: 'showGroup.html',
                controller: 'showGroupCtrl',
                resolve: {
                    groupData: function () {
                        return $groupData;
                    },
                    max_member_count:function () {
                        return $max_member_count;
                    }
                }
            }).result.then(function (result) {
                if(result=='dissolve'){
                    $scope.groups.splice($index, 1);
                }
            });
        }

        //新建分组
        $scope.newGroup = function ($course_class_id) {
            var modalInstance = $modal.open({
                templateUrl: 'newGroup.html',
                controller: 'newGroupCtrl'
            });
            modalInstance.result.then(function (result) {
                Group.newGroup($course_class_id, result).then(function (response) {
                    if (!response.data.status) {
                        layer.msg(response.data.msg,{time:2000,icon:7});
                    } else {
                        layer.msg(response.data.msg,{time:2000,icon:1});
                        $scope.groups = response.data.groups;
                        $scope.$apply();
                    }
                })
            });
        }

        //解散小组
        $scope.dissolveGroup = function ($group_index,$group_id) {
            layer.confirm('确定删除该分组？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                Group.dissolveGroup($group_id).then(function (response) {
                    if (response.data.status) {
                        $scope.groups.splice($group_index, 1);
                        layer.msg('成功移除该分组',{time:2000,icon:1});
                    } else {
                        layer.msg(response.data.msg,{time:2000,icon:2});
                    }
                });
            });

        }

        //移出成员
        $scope.removeMember = function ($group_index, $member_index, $group_id, $member_id) {
            layer.confirm('确定移除该成员？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                Group.removeMember($group_id, $member_id).then(function (response) {
                    if (response.data.status) {
                        $scope.groups[$group_index]['members'].splice($member_index, 1);
                        layer.msg('成功移除该成员',{time:2000,icon:1});
                    } else {
                        layer.msg(response.data.msg,{time:2000,icon:2});
                    }
                });
            });
        }

        //加入分组
        $scope.joinGroup = function ($group_index,$group_id) {
            layer.prompt({title: '输入加入口令，并确认', formType: 1}, function (pass, index) {
                layer.close(index);
                Group.joinGroup($group_id,pass).then(function (response) {
                    if (response.data.status) {
                        layer.msg('加入成功',{time:2000,icon:1});
                        $scope.groups[$group_index]['members']=response.data.members;
                        $scope.$apply();
                    } else {
                        layer.msg(response.data.msg,{time:2000,icon:2});
                    }
                });
            });
        }
    }]);

app.controller('showGroupCtrl', ['$rootScope', '$scope', '$state', '$modalInstance', 'Group', 'groupData','max_member_count',
    function ($rootScope, $scope, $state, $modalInstance, Group, groupData,max_member_count) {
        $scope.group = groupData;
        $scope.max_member_count=max_member_count;

        //编辑
        $scope.groupEdit = true;
        $scope.edit = function () {
            $scope.groupEdit = !$scope.groupEdit;
        }

        //解散小组
        $scope.dissolveGroup = function ($group_id) {
            layer.confirm('确定删除该分组？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                Group.dissolveGroup($group_id).then(function (response) {
                    if (response.data.status) {
                        layer.msg('成功移除该分组',{time:2000,icon:1});
                        $modalInstance.close('dissolve');
                    } else {
                        layer.msg(response.data.msg,{time:2000,icon:2});
                    }
                });
            });

        }

        //移出成员
        $scope.removeMember = function ($index, $group_id, $member_id) {
            layer.confirm('确定移除该成员？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                Group.removeMember($group_id, $member_id).then(function (response) {
                    if (response.data.status) {
                        layer.msg('成功移除该成员',{time:2000,icon:1});
                        $scope.group.members.splice($index, 1);
                    } else {
                        layer.msg(response.data.msg,{time:2000,icon:2});
                    }
                });
            });
        }

        //加入分组
        $scope.joinGroup = function ($group_id) {
            layer.prompt({title: '输入加入口令，并确认', formType: 1}, function (pass, index) {
                layer.close(index);
                Group.joinGroup($group_id,pass).then(function (response) {
                    if (response.data.status) {
                        layer.msg('加入成功',{time:2000,icon:1});
                        $scope.group.members=response.data.members;
                        $scope.$apply();
                    } else {
                        layer.msg(response.data.msg,{time:2000,icon:2});
                    }
                });
            });
        }

        //关闭模态框
        $scope.close = function () {
            $modalInstance.dismiss();
        };

    }]);

app.controller('newGroupCtrl', ['$rootScope', '$scope', '$state', '$modalInstance',
    function ($rootScope, $scope, $state, $modalInstance) {
        $scope.newGroup = {};
        $scope.ok = function () {
            $modalInstance.close($scope.newGroup);
        };
        $scope.close = function () {
            $modalInstance.dismiss();
        };

    }]);
