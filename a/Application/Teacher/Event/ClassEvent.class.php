<?php
namespace Teacher\Event;

class ClassEvent{
//    /**
//     * 获取班级集合
//     * @param int $user_id
//     * @param int $type 班级类别，0为普通班级，1为公共课班级，2为选修课班级
//     * @param int $currentPage 当前页
//     * @param string $field 选填
//     * @return array D('course_class')
//     */
//    public function getClasses($user_id,$class_type,$currentPage,$field=''){
//        $student = A('Student', 'Event');
//        $class = D('Class');
//        if ($class_type == 0) {
//            $userInfo = $student->getStudentInfo($user_id);
//            $classes[0] = $this->getClassInfo($userInfo['class_id']);
//        } else {
////            $classes = $class->where(array('student_id' => $user_id, 'type' => $class_type,'status'=>1))
////                ->page($currentPage, C('PAGE_SIZE'))->order('create_date ASC')->select();
////            $classes = $this->fillMoreInfo($classes);
//            $classIDs=$student->getStudentClassIDs($user_id);
//            if($classIDs){
//                $map['class_id']=array('in',$classIDs);
//                $map['class_type']=array('eq',$class_type);
//                $map['class_status']=array('eq',1);
//                $map['course_status']=array('eq',1);
//                $classes=D('course_class')->where($map)->page($currentPage, C('PAGE_SIZE'))->order('class_create_date DESC')->select();
//                $classes = $this->fillMoreInfo($classes);
//            }else{
//                return null;
//            }
//        }
//        //添加班级人数
//        foreach ($classes as $index => $c) {
//            $classes[$index]['student_count'] = $this->getClassStuCount($c['class_id']);
//        }
//
//        return $classes;
//    }
//
    //获取班级全部信息
    public function getClassInfo($class_id){
        $class_type=$this->getClassType($class_id);
        if($class_type==0){
            $class = M('class')->where(array('class_id' => $class_id, 'class_status' => '1'))->find();
        }else{
            $map['class_id']=array('eq',$class_id);
            $map['class_type']=array('eq',$class_type);
            $map['class_status']=array('eq',1);
            $map['course_status']=array('eq',1);
            $class=D('course_class')->where($map)->order('class_create_date ASC')->find();
        }
        $classInfo[0] = $class;
        $classInfo = $this->fillMoreInfo($classInfo);

        return $classInfo[0];
    }
//
    //获取班级名字
    public function getClassName($class_id){
        $data = $this->getClassInfo($class_id);
        if ($data['class_name']) {
            return $data['class_name'] . '【'.$data['class_sort'].'】班';
        } else {
            $major = A('Major', 'Event');
            return $data['class_grade'] . '级' . $major->getMajorName($data['major_id']) . '【' . $data['class_sort'] . '】班';
        }
    }
//
//    /**
//     * 获取班级总数
//     * @param $user_id 用户id
//     * @param $class_type 班级类别
//     * @return array
//     */
//    public function getClassCount($user_id, $class_type){
//        return ($class_type == 0) ? 1 : D('class')->where(array('student_id' => $user_id, 'class_type' => $class_type))->count();
//    }
//
    /**
     * 获取单个班级的人数
     * @param $class_id
     * @return int
     */
    public function getClassStuCount($class_id){
        $student = M('student');
        $class_student = M('class_student');
        $class_type = $this->getClassType($class_id);
        $map['class_id'] = array('eq', $class_id);
        return $class_type == 0 ? $student->where($map)->count() : $class_student->where($map)->count();
    }
//
//    /**
//     * 检查用户是否有权访问该班级
//     * @param int $user_id
//     * @param int $class_id
//     * @return bool
//     */
//    public function checkUserInClass($user_id,$class_id){
//        $class_type = $this->getClassType($class_id);
//        if ($class_type == 0) {
//            $student = A('Student', 'Event')->getStudentInfo($user_id);
//            return ($student['class_id'] == $class_id) ? true : false;
//        } else {
//            return M('class_student')->where(array('student_id' => $user_id, 'class_id' => $class_id))->find() ? true : false;
//        }
//    }
//
    //获取班级所有学生信息
    public function getClassStudents($class_id,$field=''){
        $class_type = $this->getClassType($class_id);
        if ($class_type == 0) {
            return M('student')->field($field)->where(array('class_id' => $class_id))->order('stu_number ASC')->select();
        } else {
            return D('class_student')->field($field)->where(array('class_id' => $class_id))->order('stu_number ASC')->select();
        }
    }

    //获取班级所有学生的id
    public function getClassStudentIDs($class_id){
        $students=$this->getClassStudents($class_id,'student_id');
        foreach ($students as $s){
            $ids[]=$s['student_id'];
        }
        return $ids;
    }
    /**
     * 获取班级类型
     * @param $class_id
     * @return mixed
     */
    public function getClassType($class_id){
        return M('class')->where(array('class_id' => $class_id, 'class_status' => '1'))->find()['class_type'];
    }
//
//    /**
//     * 填充班级的更多信息
//     * @param $classes
//     */
    private function fillMoreInfo($classes){
        $major = A('Major', 'Event');
        $teacher = A('Teacher', 'Event');
        $student = A('Student', 'Event');
        foreach ($classes as $index => $c) {
            if ($c['major_id']) {
                $classes[$index]['major_name'] = $major->getMajorName($c['major_id']);
            }
            if ($c['teacher_id']) {
                $classes[$index]['teacher_name'] = $teacher->getTeacherName($c['teacher_id']);
            }
            if ($c['monitor_id']) {
                $classes[$index]['monitor_name'] = $student->getStudentName($c['monitor_id']);
            }
            $classes[$index]['student_count'] = $this->getClassStuCount($c['class_id']);
        }
        return $classes;
    }
}