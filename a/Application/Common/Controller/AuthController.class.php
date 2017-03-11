<?php
namespace Common\Controller;

use Think\Controller\RestController;
use Think\Auth;

class AuthController extends RestController{

    protected $_config = array('AUTH_USER' => 'role');             // 用户信息表

    protected function _initialize(){
        $sess_auth = session('auth');
//        if (!$sess_auth) {
//            $this->error('非法访问！正在跳转登录页面！', U('Login/index'));
//        }
//        if ($sess_auth['uid'] == 1) {
//            return true;
//        }
//        $auth = new Auth();
//        if (!$auth->check(MODULE_NAME . '/' . CONTROLLER_NAME . '/' . ACTION_NAME, $sess_auth['uid'])) {
//            $this->error('没有权限');
//        }
    }
}