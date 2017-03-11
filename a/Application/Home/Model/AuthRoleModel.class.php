<?php
namespace Home\Model;

use Think\Model\RelationModel;

class AuthRoleModel extends RelationModel
{
    //关联
    protected $_link = array(
        //查找权限组
        'auth_group' => array(
            'mapping_type' => self::MANY_TO_MANY,
            'relation_table' => 'hw_auth_group_access',
            'foreign_key' => 'group_id',
            'relation_foreign_key' => 'uid',
        ),
    );
}