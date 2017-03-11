<?php
namespace Teacher\Event;

class CourseEvent{
    /**
     * 获取课程集
     * @param $user_id
     * @param $course_type 0为专业必修，1为公共必修，2为选修，3为全部
     * @param $currentPage 0为查询该类的全部，1为第一页，2,3,4,以此类推
     * @param string $field 查询字段
     * @return mixed|null
     */
    public function getCourses($user_id,$course_type,$currentPage,$field=''){
        if ($course_type != 3) {
            if($currentPage==0){
                //不分页
                $courses = M('course')->field($field)->where(array('teacher_id' => $user_id, 'course_type' => $course_type))->order('course_create_date DESC')->select();
            }else{
                //分页
                $courses = M('course')->field($field)->where(array('teacher_id' => $user_id, 'course_type' => $course_type))->page($currentPage, C('PAGE_SIZE'))->order('course_create_date DESC')->select();
            }
        } else {
            //全部课程，不分类
            if($currentPage==0) {
                //不分页
                $courses = M('course')->field($field)->where(array('teacher_id' => $user_id))->order('course_create_date DESC')->select();
            }
        }

        return $this->fillMoreInfo($courses);
    }

    /**
     * 获取课程所分配的班级
     * @param $teacher_id
     * @param $course_id
     * @param $currentPage 0为查询全部，从1开始进行分页
     * @param string $field
     * @return array
     */
    public function getCourseClasses($teacher_id,$course_id,$currentPage,$field=''){
        if($currentPage!=0){
            $classes=D('course_class')->field($field)->where(array('course.teacher_id'=>$teacher_id,'course_id'=>$course_id))->page($currentPage, C('PAGE_SIZE'))->order('assign_date DESC')->select();
        }else{
            $classes=D('course_class')->field($field)->where(array('course.teacher_id'=>$teacher_id,'course_id'=>$course_id))->order('assign_date DESC')->select();
        }

        return $this->fillMoreInfo($classes);
    }

    /**
     * 获取课程所分配的班级总数
     * @param $teacher_id
     * @param $course_id
     * @return mixed
     */
    public function getCourseClassesCount($teacher_id,$course_id){
        return D('course_class')->where(array('course.teacher_id'=>$teacher_id,'course_id'=>$course_id))->count();
    }

    /**
     * 获取某课程全部信息
     * @param $course_class_id
     * @return mixed
     */
//    public function getCourseInfo($course_class_id,$field=''){
//        $courseInfo[0]=D('course_class')->field($field)->where(array('course_class_id' => $course_class_id, 'course_status' => '1'))->find();
//        return $this->fillMoreInfo($courseInfo)[0];
//    }

    /**
     * 获取课程总数
     * @param $user_id
     * @param $course_type 0为专业必修，1为公共必修，2为选修
     * @return mixed
     */
    public function getCourseCount($user_id,$course_type){
        return M('course')->where(array('teacher_id' => $user_id, 'course_type' => $course_type))->count();
    }

    /**
     * 获取课程名字
     * @param $course_id
     * @return mixed
     */
    public function getCourseName($course_id){
        return M('course')->where(array('course_id'=>$course_id))->find()['course_name'];
    }

    /**
     * 检查用户（教师）是否有权访问该课程
     * @param int $user_id
     * @param int $course_class_id
     * @return bool
     */
    public function checkTeacherInCourse($teacher_id,$course_id){
        return M('course')->where(array('teacher_id' => $teacher_id, 'course_id' => $course_id))->find() ? true : false;
    }

    /**
     * 获取课程类型
     * @param $course_id
     * @return mixed 0为专业必修，1为公共必修，2为选修
     */
    public function getClassType($course_id){
        return M('course')->where(array('course_id' => $course_id, 'course_status' => '1'))->find()['course_type'];
    }

    /**
     * 填充更多信息
     * @param array $courses
     * @return array
     */
    private function fillMoreInfo($courses){
        $teacher = A('Teacher', 'Event');
        $class = A('Class', 'Event');
        foreach ($courses as $index => $c) {
            if ($c['teacher_id']) {
                $courses[$index]['teacher_name'] = $teacher->getTeacherName($c['teacher_id']);
            }
            if ($c['class_id']) {
                $courses[$index]['class_name'] = $class->getClassName($c['class_id']);
            }
        }
        return $courses;
    }
}