<?php
namespace Student\Model;
use Think\Model\ViewModel;

class HomeworkModel extends ViewModel{
    public $viewFields = array(
        'homework'=>array('*'),
        'task'=>array('*','_on'=>'homework.task_id=task.task_id'),
        'course_class'=>array('*','_on'=>'task.course_class_id=course_class.course_class_id'),
        'student'=>array('name'=>'student_name','stu_number'=>'stu_number','_on'=>'homework.student_id=student.student_id'),
    );
}