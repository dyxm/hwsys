<?php
return array(
    //静态路由
    'URL_ROUTE_RULES'=>array(
        //测试路由
        array('test$', 'Teacher/Test/test', array('method' => 'get')),

        /********* 班级 *********/
        //班级列表
        array('classes/:userID\d/:class_type\d/:currentPage\d', 'Teacher/Class/classes', array('method' => 'get')),

        /********* 课程 *********/
        //课程列表
        array('courses/:userID\d/:course_type\d/[:currentPage\d]', 'Teacher/Course/courses', array('method' => 'get')),
        array('courseClasses/:userID\d/:course_id\d/[:currentPage\d]', 'Teacher/Course/courseClasses', array('method' => 'get')),

        /********* 任务 *********/
        //任务列表
        array('tasks/:userID\d/[:course_class_id\d]/:currentPage\d', 'Teacher/Task/tasks', array('method' => 'get')),
        //任务详情
        array('task/:userID\d/:task_id\d', 'Teacher/Task/task', array('method' => 'get')),
        //创建任务
        array('createTask', 'Teacher/Task/createTask', array('method' => 'post')),
        //上传任务附件
        array('uploadAttachFile/:userID\d/:task_id\d', 'Teacher/Task/uploadAttachFile', array('method' => 'post')),
    ),
);