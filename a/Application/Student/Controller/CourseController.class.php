<?php
namespace student\Controller;

use Common\Controller\AuthController;

class CourseController extends AuthController{
    private $course;

    public function __construct(){
        parent::__construct();
        $this->course = A('Course', 'Event');
    }

    /**
     * 获取课程集合
     */
    public function courses_get_json(){
        $user_id = I('get.userID');
        $course_type = I('get.course_type');
        $currentPage = I('get.currentPage');
        $courses = $this->course->getCourses($user_id, $course_type, $currentPage,'course_class_id,course_name,term,term_year,teacher_id,is_group,grouping_deadline');
        $totalCount = $this->course->getCourseCount($user_id, $course_type);

        $this->response(array('courses' => $courses, 'totalCount' => $totalCount, 'perPage' => C('PAGE_SIZE')), 'json');
    }

    /**
     * 获取单个课程详情
     */
    public function course_get_json(){
        $user_id = I('get.userID');
        $course_class_id = I('get.course_class_id');
        if ($this->course->checkUserInCourse($user_id, $course_class_id)) {
            $courseInfo = $this->course->getCourseInfo($course_class_id,'course_class_id,course_name,course_info,term,term_year,teacher_id,is_group,max_member_count,grouping_deadline');
            $groups = D('Group','Event')->getGroups($course_class_id);
        }
        $this->response(array('courseInfo'=>$courseInfo,'groups'=>$groups), 'json');
    }

}