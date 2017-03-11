<?php
namespace Student\Controller;
use Common\Controller\AuthController;
class TestController extends AuthController{
    protected $allowMethod = array('get', 'post', 'put', 'delete');
    protected $defaultType = 'json';
    //测试专用
    public function test_get_json(){
//        $test = A('Class','Event');
//        $data=$test->getClasses(1,0,1);
//        $class_student = M('class_student');
//        $data = D('Class')->where(array('student_id' => 1, 'type' => 1))->count();
//        $class = A('Class','Event');
//        $teacher = A('Teacher','Event');
//        $course = A('Course','Event');
//
//        //获取班级名、教师名、课程名
//        foreach ($data as $index=>$d){
//            $data[$index]['class_name']=$class->getClassName($d['class_id']);
//            $data[$index]['teacher_name']=$teacher->getTeacherName($d['teacher_id']);
//            $data[$index]['course_name']=$course->getCourseName($d['course_id']);
//        }
//        $data = $test->getClasses(1,0,1);
//        $map['class_id']=array('in',A('Student','Event')->getStudentClassIDs(1));
//        $map['class_status']=array('eq',1);
//        $map['course_status']=array('eq',1);
//
//        $classes=D('course_class')->where($map)->select();
//        A('Class','Event')->getClassInfo(3)
//        $map['class_id']=array('eq',3);
//        $map['class_type']=array('eq',1);
//        $map['class_status']=array('eq',1);
//        $map['course_status']=array('eq',1);
//        $class=D('course_class')->where($map)->order('class_create_date ASC')->select();
//
//        dump(A('Homework','Event')->getHomeworks(1,1,1,'homework_id,teacher_id,course_id,class_id,task_name,status,deadline'));
//        dump(M('course_class')->where(array('course_class_id'=>1))->find()['class_id']);
//        dump(D('group_member')->where(array('course_class.course_class_id' => 1, 'student.student_id' => 1))->find());
//        dump(M('groups')->field('')->where(array('course_class_id'=>1))->order('create_date ASC')->select());
//        dump(D('group_member')->where(array('groups.group_id' => 3, 'student.student_id' => 1))->find());
//        $map['course_class_id'] = array('eq', 1);
//        $map['grouping_deadline'] = array('lt', date('Y-m-d H:i:s'),time());
//        dump(M('course_class')->where($map)->find() ? false : true);
//        dump(A('Homework','Event')->getOneHomework(1,200));
        echo(strtotime("2009-10-21 16:00:10"));
    }
}