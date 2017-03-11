<?php
namespace Student\Model;
use Think\Model\ViewModel;

class CourseClassModel extends ViewModel{

    //视图连接
    public $viewFields = array(
        'course_class'=>array('*'),
        'class'=>array('*','_on'=>'course_class.class_id=class.class_id'),
        'course'=>array('*', '_on'=>'course_class.course_id=course.course_id'),//course_name'=>'course_name','info'=>'course_info','status'=>'course_status
    );
}