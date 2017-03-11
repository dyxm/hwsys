<?php
namespace Student\Event;

class MajorEvent{

    //获取专业信息
    public function getMajorInfo($major_id,$field=''){
        return M('major')->field($field)->where(array('major_id' => $major_id, 'status' => '1'))->find();
    }

   //获取专业名字
    public function getMajorName($major_id){
        return $this->getMajorInfo($major_id,'major_name')['major_name'];
    }
}