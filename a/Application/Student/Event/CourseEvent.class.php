<?php
namespace Student\Event;

class CourseEvent{
    /**
     * 获取课程集
     * @param $user_id
     * @param $course_type 0为专业必修，1为公共必修，2为选修
     * @param $currentPage
     * @param string $field 查询字段
     * @return mixed|null
     */
    public function getCourses($user_id,$course_type,$currentPage,$field=''){
        $classIDs=($course_type==0)?A('Student', 'Event')->getStudentClassID($user_id):A('Student', 'Event')->getStudentClassIDs($user_id);
        if($classIDs){
            $map['class_id']=array('in',$classIDs);
            $map['course_type']=array('eq',$course_type);
            $map['class_status']=array('eq',1);
            $map['course_status']=array('eq',1);
            $courses=D('course_class')->field($field)->where($map)->page($currentPage, C('PAGE_SIZE'))->order('assign_date DESC')->select();
        }else{
            return null;
        }
        return $this->fillMoreInfo($courses);
    }

    /**
     * 获取某课程全部信息
     * @param $course_class_id
     * @return mixed
     */
    public function getCourseInfo($course_class_id,$field=''){
        $courseInfo[0]=D('course_class')->field($field)->where(array('course_class_id' => $course_class_id, 'course_status' => '1'))->find();
        return $this->fillMoreInfo($courseInfo)[0];
    }

    /**
     * 获取课程总数
     * @param $user_id
     * @param $course_type 0为专业必修，1为公共必修，2为选修
     * @return mixed
     */
    public function getCourseCount($user_id,$course_type){
        $classIDs=($course_type==0)?A('Student', 'Event')->getStudentClassID($user_id):A('Student', 'Event')->getStudentClassIDs($user_id);
        $map['class_id'] = array('in', $classIDs);
        $map['course_type'] = array('eq', $course_type);
        $map['class_status'] = array('eq', 1);
        $map['course_status'] = array('eq', 1);

        return D('course_class')->where($map)->count();
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
     * 检查用户是否有权访问该课程
     * @param int $user_id
     * @param int $course_class_id
     * @return bool
     */
    public function checkUserInCourse($user_id,$course_class_id){
        $class_id=M('course_class')->where(array('course_class_id'=>$course_class_id))->find()['class_id'];
        return A('Class', 'Event')->checkUserInClass($user_id,$class_id);
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
        foreach ($courses as $index => $c) {
            if ($c['teacher_id']) {
                $courses[$index]['teacher_name'] = $teacher->getTeacherName($c['teacher_id']);
            }
        }
        return $courses;
    }
}