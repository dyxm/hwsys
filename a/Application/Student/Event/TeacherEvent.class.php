<?php
namespace Student\Event;

class TeacherEvent{

    //获取老师信息
    public function getTeacherInfo($teacher_id,$field=''){
        return M('teacher')->field($field)->where(array('teacher_id' => $teacher_id, 'status' => '1'))->find();
    }

    //获取老师名字
    public function getTeacherName($teacher_id){
        return $this->getTeacherInfo($teacher_id,'name')['name'];
    }
}