<?php
namespace Student\Model;
use Think\Model\ViewModel;

class ClassModel extends ViewModel{

    //视图连接
    public $viewFields = array(
        'class'=>array('*'),
        'class_student'=>array('*', '_on'=>'class.class_id=class_student.class_id'),
//        'teacher'=>array(
//            'teacher_id'=>'teacher_id',
//            'name'=>'teacher_name',
//            '_on'=>'class.teacher_id=teacher.teacher_id')
    );
}