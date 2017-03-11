<?php
namespace Teacher\Controller;
use Common\Controller\AuthController;
class TaskController extends AuthController{
    private $task;

    public function __construct(){
        parent::__construct();
        $this->task = A('Task', 'Event');
    }

    //获取任务集
    public function tasks_get_json(){
        $user_id = I('get.userID');
        $course_class_id=I('get.course_class_id');
        $currentPage = I('get.currentPage');
        $tasks=$this->task->getTasks($user_id, $course_class_id, $currentPage);
        $totalCount = $this->task->getTaskCount($user_id, $course_class_id);
        $result=array('tasks' => $tasks, 'totalCount' => $totalCount, 'perPage' => C('PAGE_SIZE'));

        $this->response($result,'json');
    }

    //任务详情
    public function task_get_json(){
        $user_id = I('get.userID');
        $task_id=I('get.task_id');
        if($this->task->checkIsCreator($user_id,$task_id)){
            $task=$this->task->getOneTask($task_id);
            $uploadInfo=null;
            if($task){
                $task['uploaded_count']=$this->task->getUploadedCount($task['task_id']);
                $task['noUpload_count']=$this->task->getNoUploadCount($task['task_id']);
                $uploadInfo=$this->task->getUploadInfo($task_id,'student_id,stu_number,group_id,file_path,status,grade');
            }
            $result=array('task' => $task,'uploadInfo'=>$uploadInfo);
        }else{
            $result='';
        }
        $this->response($result,'json');
    }

    //创建任务
    public function createTask_post_json(){
        $user_id = I('post.userID');
        $taskData=I('post.taskData');

        if(A('Teacher','Event')->checkIsTeacher($user_id)){
            $task_id = $this->task->createTask($user_id, $taskData);
            if($task_id){
                $result=array('status' => true, 'task_id' => $task_id);
            }else{
                $result=array('status' => false,'msg'=>'任务创建失败');
            }
        }else{
            $result=array('status' => false,'msg'=>'您无权创建任务');
        }

        $this->response($result,'json');
    }

    //上传附件
    public function uploadAttachFile_post_json(){
        $user_id = I('get.userID');
        $task_id=I('get.task_id');
        $file=$_FILES['file'];
        if ($this->task->checkIsCreator($user_id,$task_id)) {
            $result=$this->task->uploadAttachFile($task_id,$file);
        } else {
            $result = array('status' => false, 'msg' => '任务不存在');
        }

        $this->response($result,'json');
    }
}