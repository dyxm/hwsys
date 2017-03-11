<?php
namespace Teacher\Event;
use Org\Util\Date;
use Think\Upload;
class TaskEvent{
    /**
     * 返回一条task
     * @param int $task_id
     * @return array
     */
    public function getOneTask($task_id,$field=''){
        $tasks=D('task')->field($field)->where(array('task_id'=>$task_id))->select();
        $task=$this->fillMoreInfo($tasks);
        return $task[0];
    }

    /**
     * 获取任务集
     * @param $teacher_id
     * @param $course_class_id
     * @param $currentPage
     * @param string $field
     * @return mixed
     */
    public function getTasks($teacher_id, $course_class_id, $currentPage, $field=''){
        $tasks=M('task')->field($field)->where(array('teacher_id'=>$teacher_id,'course_class_id'=>$course_class_id))->page($currentPage, C('PAGE_SIZE'))->order('task_create_date DESC')->select();
        return $this->fillMoreInfo($tasks);
    }

    /**
     * 获取学生/小组的完成情况
     * @param $task_id
     * @return mixed
     */
    public function getUploadInfo($task_id,$field=''){
        $uploadInfo=D('homework')->field($field)
            ->where(array('task_id' => $task_id))->order('stu_number,group_id ASC')->select();
        return $this->fillMoreInfo($uploadInfo);
    }

    /**
     * 获取任务总数
     * @param $teacher_id
     * @param $course_class_id
     * @return mixed
     */
    public function getTaskCount($teacher_id, $course_class_id){
        return M('task')->where(array('teacher_id'=>$teacher_id,'course_class_id'=>$course_class_id))->count();
    }

    /**
     * 创建任务
     * @param $teacher_id
     * @param $taskData
     * @return mixed
     */
    public function createTask($teacher_id,$taskData){
        $work_id = A('Teacher', 'Event')->getTeacherInfo($teacher_id, 'work_id')['work_id'];
        $root = $work_id . '/' . $taskData['course_name'] . '/' . $taskData['class_name'] . '/' . $taskData['task_name'] . '/';
        $taskData['upload_path'] = $root . 'homeworks/';
        $taskData['attach_file_path'] = $root . 'attach_file/';
        $taskData['teacher_id'] = $teacher_id;
        $taskData['task_create_date'] = date('Y-m-d H:i:s', time());
        $task_id = M('task')->data($taskData)->add();
        if ($task_id) {
            if ($taskData['is_apply_group'] == 0) {
                A('Homework', 'Event')->addHomeworks($task_id, $taskData['is_apply_group'], $taskData['class_id']);
            } else {
                A('Homework', 'Event')->addHomeworks($task_id, $taskData['is_apply_group'], $taskData['course_class_id']);
            }
        }
        return $task_id;
    }

    /**
     * 检查是否为任务创建者
     * @param $teacher_id
     * @param $task_id
     * @return bool
     */
    public function checkIsCreator($teacher_id,$task_id){
        return M('teacher')->where(array('teacher_id' => $teacher_id, 'task_id' => $task_id))->find() ? true : false;
    }

    /**
     * 更新任务
     * @param $task_id
     * @param $updateData
     * @return bool
     */
    public function updateTask($task_id,$updateData){
        return M('task')->where(array('task_id' => $task_id))->save($updateData);
    }

    /**
     * 获取已交作业人数
     * @param $task_id
     * @return mixed
     */
    public function getUploadedCount($task_id){
        return M('homework')->where(array('task_id' => $task_id, 'status' => 1))->count();
    }

    /**
     * 获取未交作业人数
     * @param $task_id
     * @return mixed
     */
    public function getNoUploadCount($task_id){
        return M('homework')->where(array('task_id' => $task_id, 'status' => 0))->count();
    }

    /**
     * 上传附件
     * @param $task_id
     * @param $file
     * @return array
     */
    public function uploadAttachFile($task_id,$file){
        $attach_file_path = $this->getOneTask($task_id, 'attach_file_path')['attach_file_path'];
        //创建上传对象
        $upload = new Upload();
        $upload->maxsize = C('UPLOAD_MAX_SIZE');
        $upload->exts = C('UPLOAD_EXTS');
        $upload->rootPath = C('UPLOAD_ROOT_PATH') . C('UPLOAD_FILE_PATH');
        $upload->subName = iconv('utf-8', 'gbk', $attach_file_path);
        $upload->saveName = iconv('utf-8', 'gbk', $file['name'].explode('.')[0]);
        $upload->replace = true;//覆盖同名文件;

        //开始上传
        $uploadInfo = $upload->uploadOne($file);
        if ($uploadInfo) {
            //上传成功更新数据库
            $updateData['attach_file_name'] = $file['name'];
            $updateData['attach_file_path'] = C('UPLOAD_FILE_PATH') .$attach_file_path;
            $result = $this->updateTask($task_id, $updateData)
                ? array('status' => true)
                : array('status' => false, 'msg' => '附件上传失败！');
        } else {
            $result = array('status' => false, 'msg' => $upload->getError());
        }

        return $result;
    }

    /**
     * 填充更多信息
     * @param $tasks
     * @return mixed
     */
    private function fillMoreInfo($tasks){
        date_default_timezone_set('PRC');
        $now = time();
        $student = A('student', 'Event');
        $course = A('course', 'Event');
        $class = A('class', 'Event');
        $group = A('Group', 'Event');
        foreach ($tasks as $index => $t) {
            if($t['student_id']){
                $tasks[$index]['student_name'] = $student->getStudentName($t['student_id']);
            }
            if($t['course_id']){
                $tasks[$index]['course_name'] = $course->getCourseName($t['course_id']);
            }
            if($t['class_id']){
                $tasks[$index]['class_name'] = $class->getClassName($t['class_id']);
            }
            if($t['group_id']){
                $tasks[$index]['group_name'] = $group->getGroupName($t['group_id']);
            }
            if ($t['deadline']) {
                $tasks[$index]['deadline'] = strtotime($t['deadline']);
                $tasks[$index]['isDeadline'] = $tasks[$index]['deadline'] < $now ? 1 : 0;
            }
            if ($t['task_create_date']) {
                $tasks[$index]['task_create_date'] = strtotime($t['task_create_date']);
            }
        }
        return $tasks;
    }
}