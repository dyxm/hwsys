<?php
namespace Teacher\Model;
use Think\Model\ViewModel;

class ClassStudentModel extends ViewModel{

    //视图连接
    public $viewFields = array(
        'class_student'=>array('*'),
        'student'=>array('*', '_on'=>'class_student.student_id=student.student_id'),
        'class'=>array('*','_on'=>'class_student.class_id=class.class_id')
    );
}