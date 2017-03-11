<?php
namespace Home\Controller;

use Common\Controller\AuthController;

class AccessController extends AuthController{
//    protected $allowMethod = array('get', 'post', 'put', 'delete');
//    protected $defaultType = 'json';

//    public function _initialize(){
//        parent::_initialize();
//    }

    public function login_get_json(){
        dump($this->getUserInfo(1305553107,'123123','Student'));
    }
    //登录接口
    public function login_post_json(){
        //跨域访问设置
//        header('Access-Control-Allow-Origin:*');
//        header('Access-Control-Allow-Headers:x-requested-with,content-type');
        $user = I('post.user');
        $userInfo=$this->getUserInfo($user['id'],$user['pass'],$user['type']);

        if ($userInfo && $userInfo['status']==1) {
            if($userInfo['status']==1){
                $userInfo['type']=$user['type'];
                //生成token
                $token = md5(time());
                //设置session
                session(array('prefix' => 'hw_', 'expire' => 3600));//初始化session
                session($token, $userInfo);

                //设置cookie
                cookie('token',$token,array('expire'=>3600,'prefix'=>'hw_'));

                //获取用户权限
                $userInfo['authList']=$this->getAuthList($userInfo['role']);

                $result = array('status' => true, 'token' => $token, 'userInfo' => $userInfo);
            }else{
                $result = array('status' => false, 'msg' => '账号被禁用，暂不能使用！','da'=>$user);
            }
        } else{
            $result = array('status' => false, 'msg' => '账号或密码错误！');
        }
        $this->response($result, 'json');
    }

    //登出接口
    public function logout_post_json(){
        $token=cookie('hw_token');

        cookie('hw_token',null);
        if(session('?hw_.'.$token)){
            session('hw_.'.$token,null);
        }
        $this->response(array('status' => true,'msg' => '退出成功！'), 'json');
    }

    //获取用户信息
    private function getUserInfo($user_id,$pass,$user_type){
        if ($user_type == 'Student') {
            return M('Student')->where(array('stu_number' => $user_id, 'pass' => md5($pass)))
                ->field('student_id as id,class_id,name,stu_number as number,role,sex,phone,email,face,status')->find();

        }elseif ($user_type == 'Teacher'){
            return M('Teacher')->where(array('work_id' => $user_id, 'pass' => md5($pass)))
                ->field('teacher_id as id,type,name,work_id as number,role,sex,phone,email,face,status')->find();
        }elseif ($user_type == 'Admin'){
            return null;
        }
    }

    //获取用户权限
    private function getAuthList($role_id){
        $groups=D('AuthRole')->relation('auth_group')->where(array('role_id'=>$role_id))->find()['auth_group'];
        $ids = array();//保存用户所属用户组设置的所有权限规则id
        foreach ($groups as $g) {
            $ids = array_merge($ids, explode(',', trim($g['rules'], ',')));
        }
        $ids = array_unique($ids);

        $map=array(
            'id'=>array('in',$ids),
            'type'=>1,
            'status'=>1,
        );
        //读取用户组所有权限规则
        $rules = M()->table('hw_auth_rule')->where($map)->field('name')->select();
        $authList = array();   //
        foreach ($rules as $rule) {
            $authList[] = strtolower($rule['name']);
        }
        return array_unique($authList);;
    }
}