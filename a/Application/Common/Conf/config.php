<?php
return array(
    //设置页面调试
    'SHOW_PAGE_TRACE' => true,

    //自定义常量设置
    'PAGE_SIZE' => 10,//客户端分页数
    'UPLOAD_ROOT_PATH' => substr(THINK_PATH, 0, -13),//上传根目录
    'UPLOAD_FILE_PATH' => 'uploads/files/',//文件上传目录
    'UPLOAD_FACE_PATH' => 'uploads/faces/',//头像上传目录
    'UPLOAD_MAX_SIZE'=>20 * 1024 * 1024,//最大上传文件20M
    'UPLOAD_EXTS'=>array('jpg', 'gif', 'png', 'jpeg', 'doc', 'xls', 'rar', 'zip', 'txt', 'ppt', 'pptx', 'docx','pdf'),//允许上传后缀名
    /* 'ADMIN_PAGE_SIZE'=>10,//管理端分页数

     'PREVIEW_PATH'=>'Preview/',//预览文件根目录*/


    //mysql全局定义
    'DB_TYPE'=>'mysql',
    'DB_HOST'=>'localhost',
    'DB_USER'=>'root',
    'DB_PWD'=>'',
    'DB_NAME'=>'hwsys',
    'DB_PORT'=>3306,
    'DB_PREFIX'=>'hw_',

    //session配置
    //'SESSION_PREFIX'=>'hw_',

    //邮件服务配置
    /*'THINK_EMAIL' => array(
        'SMTP_HOST'   => 'smtp.163.com', //SMTP服务器exmail.
        'SMTP_PORT'   => '25', //SMTP服务器端口
        'SMTP_USER'   => 'kkdyxm' , //SMTP服务器用户名
        'SMTP_PASS'   => 'kkcjlwxhn1234',//'kkcjlwxhn123',//'jgjpuiyjttfbbcgf','yhihxuilwbpkbffa', 'lnpjgbbxhawqbdfa'//SMTP服务器密码
        'FROM_EMAIL'  => 'kkdyxm@163.com', //发件人EMAIL
        'FROM_NAME'   => '作业帮手', //发件人名称
        'REPLY_EMAIL' => '', //回复EMAIL（留空则为发件人EMAIL）
        'REPLY_NAME'  => '', //回复名称（留空则为发件人名称）
    ),*/


    /*'TMPL_PARSE_STRING'  =>array(
        //'__PUBLIC__' => '/Common', // 更改默认的/Public 替换规则
        //'__JS__'     => '/Public/JS/', // 增加新的JS类库路径替换规则
        '__UPLOAD__' => __ROOT__.'/Upload/', // 相对路径
        '__ABS_UPLOAD__' => substr(THINK_PATH, 0,-10).'/Upload/', //绝对路径
    ),*/


    //PDO数据库连接
    //'DB_TYPE'=>'mysql',
    //'DB_USER'=>'root',
    //'DB_PWD'=>'',
    //'DB_PREFIX'=>'',
    //'DB_DSN'=>'mysql:host=localhost;dbname=homeworkdb;chartset=utf8;',

    //URL区分大小写
    //'URL_CASE_INSENSITIVE'=>true,

    //URL模式
    //'URL_MODEL'=>'0',//普通模式
    //'URL_MODEL'=>'1',
    'URL_MODEL'=>'2',


    //开启路由功能
    'URL_ROUTER_ON'=>true,

    //动态路由
    'URL_ROUTE_RULES'=>array(
    //登录登出
    array('login$', 'Access/login', array('method' => 'post')),
    array('logout$', 'Access/logout', array('method' => 'post')),
    ),
    //静态路由
    //'URL_MAP_RULES'=>array(),

    //定义顺序传参
    //'URL_PARAMS_BIND_TYPE'=>1,


    //设置伪静态后缀，默认html
    //'URL_HTML_SUFFIX'=>'html|shtml|xml',

    //修改模板文件后缀
    //'TMPL_TEMPLATE_SUFFIX'=>'.tpl',

    //设置允许访问目录列表
    //'MODULE_ALLOW_LIST'=>array('Home','Admin'),
    //'DEFAULT_MODULE'=>'Home',

    //允许二级控制器
    //'CONTROLLER_LEVEL'=>'2',

    //开启静态缓存
    //'HTML_CACHE_ON'=>true,
    //缓存过期时间
    //'HTML_CACHE_TIME'=>60,
    //缓存后缀
    //'HTML_CACHE_SUFFIX'=>'.html',
    //缓存规则
    //'HTML_CACHE_RULES'=>array(
    //	'User:index'=>array('{:module}_{:controller}_{:action}_{id}',60),
    //),
);
