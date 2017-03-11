<?php
namespace Student\Model;
use Think\Model\ViewModel;

class GroupMemberModel extends ViewModel{
    public $viewFields = array(
        'group_member'=>array('*'),
        'groups'=>array('*','_on'=>'group_member.group_id=groups.group_id'),
        'student'=>array('*','_on'=>'group_member.student_id=student.student_id'),
        'course_class'=>array('*','_on'=>'groups.course_class_id=course_class.course_class_id'),
    );
}