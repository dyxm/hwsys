<?php
namespace student\Controller;

use Common\Controller\AuthController;

class GroupController extends AuthController{
    private $group;

    public function __construct(){
        parent::__construct();
        $this->group = A('Group', 'Event');
    }

    /**
     * 新建分组
     */
    public function newGroup_post_json(){
        $user_id = I('post.userID');
        $course_class_id = I('post.course_class_id');
        $group_data = I('post.groupData');
        if(!$this->group->checkIsDeadline('',$course_class_id)){
            if (!$this->group->checkMemberInGroup($course_class_id, $user_id)) {
                if ($this->group->newGroup($course_class_id, $user_id, $group_data)) {
                    $groups = D('Group', 'Event')->getGroups($course_class_id);
                    $result = array('status' => true, 'msg' => '创建成功', 'groups' => $groups);
                } else {
                    $result = array('status' => false, 'msg' => '创建失败，请稍后再试');
                }
            } else {
                $result = array('status' => false, 'msg' => '您已分组！');
            }
        } else {
            $result = array('status' => false, 'msg' => '分组已截止');
        }

        $this->response($result, 'json');
    }

    /**
     * 解散分组
     */
    public function dissolveGroup_post_json(){
        $user_id = I('post.userID');
        $group_id = I('post.group_id');
        if(!$this->group->checkIsDeadline($group_id)){
            if ($this->group->checkIsLeader($group_id, $user_id)) {
                $result = $this->group->dissolveGroup($group_id) ? array('status' => true) : array('status' => false, 'msg' => '删除失败！');
            } else {
                $result = array('status' => false, 'msg' => '您无权进行此项操作！');
            }
        } else {
            $result = array('status' => false, 'msg' => '分组已截止');
        }

        $this->response($result, 'json');
    }

    /**
     * 移出分组成员
     */
    public function removeMember_post_json(){
        $user_id = I('post.userID');
        $group_id = I('post.group_id');
        $member_id = I('post.member_id');
        if(!$this->group->checkIsDeadline($group_id)){
            if ($this->group->checkIsLeader($group_id, $user_id)) {
                $result = $this->group->removeMember($group_id, $member_id) ? array('status' => true) : array('status' => false, 'msg' => '删除失败');
            } else {
                $result = array('status' => false, 'msg' => '您无权进行此项操作' . $group_id . $user_id . $member_id);
            }
        } else {
            $result = array('status' => false, 'msg' => '分组已截止');
        }

        $this->response($result, 'json');
    }

    /**
     * 加入分组
     */
    public function joinGroup_post_json(){
        $user_id = I('post.userID');
        $group_id = I('post.group_id');
        $pass = I('post.pass');
        if(!$this->group->checkIsDeadline($group_id)){
            if (!$this->group->checkMemberInGroup($group_id, $user_id)) {
                if (!$this->group->checkIsFull($group_id)) {
                    if ($this->group->checkJoinPass($group_id, $pass)) {
                        if ($this->group->addMember($group_id, $user_id)) {
                            $members = $this->group->getGroupMembers($group_id, 'name,stu_number,sex,face,student_id');
                            $result = array('status' => true, 'members' => $members);
                        } else {
                            $result = array('status' => false, 'msg' => '加入失败');
                        }
                    } else {
                        $result = array('status' => false, 'msg' => '口令错误');
                    }
                } else {
                    $result = array('status' => false, 'msg' => '抱歉您来晚了，小组已满人了');
                }
            } else {
                $result = array('status' => false, 'msg' => '您已分组');
            }
        } else {
            $result = array('status' => false, 'msg' => '分组已截止');
        }

        $this->response($result, 'json');
    }
}