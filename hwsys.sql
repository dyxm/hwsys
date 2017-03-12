/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50624
Source Host           : 127.0.0.1:3306
Source Database       : hwsys

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-03-12 23:50:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hw_auth_group
-- ----------------------------
DROP TABLE IF EXISTS `hw_auth_group`;
CREATE TABLE `hw_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_auth_group
-- ----------------------------
INSERT INTO `hw_auth_group` VALUES ('1', '学生', '1', '1,2,3,4,5,6,7,8,9,10,11,12,13');
INSERT INTO `hw_auth_group` VALUES ('2', ' 教师', '1', '1,2,3,14,15,16,17,18,19,20,21');

-- ----------------------------
-- Table structure for hw_auth_group_access
-- ----------------------------
DROP TABLE IF EXISTS `hw_auth_group_access`;
CREATE TABLE `hw_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_auth_group_access
-- ----------------------------
INSERT INTO `hw_auth_group_access` VALUES ('1', '1');
INSERT INTO `hw_auth_group_access` VALUES ('2', '2');

-- ----------------------------
-- Table structure for hw_auth_role
-- ----------------------------
DROP TABLE IF EXISTS `hw_auth_role`;
CREATE TABLE `hw_auth_role` (
  `role_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` varchar(20) NOT NULL COMMENT '角色名',
  `info` varchar(100) DEFAULT NULL COMMENT '角色说明',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_auth_role
-- ----------------------------
INSERT INTO `hw_auth_role` VALUES ('1', '学生', null);
INSERT INTO `hw_auth_role` VALUES ('2', '教师', null);
INSERT INTO `hw_auth_role` VALUES ('3', '管理员', null);

-- ----------------------------
-- Table structure for hw_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `hw_auth_rule`;
CREATE TABLE `hw_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_auth_rule
-- ----------------------------
INSERT INTO `hw_auth_rule` VALUES ('1', 'Access.welcome', '欢迎页', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('2', 'Access.login', '登录页', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('3', 'Access.forgotPwd', '忘记密码页', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('5', 'Student.myHomework', '学社-我的作业', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('6', 'Student.homeworkDetail', '学生-作业详情', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('7', 'Student.historyHomework', '学生-历史作业', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('8', 'Student.myCourse', '学生-我的课程', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('9', 'Student.courseDetail', '学生-课程详情', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('10', 'Student.myClass', '学生-班级列表', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('11', 'Student.classDetail', '学生-班级详情', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('12', 'Student.myPublicClass', '学生-公共必修班级列表', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('13', 'Student.myElectiveClass', '学生-选修班级列表', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('15', 'Teacher.createTask', '教师-布置作业', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('4', 'Student', '学生-主页', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('14', 'Teacher', '教师-首页', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('16', 'Teacher.taskDistribution', '教师-作业分布', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('17', 'Teacher.taskDetail', '教师-作业详情', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('18', 'Teacher.myCourse', '教师-我的课程', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('19', 'Teacher.courseDetail', '教师-详情', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('20', 'Teacher.myClass', '教师-我的班级', '1', '1', '');
INSERT INTO `hw_auth_rule` VALUES ('21', 'Teacher.classDetail', '教师-班级详情', '1', '1', '');

-- ----------------------------
-- Table structure for hw_branch
-- ----------------------------
DROP TABLE IF EXISTS `hw_branch`;
CREATE TABLE `hw_branch` (
  `branch_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `school_id` int(10) unsigned zerofill NOT NULL COMMENT '所属学校id',
  `leader_id` int(10) unsigned zerofill DEFAULT NULL COMMENT '校区长',
  `sort` tinyint(2) NOT NULL COMMENT '同个学校不同校区的顺序',
  `branch_name` varchar(30) NOT NULL COMMENT '校区名',
  `address` varchar(150) DEFAULT NULL COMMENT '校区地址',
  `info` varchar(200) DEFAULT NULL COMMENT '说明、简介',
  `status` tinyint(1) DEFAULT '1' COMMENT '‘1’启用，‘0’禁用',
  PRIMARY KEY (`branch_id`),
  KEY `s_id` (`school_id`),
  KEY `l_id` (`leader_id`),
  CONSTRAINT `l_id` FOREIGN KEY (`leader_id`) REFERENCES `hw_teacher` (`teacher_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `s_id` FOREIGN KEY (`school_id`) REFERENCES `hw_school` (`school_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_branch
-- ----------------------------
INSERT INTO `hw_branch` VALUES ('0000000001', '0000000001', null, '1', '大学城校区', null, null, '1');
INSERT INTO `hw_branch` VALUES ('0000000002', '0000000001', null, '2', '中山校区', null, null, '1');
INSERT INTO `hw_branch` VALUES ('0000000003', '0000000001', null, '3', '赤岗校区', null, null, '1');

-- ----------------------------
-- Table structure for hw_class
-- ----------------------------
DROP TABLE IF EXISTS `hw_class`;
CREATE TABLE `hw_class` (
  `class_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '班级id',
  `major_id` int(10) unsigned DEFAULT NULL COMMENT '专业id',
  `class_name` varchar(100) DEFAULT NULL COMMENT '班名',
  `teacher_id` int(10) unsigned DEFAULT NULL COMMENT '辅导员id',
  `monitor_id` int(10) unsigned DEFAULT NULL COMMENT '班长id',
  `class_grade` char(4) NOT NULL COMMENT '年级',
  `class_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '班级类型，0为普通班级，1公共联合班级，2为选修联合班级',
  `class_sort` smallint(2) NOT NULL DEFAULT '1' COMMENT '班别，1班，2班...',
  `class_join_pass` varchar(40) CHARACTER SET utf32 DEFAULT NULL COMMENT '联合班级的加入口令',
  `class_info` varchar(200) DEFAULT NULL COMMENT '班级简介、说明',
  `class_create_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '班级创建日期',
  `class_live_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '班级生存周期',
  `class_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1可用、0禁用',
  PRIMARY KEY (`class_id`),
  KEY `m_id` (`major_id`),
  KEY `t_id` (`teacher_id`),
  KEY `c_mo_id` (`monitor_id`),
  CONSTRAINT `c_mo_id` FOREIGN KEY (`monitor_id`) REFERENCES `hw_student` (`student_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `m_id` FOREIGN KEY (`major_id`) REFERENCES `hw_major` (`major_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_id` FOREIGN KEY (`teacher_id`) REFERENCES `hw_teacher` (`teacher_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_class
-- ----------------------------
INSERT INTO `hw_class` VALUES ('1', '1', null, null, null, '2013', '0', '1', null, null, '2017-03-12 22:28:30', '2017-07-01 22:56:44', '1');
INSERT INTO `hw_class` VALUES ('2', '1', null, null, null, '2013', '0', '2', null, null, '2017-02-28 19:54:15', '2017-07-01 19:53:43', '1');
INSERT INTO `hw_class` VALUES ('3', null, '马克思主义哲学', '3', null, '', '1', '1', '', null, '2017-03-02 13:47:07', '2017-03-02 13:47:07', '1');
INSERT INTO `hw_class` VALUES ('8', null, '中国近代史纲要', '3', null, '', '1', '1', null, null, '2017-03-02 13:47:04', '2017-03-02 13:47:04', '1');
INSERT INTO `hw_class` VALUES ('9', null, '舞蹈鉴赏', '3', null, '', '2', '1', 'r6e5tg', null, '2017-03-02 13:47:10', '2017-03-02 13:47:10', '1');

-- ----------------------------
-- Table structure for hw_class_msg
-- ----------------------------
DROP TABLE IF EXISTS `hw_class_msg`;
CREATE TABLE `hw_class_msg` (
  `class_id` int(10) unsigned NOT NULL COMMENT '班级id',
  `from_id` int(10) unsigned NOT NULL COMMENT '发布者id',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '类型，0为普通信息，1为公告',
  `content` varchar(100) NOT NULL COMMENT '内容',
  `issue_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '发布时间',
  KEY `c_id` (`class_id`),
  CONSTRAINT `c_id` FOREIGN KEY (`class_id`) REFERENCES `hw_class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_class_msg
-- ----------------------------

-- ----------------------------
-- Table structure for hw_class_student
-- ----------------------------
DROP TABLE IF EXISTS `hw_class_student`;
CREATE TABLE `hw_class_student` (
  `class_id` int(10) unsigned NOT NULL COMMENT '联合班级id',
  `student_id` int(10) unsigned NOT NULL COMMENT '学生id',
  KEY `us_c_id` (`class_id`),
  KEY `us_s_id` (`student_id`),
  CONSTRAINT `us_c_id` FOREIGN KEY (`class_id`) REFERENCES `hw_class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `us_s_id` FOREIGN KEY (`student_id`) REFERENCES `hw_student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_class_student
-- ----------------------------
INSERT INTO `hw_class_student` VALUES ('3', '1');
INSERT INTO `hw_class_student` VALUES ('3', '3');
INSERT INTO `hw_class_student` VALUES ('3', '2');
INSERT INTO `hw_class_student` VALUES ('8', '1');
INSERT INTO `hw_class_student` VALUES ('9', '1');

-- ----------------------------
-- Table structure for hw_college
-- ----------------------------
DROP TABLE IF EXISTS `hw_college`;
CREATE TABLE `hw_college` (
  `college_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '学院id，唯一',
  `branch_id` int(10) unsigned NOT NULL COMMENT '所属校区id',
  `college_name` varchar(30) NOT NULL COMMENT '学院名',
  `leader_id` int(10) unsigned DEFAULT NULL COMMENT '院长id',
  `info` varchar(200) DEFAULT NULL COMMENT '简介、说明',
  `phone` varchar(15) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1启用、0禁用',
  PRIMARY KEY (`college_id`),
  KEY `b_id` (`branch_id`),
  KEY `c_l_id` (`leader_id`),
  CONSTRAINT `b_id` FOREIGN KEY (`branch_id`) REFERENCES `hw_branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `c_l_id` FOREIGN KEY (`leader_id`) REFERENCES `hw_teacher` (`teacher_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_college
-- ----------------------------
INSERT INTO `hw_college` VALUES ('1', '2', '医药信息工程学院', null, null, null, '1');
INSERT INTO `hw_college` VALUES ('2', '1', '护理学院', null, null, null, '1');
INSERT INTO `hw_college` VALUES ('3', '2', '医药商学院', null, null, null, '1');
INSERT INTO `hw_college` VALUES ('4', '1', '医药信息工程学院', null, null, null, '1');

-- ----------------------------
-- Table structure for hw_course
-- ----------------------------
DROP TABLE IF EXISTS `hw_course`;
CREATE TABLE `hw_course` (
  `course_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '课程id，唯一',
  `teacher_id` int(10) unsigned NOT NULL,
  `course_name` varchar(30) NOT NULL COMMENT '课程名',
  `course_type` tinyint(1) unsigned NOT NULL COMMENT '课程类型，0为专业必修，1为公共选修，2为选修课程',
  `course_info` varchar(200) DEFAULT NULL COMMENT '课程介绍',
  `course_status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '课程状态，1可用，0禁用',
  `course_create_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `course_modify_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`course_id`),
  KEY `c_t_id` (`teacher_id`),
  CONSTRAINT `c_t_id` FOREIGN KEY (`teacher_id`) REFERENCES `hw_teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_course
-- ----------------------------
INSERT INTO `hw_course` VALUES ('1', '1', 'c语言程序设计', '0', 'C语言是一种计算机程序设计语言。它既有高级语言的特点，又具有汇编语言的特点。它可以作为系统设计语言，编写工作系统应用程序，也可以作为应用程序设计语言，编写不依赖计算机硬件的应用程序。因此，它的应用范围广泛。C语言是一种结构化语言。它层次清晰，便于按模块化方式组织程序，易于调试和维护。C语言的表现能力和处理能力极强。它不仅具有丰富的运算符和数据类型，便于实现各类复杂的数据结构。', '1', '2017-03-11 20:52:32', '2017-03-11 20:52:32');
INSERT INTO `hw_course` VALUES ('2', '1', '马克思主义哲学', '1', null, '1', '2017-03-07 16:29:34', '2017-03-07 16:29:34');
INSERT INTO `hw_course` VALUES ('3', '1', '中国近代史纲要', '1', null, '1', '2017-03-07 16:29:39', '2017-03-07 16:29:39');
INSERT INTO `hw_course` VALUES ('4', '3', '舞蹈鉴赏', '2', null, '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for hw_course_class
-- ----------------------------
DROP TABLE IF EXISTS `hw_course_class`;
CREATE TABLE `hw_course_class` (
  `course_class_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标识id',
  `course_id` int(10) unsigned NOT NULL COMMENT '课程id',
  `class_id` int(10) unsigned NOT NULL COMMENT '教师id',
  `term_year` varchar(15) NOT NULL COMMENT '学年，如2016-2017',
  `term` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '学期，1表示第一学期，2为第二学期',
  `is_group` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否分组，0否，1是，默认否',
  `max_member_count` mediumint(2) unsigned DEFAULT NULL COMMENT '分组最大人数',
  `grouping_deadline` datetime DEFAULT NULL COMMENT '分组截止日期',
  `assign_date` datetime NOT NULL COMMENT '课程分配日期',
  PRIMARY KEY (`course_class_id`),
  KEY `c_c_co_id` (`course_id`),
  KEY `c_c_cl_id` (`class_id`),
  CONSTRAINT `c_c_cl_id` FOREIGN KEY (`class_id`) REFERENCES `hw_class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `c_c_co_id` FOREIGN KEY (`course_id`) REFERENCES `hw_course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_course_class
-- ----------------------------
INSERT INTO `hw_course_class` VALUES ('1', '1', '1', '2016-2017', '1', '1', '4', '2017-03-05 00:00:00', '2017-03-01 00:00:00');
INSERT INTO `hw_course_class` VALUES ('2', '2', '3', '2016-2017', '1', '0', null, '0000-00-00 00:00:00', '2017-03-02 00:00:00');
INSERT INTO `hw_course_class` VALUES ('3', '3', '8', '2016-2017', '1', '0', null, '2017-03-09 00:00:00', '2017-03-02 00:00:00');
INSERT INTO `hw_course_class` VALUES ('4', '4', '9', '2016-2017', '1', '0', null, '2017-03-08 00:00:00', '2017-03-02 00:00:00');

-- ----------------------------
-- Table structure for hw_department
-- ----------------------------
DROP TABLE IF EXISTS `hw_department`;
CREATE TABLE `hw_department` (
  `depart_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '系，唯一id',
  `college_id` int(10) unsigned NOT NULL COMMENT '学院id',
  `depart_name` varchar(30) NOT NULL COMMENT '系名',
  `leader_id` int(10) unsigned DEFAULT NULL COMMENT '系主任',
  `phone` varchar(15) DEFAULT NULL,
  `info` varchar(200) DEFAULT NULL COMMENT '简介，说明',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1启用、0禁用',
  PRIMARY KEY (`depart_id`),
  KEY `d_c_id` (`college_id`),
  KEY `d_l_id` (`leader_id`),
  CONSTRAINT `d_c_id` FOREIGN KEY (`college_id`) REFERENCES `hw_college` (`college_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `d_l_id` FOREIGN KEY (`leader_id`) REFERENCES `hw_teacher` (`teacher_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_department
-- ----------------------------
INSERT INTO `hw_department` VALUES ('1', '1', '计算机科学与技术系', null, null, null, '1');
INSERT INTO `hw_department` VALUES ('2', '2', '数字媒体技术系', null, null, null, '1');

-- ----------------------------
-- Table structure for hw_dormitory
-- ----------------------------
DROP TABLE IF EXISTS `hw_dormitory`;
CREATE TABLE `hw_dormitory` (
  `dorm_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '宿舍id，唯一',
  `dorm_building_id` int(10) unsigned zerofill NOT NULL COMMENT '宿舍楼id',
  `dorm_name` varchar(10) NOT NULL COMMENT '宿舍号/名',
  `dorm_max_num` smallint(2) NOT NULL DEFAULT '4' COMMENT '最大容纳数',
  `dorm_people` smallint(2) NOT NULL DEFAULT '0' COMMENT '宿舍人数',
  `dorm_head_id` int(10) unsigned zerofill DEFAULT NULL,
  `dorm_isfull` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1表满人，0表不满',
  `dorm_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1启用，0禁用',
  `dorm_info` varchar(200) DEFAULT NULL COMMENT '简介说明',
  PRIMARY KEY (`dorm_id`),
  KEY `d_db_id` (`dorm_building_id`),
  CONSTRAINT `d_db_id` FOREIGN KEY (`dorm_building_id`) REFERENCES `hw_dorm_building` (`dor_building_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_dormitory
-- ----------------------------

-- ----------------------------
-- Table structure for hw_dorm_building
-- ----------------------------
DROP TABLE IF EXISTS `hw_dorm_building`;
CREATE TABLE `hw_dorm_building` (
  `dor_building_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '宿舍楼id，唯一',
  `school_id` int(10) unsigned NOT NULL COMMENT '学校id',
  `dor_building_name` varchar(20) NOT NULL COMMENT '宿舍楼号/名',
  PRIMARY KEY (`dor_building_id`),
  KEY `db_s_id` (`school_id`),
  CONSTRAINT `db_s_id` FOREIGN KEY (`school_id`) REFERENCES `hw_school` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_dorm_building
-- ----------------------------

-- ----------------------------
-- Table structure for hw_dorm_stu
-- ----------------------------
DROP TABLE IF EXISTS `hw_dorm_stu`;
CREATE TABLE `hw_dorm_stu` (
  `dorm_id` int(10) unsigned NOT NULL COMMENT '宿舍id',
  `stu_id` int(10) unsigned NOT NULL COMMENT '学生id',
  KEY `ds_d_id` (`dorm_id`),
  KEY `ds_s_id` (`stu_id`),
  CONSTRAINT `ds_d_id` FOREIGN KEY (`dorm_id`) REFERENCES `hw_dormitory` (`dorm_id`),
  CONSTRAINT `ds_s_id` FOREIGN KEY (`stu_id`) REFERENCES `hw_student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_dorm_stu
-- ----------------------------

-- ----------------------------
-- Table structure for hw_groups
-- ----------------------------
DROP TABLE IF EXISTS `hw_groups`;
CREATE TABLE `hw_groups` (
  `group_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分组id',
  `course_class_id` int(10) unsigned NOT NULL COMMENT '“课程_班级”id',
  `leader_id` int(10) unsigned NOT NULL COMMENT '组长',
  `group_name` varchar(20) NOT NULL COMMENT '组名',
  `join_pass` varchar(10) NOT NULL COMMENT '加入分组口令',
  `create_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '分组创建日期',
  PRIMARY KEY (`group_id`),
  KEY `g_l_id` (`leader_id`),
  KEY `g_c_c_id` (`course_class_id`),
  CONSTRAINT `g_c_c_id` FOREIGN KEY (`course_class_id`) REFERENCES `hw_course_class` (`course_class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `g_l_id` FOREIGN KEY (`leader_id`) REFERENCES `hw_student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_groups
-- ----------------------------
INSERT INTO `hw_groups` VALUES ('3', '1', '2', '吾皇ZB', '123123', '2017-03-02 22:04:28');
INSERT INTO `hw_groups` VALUES ('12', '1', '1', '东岳熊猫', '123123', '2017-03-04 01:01:35');

-- ----------------------------
-- Table structure for hw_group_member
-- ----------------------------
DROP TABLE IF EXISTS `hw_group_member`;
CREATE TABLE `hw_group_member` (
  `group_id` int(10) unsigned NOT NULL COMMENT '分组id',
  `student_id` int(10) unsigned NOT NULL COMMENT '学生id',
  KEY `gm_g_id` (`group_id`),
  KEY `gm_s_id` (`student_id`),
  CONSTRAINT `gm_g_id` FOREIGN KEY (`group_id`) REFERENCES `hw_groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gm_s_id` FOREIGN KEY (`student_id`) REFERENCES `hw_student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_group_member
-- ----------------------------
INSERT INTO `hw_group_member` VALUES ('3', '2');
INSERT INTO `hw_group_member` VALUES ('3', '3');
INSERT INTO `hw_group_member` VALUES ('3', '4');
INSERT INTO `hw_group_member` VALUES ('12', '1');
INSERT INTO `hw_group_member` VALUES ('12', '5');
INSERT INTO `hw_group_member` VALUES ('12', '6');
INSERT INTO `hw_group_member` VALUES ('12', '7');

-- ----------------------------
-- Table structure for hw_homework
-- ----------------------------
DROP TABLE IF EXISTS `hw_homework`;
CREATE TABLE `hw_homework` (
  `homework_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '作业id',
  `task_id` int(10) unsigned NOT NULL COMMENT '任务id',
  `student_id` int(10) unsigned DEFAULT NULL COMMENT '学生id，如果是独自完成，则为学生id，分组完成是位0',
  `group_id` int(10) unsigned DEFAULT NULL COMMENT '分组编号，如果是分组完成则是分组的id，否则为0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否上交，0未交，1已交',
  `upload_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '上交日期',
  `file_name` varchar(50) NOT NULL DEFAULT '' COMMENT '作业名',
  `file_path` varchar(200) NOT NULL DEFAULT '' COMMENT '作业存放路径',
  `is_open` tinyint(1) NOT NULL DEFAULT '1' COMMENT '作业是否对同班同学可见，1可见，0不可见，默认可见',
  `grade` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '分数',
  PRIMARY KEY (`homework_id`),
  KEY `h_s_id` (`student_id`),
  KEY `h_g_id` (`task_id`),
  KEY `h_gr_id` (`group_id`),
  CONSTRAINT `h_gr_id` FOREIGN KEY (`group_id`) REFERENCES `hw_groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `h_s_id` FOREIGN KEY (`student_id`) REFERENCES `hw_student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `h_t_id` FOREIGN KEY (`task_id`) REFERENCES `hw_task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_homework
-- ----------------------------
INSERT INTO `hw_homework` VALUES ('1', '1', '1', null, '0', '2017-03-06 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('4', '2', '1', null, '1', '2017-03-06 14:54:28', 'c语言程序设计实验二_丁岳雄_1305553107.pdf', 'uploads/files/1111111111/C语言程序设计/2013级计算机科学与技术（医学应用）【1】班/实验一/homeworks/c语言程序设计实验二_丁岳雄_1305553107.pdf', '1', '90');
INSERT INTO `hw_homework` VALUES ('5', '2', '2', null, '1', '2017-03-06 00:00:00', '', '', '0', '0');
INSERT INTO `hw_homework` VALUES ('6', '1', '2', null, '1', '2017-03-06 00:00:00', '', '', '0', '80');
INSERT INTO `hw_homework` VALUES ('7', '1', '3', null, '1', '2017-03-06 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('8', '2', '3', null, '1', '2017-03-06 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('9', '2', '4', null, '0', '2017-03-07 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('194', '38', '2', null, '0', '0000-00-00 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('195', '38', '3', null, '0', '0000-00-00 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('196', '38', '4', null, '0', '0000-00-00 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('197', '38', '5', null, '0', '0000-00-00 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('198', '38', '6', null, '0', '0000-00-00 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('199', '38', '7', null, '0', '0000-00-00 00:00:00', '', '', '1', '0');
INSERT INTO `hw_homework` VALUES ('200', '38', '1', null, '1', '2017-03-09 17:01:56', 'c语言程序设计实验三_丁岳雄_1305553107.docx', 'uploads/files/1111111111/c语言程序设计/2013级计算机科学与技术（医学应用）【1】班/实验三/homeworks/c语言程序设计实验三_丁岳雄_1305553107.docx', '1', '0');

-- ----------------------------
-- Table structure for hw_homework_msg
-- ----------------------------
DROP TABLE IF EXISTS `hw_homework_msg`;
CREATE TABLE `hw_homework_msg` (
  `task_id` int(10) unsigned NOT NULL COMMENT '任务id',
  `from_id` int(10) NOT NULL COMMENT '发布者id',
  `type` tinyint(1) NOT NULL COMMENT '信息类型，0为普通信息，1为公告',
  `content` varchar(100) NOT NULL COMMENT '内容',
  `issue_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '发布日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_homework_msg
-- ----------------------------

-- ----------------------------
-- Table structure for hw_major
-- ----------------------------
DROP TABLE IF EXISTS `hw_major`;
CREATE TABLE `hw_major` (
  `major_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `depart_id` int(10) unsigned NOT NULL COMMENT '系id',
  `major_name` varchar(30) NOT NULL COMMENT '专业名',
  `info` varchar(200) DEFAULT NULL COMMENT '专业简介、说明',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1启用、0禁用',
  PRIMARY KEY (`major_id`),
  KEY `m_d_id` (`depart_id`),
  CONSTRAINT `m_d_id` FOREIGN KEY (`depart_id`) REFERENCES `hw_department` (`depart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_major
-- ----------------------------
INSERT INTO `hw_major` VALUES ('1', '1', '计算机科学与技术（医学应用）', null, '1');
INSERT INTO `hw_major` VALUES ('2', '2', '数字媒体技术', null, '1');

-- ----------------------------
-- Table structure for hw_notice
-- ----------------------------
DROP TABLE IF EXISTS `hw_notice`;
CREATE TABLE `hw_notice` (
  `from_id` int(10) unsigned NOT NULL COMMENT '发布者id',
  `to_id` int(10) unsigned NOT NULL COMMENT '接受者id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `content` varchar(100) NOT NULL COMMENT '内容',
  `issue_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '发布日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_notice
-- ----------------------------

-- ----------------------------
-- Table structure for hw_school
-- ----------------------------
DROP TABLE IF EXISTS `hw_school`;
CREATE TABLE `hw_school` (
  `school_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '学校id',
  `user_id` int(10) unsigned NOT NULL COMMENT '申请者id',
  `school_name` varchar(30) NOT NULL COMMENT '校名',
  `address` varchar(150) DEFAULT '' COMMENT '校址',
  `info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`school_id`),
  KEY `s_u_id` (`user_id`),
  CONSTRAINT `s_u_id` FOREIGN KEY (`user_id`) REFERENCES `hw_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_school
-- ----------------------------
INSERT INTO `hw_school` VALUES ('1', '1000', '广东药科大学', '', null);

-- ----------------------------
-- Table structure for hw_student
-- ----------------------------
DROP TABLE IF EXISTS `hw_student`;
CREATE TABLE `hw_student` (
  `student_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '学生id，唯一',
  `class_id` int(10) unsigned NOT NULL COMMENT '班级id',
  `name` varchar(20) NOT NULL COMMENT '名字',
  `stu_number` int(10) NOT NULL COMMENT '学号',
  `pass` varchar(40) NOT NULL COMMENT '密码',
  `salt` varchar(40) NOT NULL COMMENT '随机字符串，用于盐值加密',
  `role` tinyint(1) NOT NULL DEFAULT '1' COMMENT '角色，1为学生',
  `sex` tinyint(1) NOT NULL COMMENT '性别：0男，1女',
  `oper_pass` varchar(40) DEFAULT NULL COMMENT '重要操作密码',
  `phone` varchar(20) DEFAULT NULL COMMENT '电话',
  `email` varchar(30) DEFAULT NULL COMMENT '邮箱',
  `face` varchar(200) DEFAULT 'uploads/faces/default_face.jpg' COMMENT '头像路径',
  `info` varchar(200) DEFAULT NULL COMMENT '简介、说明',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1有效，0无效',
  PRIMARY KEY (`student_id`),
  KEY `s_c_id` (`class_id`),
  CONSTRAINT `s_c_id` FOREIGN KEY (`class_id`) REFERENCES `hw_class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_student
-- ----------------------------
INSERT INTO `hw_student` VALUES ('1', '1', '丁岳雄', '1305553107', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '1', '0', '4297f44b13955235245b2497399d7a93', '15017263342', '857230132@qq.com', 'uploads/faces/default_face.jpg', null, '1');
INSERT INTO `hw_student` VALUES ('2', '1', '陈国彬', '1305553101', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '1', '0', '4297f44b13955235245b2497399d7a93', null, null, 'uploads/faces/default_face.jpg', null, '1');
INSERT INTO `hw_student` VALUES ('3', '1', '陈社胜', '1305553102', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '1', '0', '4297f44b13955235245b2497399d7a93', null, null, 'uploads/faces/default_face.jpg', null, '1');
INSERT INTO `hw_student` VALUES ('4', '1', '陈舒敏', '1305553103', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '1', '1', '4297f44b13955235245b2497399d7a93', null, null, 'uploads/faces/default_face.jpg', null, '1');
INSERT INTO `hw_student` VALUES ('5', '1', '陈小庆', '1305553104', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '1', '1', '4297f44b13955235245b2497399d7a93', null, null, 'uploads/faces/default_face.jpg', null, '1');
INSERT INTO `hw_student` VALUES ('6', '1', '陈莹', '1305553105', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '1', '1', '4297f44b13955235245b2497399d7a93', null, null, 'uploads/faces/default_face.jpg', null, '1');
INSERT INTO `hw_student` VALUES ('7', '1', '陈泽斌', '1305553106', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '1', '0', '4297f44b13955235245b2497399d7a93', null, null, 'uploads/faces/default_face.jpg', null, '1');

-- ----------------------------
-- Table structure for hw_tag
-- ----------------------------
DROP TABLE IF EXISTS `hw_tag`;
CREATE TABLE `hw_tag` (
  `tag_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '教师标签id',
  `tag_name` varchar(20) NOT NULL COMMENT '教师标签名',
  `info` varchar(50) DEFAULT NULL COMMENT '简介、说明',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1启用，0禁用',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_tag
-- ----------------------------

-- ----------------------------
-- Table structure for hw_task
-- ----------------------------
DROP TABLE IF EXISTS `hw_task`;
CREATE TABLE `hw_task` (
  `task_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分配给班级',
  `teacher_id` int(10) unsigned NOT NULL COMMENT '创建及教师id',
  `course_class_id` int(10) unsigned NOT NULL COMMENT '课程_班级_id',
  `task_name` varchar(150) NOT NULL,
  `task_require` varchar(255) NOT NULL,
  `attach_file_path` varchar(255) DEFAULT NULL,
  `attach_file_name` varchar(50) DEFAULT NULL,
  `upload_path` varchar(255) DEFAULT NULL,
  `task_create_date` datetime NOT NULL,
  `deadline` datetime NOT NULL,
  `last_modify_time` datetime DEFAULT NULL,
  `is_apply_group` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否启用分组，1启用，0禁用',
  PRIMARY KEY (`task_id`),
  KEY `t_c_c_id` (`course_class_id`),
  KEY `t_t_id` (`teacher_id`),
  CONSTRAINT `t_c_c_id` FOREIGN KEY (`course_class_id`) REFERENCES `hw_course_class` (`course_class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_t_id` FOREIGN KEY (`teacher_id`) REFERENCES `hw_teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_task
-- ----------------------------
INSERT INTO `hw_task` VALUES ('1', '1', '1', '实验一', '按要求完成实验一', 'sadfsdf', '政治.docx', null, '2017-03-08 23:26:38', '2017-03-08 23:26:38', '0000-00-00 00:00:00', '0');
INSERT INTO `hw_task` VALUES ('2', '1', '1', '实验二', '按要求完成实验一', 'sadf', 'sadfsdf.doc', '1111111111/C语言程序设计/2013级计算机科学与技术（医学应用）【1】班/实验一/homeworks/', '2017-03-06 15:09:48', '2017-03-04 13:25:29', '0000-00-00 00:00:00', '0');
INSERT INTO `hw_task` VALUES ('38', '1', '1', '实验三', '参照附件独立完成实验，记得及时上交，否则没成绩！', 'uploads/files/1111111111/c语言程序设计/2013级计算机科学与技术（医学应用）【1】班/实验三/attach_file/', '政治.docx', '1111111111/c语言程序设计/2013级计算机科学与技术（医学应用）【1】班/实验三/homeworks/', '2017-03-08 23:53:49', '2017-03-18 00:00:00', null, '0');

-- ----------------------------
-- Table structure for hw_teacher
-- ----------------------------
DROP TABLE IF EXISTS `hw_teacher`;
CREATE TABLE `hw_teacher` (
  `teacher_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `college_id` int(10) unsigned NOT NULL COMMENT '学院id',
  `work_id` int(10) unsigned NOT NULL COMMENT '教师工号',
  `name` varchar(20) NOT NULL COMMENT '名字',
  `role` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '角色，2为普通老师',
  `salt` varchar(40) NOT NULL COMMENT '随机字符串，用于盐值加密',
  `pass` varchar(40) NOT NULL COMMENT '密码',
  `oper_pass` varchar(40) DEFAULT NULL COMMENT '操作密码',
  `type` tinyint(1) NOT NULL COMMENT '教师类型，0讲师，1副教授，2教授',
  `sex` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '性别，0男，1女',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `face` varchar(200) DEFAULT NULL COMMENT '头像',
  `info` varchar(200) DEFAULT NULL COMMENT '简介说明',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1在职，0停职',
  PRIMARY KEY (`teacher_id`),
  KEY `t_col_id` (`college_id`),
  CONSTRAINT `t_col_id` FOREIGN KEY (`college_id`) REFERENCES `hw_college` (`college_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_teacher
-- ----------------------------
INSERT INTO `hw_teacher` VALUES ('1', '1', '1111111111', '李金洋', '2', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '0', '1', '15017263342', '857230132@qq.com', null, null, '1');
INSERT INTO `hw_teacher` VALUES ('3', '1', '2222222222', '马克思', '2', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93', '0', '0', null, null, null, null, '1');

-- ----------------------------
-- Table structure for hw_teac_tag
-- ----------------------------
DROP TABLE IF EXISTS `hw_teac_tag`;
CREATE TABLE `hw_teac_tag` (
  `tag_id` int(10) unsigned NOT NULL,
  `teac_id` int(10) unsigned NOT NULL,
  KEY `tt_tag_id` (`tag_id`),
  KEY `tt_teac_id` (`teac_id`),
  CONSTRAINT `tt_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `hw_tag` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tt_teac_id` FOREIGN KEY (`teac_id`) REFERENCES `hw_teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_teac_tag
-- ----------------------------

-- ----------------------------
-- Table structure for hw_user
-- ----------------------------
DROP TABLE IF EXISTS `hw_user`;
CREATE TABLE `hw_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `phone` varchar(11) NOT NULL COMMENT '手机',
  `pass` varchar(40) NOT NULL COMMENT '密码',
  `salt` varchar(40) NOT NULL COMMENT '盐值',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hw_user
-- ----------------------------
INSERT INTO `hw_user` VALUES ('1000', '丁岳雄', '15017263342', '4297f44b13955235245b2497399d7a93', '4297f44b13955235245b2497399d7a93');

-- ----------------------------
-- View structure for studentview
-- ----------------------------
DROP VIEW IF EXISTS `studentview`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost`  VIEW `studentview` AS SELECT
hw_student.stu_id,
hw_student.class_id,
hw_student.stu_number,
hw_student.pass,
hw_student.salt,
hw_student.oper_pass,
hw_student.phone,
hw_student.email,
hw_student.face_path,
hw_student.info,
hw_student.`status` AS stuStatus,
hw_class.grade,
hw_class.sort,
hw_class.major_id,
hw_class.`status` AS classStatus,
hw_major.major_name,
hw_major.`status` AS majorStatus,
hw_department.depart_name,
hw_department.`status` AS departStatus,
hw_college.college_name,
hw_college.`status` AS collegeStatus,
hw_branch.branch_name,
hw_branch.`status` AS branchStatus
FROM
hw_student
INNER JOIN hw_class ON hw_student.class_id = hw_class.class_id
INNER JOIN hw_major ON hw_class.major_id = hw_major.major_id
INNER JOIN hw_department ON hw_major.depart_id = hw_department.depart_id
INNER JOIN hw_college ON hw_department.college_id = hw_college.college_id
INNER JOIN hw_branch ON hw_college.branch_id = hw_branch.branch_id
WHERE
hw_student.class_id = hw_class.class_id AND
hw_class.major_id = hw_major.major_id AND
hw_major.depart_id = hw_department.depart_id AND
hw_department.college_id = hw_college.college_id AND
hw_college.branch_id = hw_branch.branch_id ;
