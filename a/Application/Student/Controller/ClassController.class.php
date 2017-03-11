<?php
namespace student\Controller;

use Common\Controller\AuthController;

class ClassController extends AuthController{
    private $class;

    public function __construct(){
        parent::__construct();
        $this->class = A('Class', 'Event');
    }

    /**
     * 获取班级集合
     */
    public function classes_get_json(){
        $user_id = I('get.userID');
        $class_type = I('get.class_type');
        $currentPage = I('get.currentPage');
        $classes = $this->class->getClasses($user_id, $class_type, $currentPage);
        $totalCount = $this->class->getClassCount($user_id, $class_type);
        $this->response(array('classes' => $classes, 'totalCount' => $totalCount, 'perPage' => C('PAGE_SIZE')), 'json');
    }

    /**
     * 获取单个班级详情
     */
    public function class_get_json(){
        $user_id = I('get.userID');
        $class_id = I('get.classID');
        if ($this->class->checkUserInClass($user_id, $class_id)) {
            $classInfo = $this->class->getClassInfo($class_id);
            $students = $this->class->getClassStudents($class_id,'student_id,name,stu_number,sex,face');
        }
        $this->response(array('class'=>$classInfo,'students'=>$students), 'json');
    }
}