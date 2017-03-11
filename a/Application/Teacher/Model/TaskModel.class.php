<?php
namespace Teacher\Model;
use Think\Model\ViewModel;

class TaskModel extends ViewModel{
    public $viewFields = array(
        'task'=>array('*'),
        'course_class'=>array('*','_on'=>'task.course_class_id=course_class.course_class_id'),
    );
}