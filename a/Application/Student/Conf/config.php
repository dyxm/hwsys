<?php
return array(
    'URL_ROUTE_RULES'=>array(
        //测试路由
        array('test$', 'Student/Test/test', array('method' => 'get')),

        /********* 作业 *********/
        //作业集
        array('homeworks/:userID\d/:status\d/:currentPage\d', 'Student/Homework/homeworks', array('method' => 'get')),
        //作业详情
        array('homeworkDetail/:userID\d/:homeworkID\d', 'Student/Homework/homework', array('method' => 'get')),
        //作业总数
        array('homeworkCount/:userID\d/:status\d', 'Student/Homework/homeworkCount', array('method' => 'get')),
        //上传作业
        array('uploadHomework/:userID\d/:homeworkID\d', 'Student/Homework/uploadHomework', array('method' => 'post')),
        //设置作业公开/不公开
        array('changeHomeworkProperty', 'Student/Homework/changeHomeworkProperty', array('method' => 'post')),

        /********* 班级 *********/
        //班级列表
        array('classes/:userID\d/:class_type\d/:currentPage\d', 'Student/Class/classes', array('method' => 'get')),
        //班级详情
        array('classDetail/:userID\d/:classID\d','Student/Class/class',array('method' => 'get')),

        /********* 课程 *********/
        //课程列表
        array('courses/:userID\d/:course_type\d/:currentPage\d', 'Student/Course/courses', array('method' => 'get')),
        //课程详情
        array('courseDetail/:userID\d/:course_class_id\d','Student/Course/course',array('method' => 'get')),

        /********* 分组 *********/
        //新建分组
        array('newGroup$','Student/Group/newGroup',array('method' => 'post')),
        //解散分组
        array('dissolveGroup$','Student/Group/dissolveGroup',array('method' => 'post')),
        //移出小组成员
        array('removeMember$','Student/Group/removeMember',array('method' => 'post')),
        //加入分组
        array('joinGroup$','Student/Group/joinGroup',array('method' => 'post')),
    ),
);