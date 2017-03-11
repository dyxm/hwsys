<?php
namespace Student\Event;

class TaskEvent{
    /**
     * 返回一条task
     * @param int $task_id
     * @return array
     */
    public function getOneTask($task_id,$field=''){
        return M('task')->field($field)->where(array('task_id'=>$task_id))->find();
    }
}