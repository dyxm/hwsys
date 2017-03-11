<?php
namespace Student\Event;

class StudentEvent{

    //获取学生信息
    public function getStudentInfo($student_id,$field=''){
        return M('student')->field($field)->where(array('student_id' => $student_id, 'status' => '1'))->find();
    }

    //获取学生名字
    public function getStudentName($student_id){
        return $this->getStudentInfo($student_id,'name')['name'];
    }

    //获取学生普通班级id
    public function getStudentClassID($student_id){
        return $this->getStudentInfo($student_id,'class_id');
    }

    //获取学生联合班级的ids
    public function getStudentClassIDs($student_id){
        $classes=M('class_student')->field('class_id')->where(array('student_id' => $student_id))->select();

        foreach ($classes as $index=>$class) {
            $classIDs[$index]=$class['class_id'];
        }
        return $classIDs;
    }
}