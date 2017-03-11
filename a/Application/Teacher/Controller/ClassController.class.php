<?php
namespace Teacher\Controller;
use Common\Controller\AuthController;
class ClassController extends AuthController{
    //测试专用
    public function test_get_json(){
        dump(M('class_student')->where(array('student_id'=>1,'class_id'=>3))->find()?true:false);
    }
}