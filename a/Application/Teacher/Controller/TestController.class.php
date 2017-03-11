<?php
namespace Teacher\Controller;
use Common\Controller\AuthController;
class TestController extends AuthController{
    //测试专用
    public function test_get_json(){
//        dump(A('Course','Event')->getCourseClasses(1,2,0));getClassStudentIDs
//        dump(D('course_class')->where('course.teacher_id=1')->select());
//        dump(A('Class','Event')->getClassStudentIDs(9));
//        dump(A('Task','Event')->getOneTask(38));
//        dump(D('task')->where(array('task_id'=>38))->select());
        echo(date('Y-m-d H:i:s',1489766400));
    }
}