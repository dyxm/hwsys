<?php
namespace Teacher\Controller;
use Common\Controller\AuthController;
class CourseController extends AuthController{
    private $course;

    public function __construct(){
        parent::__construct();
        $this->course = A('Course', 'Event');
    }

    //获取课程集合
    public function courses_get_json(){
        $user_id = I('get.userID');
        $course_type = I('get.course_type');
        $currentPage = I('get.currentPage');
        $courses = $this->course->getCourses($user_id, $course_type, $currentPage,'course_id,course_name,course_name,course_create_date');
        if($course_type!=3&&$currentPage!=0){
            $totalCount = $this->course->getCourseCount($user_id, $course_type);
            $result=array('courses' => $courses, 'totalCount' => $totalCount, 'perPage' => C('PAGE_SIZE'));
        }else{
            $result=array('courses' => $courses);
        }

        $this->response($result,'json');
    }
    //获取课程所分配到的班级
    public function courseClasses_get_json(){
        $user_id = I('get.userID');
        $course_id = I('get.course_id');
        $currentPage = I('get.currentPage');
        $classes=$this->course->getCourseClasses($user_id, $course_id, $currentPage,'course_class_id,class_id,class_name,term,term_year,is_group');
        if($currentPage!=0){
            $totalCount = $this->course->getCourseClassesCount($user_id, $course_id);
            $result=array('classes' => $classes, 'totalCount' => $totalCount, 'perPage' => C('PAGE_SIZE'));
        }else{
            $result=array('classes' => $classes);
        }
//        if($this->course->checkTeacherInCourse($user_id,$course_id)){
//
//        }else{
//            $result='';
//        }

        $this->response($result,'json');
    }
}