<?php
namespace Teacher\Event;
use Think\Upload;
class HomeworkEvent{
    /**
     * 添加多条作业
     * @param $task_id
     * @param $is_apply_group 是否分组完成
     * @param $c_o_c_id 单独完成时为class_id，小组完成时为course_class_id
     * @return bool|string
     */
    public function addHomeworks($task_id,$is_apply_group,$c_or_cc_id){
        if($is_apply_group==1){
            $ids=A('Group','Event')->getGroupIDs($c_or_cc_id);
            foreach ($ids as $id){
                $dataList[] = array('task_id'=>$task_id,'group_id'=>$id);
            }
        }else{
            $ids=A('Class','Event')->getClassStudentIDs($c_or_cc_id);
            foreach ($ids as $id){
                $dataList[] = array('task_id'=>$task_id,'student_id'=>$id);
            }
        }
        return M('homework')->addAll($dataList);
    }

//    /**
//     * 获取单个作业详情
//     * @param int $user_id
//     * @param int $homework_id
//     * @return array
//     */
//    public function getOneHomework($user_id,$homework_id,$field=''){
//        $homework = D('homework')->field($field)->where(array('homework_id' => $homework_id, 'homework.student_id' => $user_id))->select();
//        $homework = $this->fillMoreInfo($homework);
//        return $homework[0];
//    }
//
//
//    /**
//     * 获取某用户作业集合
//     * @param int $user_id 用户id
//     * @param int $status 0表查询未交且没过截止日期的作业，1表查询过了截止日期或已上交的作业
//     * @param int $currentPage 查询第几页
//     * @param string $field 查询字段
//     * @return array
//     */
//    public function getUserHomeworks($user_id,$status,$currentPage,$field=''){
//        if ($status == 0) {
//            $map['homework.student_id'] = array('eq', $user_id);
//            $map['homework.status'] = array('eq', $status);
//            $map['deadline'] = array('gt', date('Y-m-d H:i:s', time()));
//        } else {
//            $map = "homework.student_id=" . $user_id . " AND ( deadline < '" . date('Y-m-d H:i:s', time()) . "' OR homework.status=1 )";
//        }
//        $homeworks = D('homework')->field($field)->where($map)->page($currentPage, C('PAGE_SIZE'))->order('create_date ASC')->select();
//        $homeworks = $this->fillMoreInfo($homeworks);
//        return $homeworks;
//    }
//
//    public function getUploadInfo($user_id,$homework_id){
//        $homework = $this->getOneHomework($user_id, $homework_id);
//        $uploadInfo=D('homework')->field('homework_id,student_id,stu_number,group_id,file_path,status,is_open,grade')
//            ->where(array('task_id' => $homework['task_id']))->order('stu_number,group_id ASC')->select();
//        return $this->fillMoreInfo($uploadInfo);
//    }
//
//    /**
//     * 获取作业总数
//     * @param int $user_id
//     * @param int $status
//     * @return array
//     */
//    public function getHomeworkCount($user_id,$status){
//        $map['homework.student_id'] = array('eq', $user_id);
//        if ($status == 0) {
//            $map['homework.status'] = array('eq', $status);
//            $map['deadline'] = array('gt', date('Y-m-d H:i:s', time()));
//        } else {
//            $map['deadline'] = array('lt', date('Y-m-d H:i:s', time()));
//        }
//        return D('homework')->where($map)->count();
//    }
//
//    /**
//     * 设置作业公开/不公开状态
//     * @param $userID
//     * @param $homework_id
//     * @param $is_open
//     * @return bool
//     */
//    public function changeHomeworkProperty($userID,$homework_id,$is_open){
//        $data['is_open']=$is_open;
//        return M('homework')->where(array('student_id'=>$userID,'homework_id'=>$homework_id))->save($data);
//    }
//
//    /**
//     * 上传作业
//     * @param $user_id
//     * @param $homework_id
//     * @param $file
//     * @return array
//     */
//    public function uploadHomework($user_id,$homework_id,$file){
//        //信息准备
//        $homework = $this->getOneHomework($user_id, $homework_id);
//        $student = A('Student', 'Event')->getStudentInfo($homework['student_id'], 'name, stu_number');
//        $subName = $homework['upload_path'];
//        $saveName = $homework['course_name'] . $homework['task_name'] . '_' . $student['name'] . '_' . $student['stu_number'];
//        //创建上传对象
//        $upload = new Upload();
//        $upload->maxsize = C('UPLOAD_MAX_SIZE');
//        $upload->exts = C('UPLOAD_EXTS');
//        $upload->rootPath = C('UPLOAD_ROOT_PATH') . C('UPLOAD_FILE_PATH');
//        $upload->subName = iconv('utf-8', 'gbk', $subName);
//        $upload->saveName = iconv('utf-8', 'gbk', $saveName);
//        $upload->replace = true;//覆盖同名文件;
//
//        //开始上传
//        $uploadInfo = $upload->uploadOne($file);
//        if ($uploadInfo) {
//            //上传成功更新数据库
//            $updateData['status'] = 1;
//            $updateData['upload_date'] = date('Y-m-d H:i:m', time());
//            $updateData['file_name'] = $saveName . '.' . $uploadInfo['ext'];
//            $updateData['file_path'] = 'uploads/files/' . $subName . $saveName . '.' . $uploadInfo['ext'];
//
//            $result = $this->updateHomework($homework_id, $updateData)
//                ? array('status' => true, 'homework' => $this->getOneHomework($user_id, $homework_id))
//                : array('status' => false, 'msg' => '上交失败！');
//        } else {
//            $result = array('status' => false, 'msg' => $upload->getError());
//        }
//
//        return $result;
//    }
//
//    //检查是否已交作业
//    public function checkIsUpload($homework_id){
//        return M('homework')->where(array('homework_id' => $homework_id, 'status' => 1))->find() ? true : false;
//    }
//
//    //获取已交作业人数
//    public function getUploadedCount($task_id){
//        return M('homework')->where(array('task_id' => $task_id, 'status' => 1))->count();
//    }
//
//    //获取未交作业人数
//    public function getNoUploadCount($task_id){
//        return M('homework')->where(array('task_id' => $task_id, 'status' => 0))->count();
//    }
//
//    /**
//     * 更新作业
//     * @param $homework_id
//     * @param $updateData
//     * @return bool
//     */
//    private function updateHomework($homework_id,$updateData){
//        return M('homework')->where(array('homework_id' => $homework_id))->save($updateData);
//    }
//
//    /**
//     * 填充班级名、教师名、课程名
//     * @param array $homeworks
//     * @return array
//     */
//    private function fillMoreInfo($homeworks){
//        $teacher = A('Teacher', 'Event');
//        $student = A('student', 'Event');
//        $class = A('Class', 'Event');
//        $course = A('Course', 'Event');
//        $group = A('Group', 'Event');
//        foreach ($homeworks as $index => $d) {
//            if ($d['class_id']) {
//                $homeworks[$index]['class_name'] = $class->getClassName($d['class_id']);
//            }
//            if ($d['teacher_id']) {
//                $homeworks[$index]['teacher_name'] = $teacher->getTeacherName($d['teacher_id']);
//            }
//            if ($d['course_id']) {
//                $homeworks[$index]['course_name'] = $course->getCourseName($d['course_id']);
//            }
//            if($d['student_id']){
//                $homeworks[$index]['student_name'] = $student->getStudentName($d['student_id']);
//            }
//            if($d['group_id']){
//                $homeworks[$index]['group_name'] = $group->getGroupName($d['group_id']);
//            }
//        }
//        return $homeworks;
//    }
}