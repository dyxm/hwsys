<?php
namespace student\Controller;
use Common\Controller\AuthController;
class HomeworkController extends AuthController{
    private $homework;

    public function __construct(){
        parent::__construct();
        $this->homework=A('Homework','Event');
    }

    /**
     * 获取作业集合
     */
    public function homeworks_get_json(){
        $userID=I('get.userID');
        $status=I('get.status');
        $currentPage=I('get.currentPage');
        $homeworks = $this->homework->getUserHomeworks($userID,$status,$currentPage,'homework_id,teacher_id,course_id,class_id,task_name,status,deadline');
        $totalCount= $this->homework->getHomeworkCount($userID,$status);
        $this->response(array('homeworks'=>$homeworks,'totalCount'=>$totalCount,'perPage'=>C('PAGE_SIZE')),'json');
    }

    /**
     * 获取单个作业详情
     */
    public function homework_get_json(){
        $userID=I('get.userID');
        $homework_id=I('get.homeworkID');

        $homework = $this->homework->getOneHomework($userID,$homework_id);
        $uploadInfo=null;
        if($homework){
            $homework['uploaded_count']=$this->homework->getUploadedCount($homework['task_id']);
            $homework['noUpload_count']=$this->homework->getNoUploadCount($homework['task_id']);
            $uploadInfo=$this->homework->getUploadInfo($userID,$homework_id);
        }

        $result=array('homeworkInfo'=>$homework,'uploadInfo'=>$uploadInfo);

        $this->response($result,'json');
    }

    /**
     * 上传作业
     */
    public function uploadHomework_post_json(){
        $userID=I('get.userID');
        $homework_id=I('get.homeworkID');
        $file=$_FILES['file'];
        $homework = $this->homework->getOneHomework($userID,$homework_id);
        if ($homework) {
            if (($homework['is_apply_group'] == 0) || ($homework['is_apply_group'] == 1 && A('Group', 'Event')->checkIsLeader($userID))) {
                $result = $this->homework->uploadHomework($userID, $homework_id, $file);
            } else {
                $result = array('status' => false, 'msg' => '组长才能上交作业');
            }
        } else {
            $result = array('status' => false, 'msg' => '作业不存在');
        }

        $this->response($result,'json');
    }

    //更改作业状态，公开/不公开
    public function changeHomeworkProperty_post_json(){
        $userID = I('post.userID');
        $homework_id = I('post.homeworkID');
        $is_open = I('post.is_open');
        if ($this->homework->changeHomeworkProperty($userID, $homework_id, $is_open)) {
            $msg = ($is_open == 0) ? '作业已设置为不公开状态' : '作业已设置为公开状态';
            $result = array('status' => true, 'msg' => $msg);
        } else {
            $result = array('status' => false, 'msg' => '修改失败');
        }

        $this->response($result, 'json');
    }
    /**
     * 获取作业总数
     */
    public function homeworkCount_get_json(){
        $userID=I('get.userID');
        $status=I('get.status');
        $count=$this->homework->getHomeworkCount($userID,$status);
        $this->response(array('homeworkCount'=>$count),'json');
    }

}