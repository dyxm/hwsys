<?php
namespace Teacher\Event;

class GroupEvent{

    //获取分组集
    public function getGroups($course_class_id,$field=''){
        $groups=M('groups')->field($field)->where(array('course_class_id'=>$course_class_id))->order('create_date ASC')->select();
        $groups=$this->fillMoreInfo($groups);
        foreach ($groups as $index=>$g){
            $groups[$index]['members']=$this->getGroupMembers($g['group_id'],'name,stu_number,sex,face,student_id');
        }
        return $groups;
    }

    //获取某个course_class_id下的所有分组的id
    public function getGroupIDs($course_class_id){
        $groups=M('groups')->field('group_id')->where(array('course_class_id'=>$course_class_id))->select();
        foreach ($groups as $g){
            $ids[]=$g['group_id'];
        }
        return $ids;
    }

//    //获取单个分组
//    public function getGroup($group_id,$field=''){
//        return M('groups')->field($field)->where(array('group_id'=>$group_id))->find();
//    }
//
//    //获取分组名
//    public function getGroupName($group_id){
//        return M('groups')->where(array('group_id'=>$group_id))->find()['group_name'];
//    }
//
    //获取分组的成员
    public function getGroupMembers($group_id,$field=''){
        return D('group_member')->field($field)->where(array('group_id'=>$group_id))->order('stu_number ASC')->select();
    }
//
    //获取分组成员数
    public function getGroupMemberCount($group_id){
        return D('group_member')->where(array('group_id'=>$group_id))->count();
    }
//
//    //新建分组
//    public function newGroup($course_class_id, $user_id, $group_data){
//        $group_data['course_class_id']=$course_class_id;
//        $group_data['leader_id']=$user_id;
//        $group_data['create_date']=date('Y-m-d H:i:s',time());
//        $group_id=M('groups')->data($group_data)->add();
//        return $this->addMember($group_id,$user_id);
//    }
//
//    //解散分组
//    public function dissolveGroup($group_id){
//        return M('groups')->where(array('group_id'=>$group_id))->delete();
//    }
//
//    //添加分组成员
//    public function addMember($group_id,$member_id){
//        return M("group_member")->add(array('group_id'=>$group_id,'student_id'=>$member_id));
//    }
//
//    //移出分组成员
//    public function removeMember($group_id,$member_id){
//        return M("group_member")->where(array('group_id'=>$group_id,'student_id'=>$member_id))->delete();
//    }
//
//    //判断是否已分组
//    public function checkMemberInGroup($group_id,$member_id){
////        return D('group_member')->where(array('course_class.course_class_id' => $course_class_id, 'student.student_id' => $member_id))->find() ? true : false;
//        $course_class_id = $this->getCourseClassID($group_id);
//        return D('group_member')->where(array('course_class.course_class_id' => $course_class_id, 'student.student_id' => $member_id))->find() ? true : false;
//    }
//
//    //判断是否是队长
//    public function checkIsLeader($group_id,$leader_id){
//        return M('groups')->where(array('group_id' => $group_id, 'leader_id' => $leader_id))->find() ? true : false;
//    }
//
//    //检查加入口令
//    public function checkJoinPass($group_id,$pass){
//        return M("groups")->where(array('group_id'=>$group_id,'join_pass'=>$pass))?true:false;
//    }
//
//    //检查是否已加满
//    public function checkIsFull($group_id){
//        $max_count = M('course_class')->where(array('group_id' => $group_id))->find()['max_member_count'];
//        $count = $this->getGroupMemberCount($group_id);
//        return $count >= $max_count ? true : false;
//    }
//
//    //检查分组是否截止
//    public function checkIsDeadline($group_id='',$course_class_id=''){
//        if($group_id){
//            $course_class_id = $this->getCourseClassID($group_id);
//        }
//        $map['course_class_id'] = array('eq', $course_class_id);
//        $map['grouping_deadline'] = array('lt', date('Y-m-d H:i:s'), time());
//        return M('course_class')->where($map)->find() ? true : false;
//    }
//
//    //获取课程分配ID
//    public function getCourseClassID($group_id){
//        return M("groups")->where(array('group_id'=>$group_id))->find()['course_class_id'];
//    }

    //填充更多信息
    private function fillMoreInfo($groups){
        foreach ($groups as $index=>$g){
            if($g['leader_id']){
                $groups[$index]['leader_name']=A('Student','Event')->getStudentName($g['leader_id']);
            }
            $groups[$index]['member_count']=$this->getGroupMemberCount($g['group_id']);
        }
        return $groups;
    }
}