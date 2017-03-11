'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                //aba
                $urlRouterProvider
                    .otherwise('/access/welcome');
                $stateProvider
                /*登录模板*/
                    .state('access', {
                        abstract: true,
                        url: '/access',
                        templateUrl: 'tpl/common/access.html'
                    })
                    /*欢迎页面*/
                    .state('access.welcome', {
                        url: '/welcome',
                        templateUrl: 'tpl/access/welcome.html'
                    })
                    /*登录*/
                    .state('access.login', {
                        url: '/login',
                        templateUrl: 'tpl/access/login.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/common/loginCtrl.js']);
                            }]
                        }
                    })
                    /*忘记密码*/
                    .state('access.forgotPwd', {
                        url: '/forgotPwd',
                        templateUrl: 'tpl/access/forgotPwd.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/common/forgotPwdCtrl.js']);
                            }]
                        }
                    })
                    /*********************学生端*********************/
                    .state('student', {
                        // abstract: true,
                        url: '/student',
                        templateUrl: 'tpl/common/student.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['student.Homework', 'student.Class', 'student.Course']).then(function () {
                                    return $ocLazyLoad.load([
                                        'js/controllers/common/headCtrl.js',
                                        'js/controllers/common/navCtrl.js'
                                    ]);
                                });
                            }]
                        }
                    })
                    /**
                     * “作业管理”路由开始
                     */
                    /*我的作业*/
                    .state('student.myHomework', {
                        url: '/myHomework',
                        templateUrl: 'tpl/student/homework/homeworkList.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                // return $ocLazyLoad.load('student.Homework').then(function () {
                                //     return $ocLazyLoad.load(['js/controllers/student/homework/myHomeworkCtrl.js']);
                                // });
                                return $ocLazyLoad.load(['js/controllers/student/homework/myHomeworkCtrl.js']);
                            }],
                            homeworkList: function (Homework) {
                                return Homework.getHomeworks(0, 1).then(function (response) {//0表未交且没过截止日期的作业，1表第一页
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'myHomeworkCtrl'
                    })
                    /*历史作业*/
                    .state('student.historyHomework', {
                        url: '/historyHomework',
                        templateUrl: 'tpl/student/homework/historyHomework.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                // return $ocLazyLoad.load('student.Homework').then(function () {
                                //     return $ocLazyLoad.load(['js/controllers/student/homework/historyHomeworkCtrl.js']);
                                // });
                                return $ocLazyLoad.load(['js/controllers/student/homework/historyHomeworkCtrl.js']);
                            }],
                            historyHomeworks: function (Homework) {
                                return Homework.getHomeworks(1, 1).then(function (response) {//第一个1表查询历史作业，第二个1表第一页
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'historyHomeworkCtrl'
                    })
                    /*作业详情*/
                    .state('student.homeworkDetail', {
                        url: '/homeworkDetail/:homeworkID',
                        templateUrl: 'tpl/student/homework/homeworkDetail.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    // return $ocLazyLoad.load('student.Homework').then(function () {
                                    //     return $ocLazyLoad.load(['js/controllers/student/homework/homeworkDetailCtrl.js']);
                                    // });
                                    return $ocLazyLoad.load(['js/controllers/student/homework/homeworkDetailCtrl.js']);
                                }],
                            homework: function (Homework, $stateParams) {
                                return Homework.getOneHomework($stateParams.homeworkID).then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'homeworkDetailCtrl'
                    })
                    /**
                     * “班级管理”路由开始
                     */
                    /*普通班级列表*/
                    .state('student.myClass', {
                        url: '/myClass/:class_type',//参数为班级类型，0普通班级，1公共必修班级、2选修班级
                        templateUrl: 'tpl/student/class/myClass.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                // return $ocLazyLoad.load('student.Class').then(function () {
                                //     return $ocLazyLoad.load(['js/controllers/student/class/myClassCtrl.js']);
                                // });
                                return $ocLazyLoad.load(['js/controllers/student/class/myClassCtrl.js']);
                            }],
                            classesData: function (Class, $stateParams) {
                                return Class.getClasses($stateParams.class_type, 1).then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'myClassCtrl'
                    })
                    .state('student.classDetail', {
                        url: '/classDetail/:classID',
                        templateUrl: 'tpl/student/class/classDetail.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                // return $ocLazyLoad.load('student.Class').then(function () {
                                //     return $ocLazyLoad.load(['js/controllers/student/class/classDetailCtrl.js']);
                                // });
                                return $ocLazyLoad.load(['js/controllers/student/class/classDetailCtrl.js']);
                            }],
                            classData: function (Class, $stateParams) {
                                return Class.getClass($stateParams.classID).then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'classDetailCtrl'
                    })

                    /**
                     * “我的课程”路由开始
                     */
                    /*课程列表*/
                    .state('student.myCourse', {
                        url: '/myCourse/:course_type',
                        templateUrl: 'tpl/student/course/myCourse.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                // return $ocLazyLoad.load('student.Course').then(function () {
                                //     return $ocLazyLoad.load(['js/controllers/student/course/myCourseCtrl.js']);
                                // });
                                return $ocLazyLoad.load(['js/controllers/student/course/myCourseCtrl.js']);
                            }],
                            coursesData: function (Course, $stateParams) {
                                return Course.getCourses($stateParams.course_type, 1).then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'myCourseCtrl'
                    })
                    /*课程详情*/
                    .state('student.courseDetail', {
                        url: '/courseDetail/:course_class_id',
                        templateUrl: 'tpl/student/course/courseDetail.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('student.Group').then(function () {
                                    return $ocLazyLoad.load(['js/controllers/student/course/courseDetailCtrl.js']);
                                });
                            }],
                            courseData: function (Course, $stateParams) {
                                return Course.getCourse($stateParams.course_class_id).then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'courseDetailCtrl'
                    })
                    /*********************学生端结束*********************/

                    /*********************教师端*********************/
                    .state('teacher', {
                        // abstract: true,
                        url: '/teacher',
                        templateUrl: 'tpl/common/teacher.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['teacher.Course', 'teacher.Class', 'teacher.Task']).then(function () {
                                    return $ocLazyLoad.load([
                                        'js/controllers/common/headCtrl.js',
                                        'js/controllers/common/navCtrl.js'
                                    ]);
                                });
                            }]
                        }
                    })
                    /**
                     * “任务管理”路由开始
                     */
                    /*布置任务*/
                    .state('teacher.createTask', {
                        url: '/createTask',
                        templateUrl: 'tpl/teacher/task/createTask.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'css/date/laydate.css',
                                    'css/date/skins/default/laydate.css',
                                    'js/date/laydate.js',
                                    'js/controllers/teacher/task/create/createTaskCtrl.js',
                                    'js/controllers/teacher/task/create/selectCourseCtrl.js',
                                    'js/controllers/teacher/task/create/selectClassCtrl.js'
                                ]);
                            }]
                        },
                        controller: 'createTaskCtrl'
                    })
                    /*任务分布*/
                    .state('teacher.taskDistribution', {
                        url: '/taskDistribution',
                        templateUrl: 'tpl/teacher/task/taskDistribution.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('ui.select').then(function () {
                                    return $ocLazyLoad.load(['js/controllers/teacher/task/taskDistributionCtrl.js']);
                                });
                            }],
                            tasksData: function (Task) {
                                return Task.getTasks('', 1).then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'taskDistributionCtrl'
                    })
                    /*任务详情*/
                    .state('teacher.taskDetail', {
                        url: '/taskDetail/:taskID',
                        templateUrl: 'tpl/teacher/task/taskDetail.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('ui.select').then(function () {
                                    return $ocLazyLoad.load(['js/controllers/teacher/task/taskDetailCtrl.js']);
                                });
                            }],
                            taskData: function (Task, $stateParams) {
                                return Task.getTask($stateParams.taskID).then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'taskDetailCtrl'
                    })
                    /**
                     * “课程管理”路由开始
                     */
                    /*课程列表*/
                    .state('teacher.myCourse', {
                        url: '/myCourse/:course_type',
                        templateUrl: 'tpl/teacher/course/myCourse.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/teacher/course/myCourseCtrl.js']);
                            }],
                            coursesData: function (Course, $stateParams) {
                                return Course.getCourses($stateParams.course_type, 1).then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    return error;
                                });
                            }
                        },
                        controller: 'myCourseCtrl'
                    })
                    /*课程详情*/
                    .state('teacher.courseDetail', {
                        url: '/courseDetail/:course_id',
                        templateUrl: 'tpl/teacher/course/courseDetail.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/teacher/course/courseDetailCtrl.js']);
                            }],
                            // courseData: function (Course, $stateParams) {
                            //     return Course.getCourse($stateParams.course_id).then(function (response) {
                            //         return response.data;
                            //     }, function (error) {
                            //         return error;
                            //     });
                            // }
                        },
                        controller: 'courseDetailCtrl'
                    })
                    /*********************教师端结束*********************/
                    /**
                     * “用户”路由开始
                     */
                    /*个人中心*/
                    .state('student.userInfo', {
                        url: '/userInfo',
                        templateUrl: 'tpl/userInfo/showUserInfo.html'
                    })
                    /*设置*/
                    .state('student.setting', {
                        url: '/setting',
                        templateUrl: 'tpl/setting/setting.html'
                    })
                // .state('main.dashboard-v2', {
                //     url: '/dashboard-v2',
                //     templateUrl: 'tpl/app_dashboard_v2.html',
                //     resolve: {
                //       deps: ['$ocLazyLoad',
                //         function( $ocLazyLoad ){
                //           return $ocLazyLoad.load(['js/controllers/chart.js']);
                //       }]
                //     }
                // })
                // .state('app.ui', {
                //     url: '/ui',
                //     template: '<div ui-view class="fade-in-up"></div>'
                // })
                // .state('app.ui.buttons', {
                //     url: '/buttons',
                //     templateUrl: 'tpl/ui_buttons.html'
                // })
                // .state('app.ui.icons', {
                //     url: '/icons',
                //     templateUrl: 'tpl/ui_icons.html'
                // })
                // .state('app.ui.grid', {
                //     url: '/grid',
                //     templateUrl: 'tpl/ui_grid.html'
                // })
                // .state('app.ui.widgets', {
                //     url: '/widgets',
                //     templateUrl: 'tpl/ui_widgets.html'
                // })
                // .state('app.ui.bootstrap', {
                //     url: '/bootstrap',
                //     templateUrl: 'tpl/ui_bootstrap.html'
                // })
                // .state('app.ui.sortable', {
                //     url: '/sortable',
                //     templateUrl: 'tpl/ui_sortable.html'
                // })
                // .state('app.ui.portlet', {
                //     url: '/portlet',
                //     templateUrl: 'tpl/ui_portlet.html'
                // })
                // .state('app.ui.timeline', {
                //     url: '/timeline',
                //     templateUrl: 'tpl/ui_timeline.html'
                // })
                // .state('app.ui.tree', {
                //     url: '/tree',
                //     templateUrl: 'tpl/ui_tree.html',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad ){
                //             return $ocLazyLoad.load('angularBootstrapNavTree').then(
                //                 function(){
                //                    return $ocLazyLoad.load('js/controllers/tree.js');
                //                 }
                //             );
                //           }
                //         ]
                //     }
                // })
                // .state('app.ui.toaster', {
                //     url: '/toaster',
                //     templateUrl: 'tpl/ui_toaster.html',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad){
                //             return $ocLazyLoad.load('toaster').then(
                //                 function(){
                //                    return $ocLazyLoad.load('js/controllers/toaster.js');
                //                 }
                //             );
                //         }]
                //     }
                // })
                // .state('app.ui.jvectormap', {
                //     url: '/jvectormap',
                //     templateUrl: 'tpl/ui_jvectormap.html',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad){
                //             return $ocLazyLoad.load('js/controllers/vectormap.js');
                //         }]
                //     }
                // })
                // .state('app.ui.googlemap', {
                //     url: '/googlemap',
                //     templateUrl: 'tpl/ui_googlemap.html',
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad ){
                //             return uiLoad.load( [
                //               'js/app/map/load-google-maps.js',
                //               'js/app/map/ui-map.js',
                //               'js/app/map/map.js'] ).then(
                //                 function(){
                //                   return loadGoogleMaps();
                //                 }
                //               );
                //         }]
                //     }
                // })
                // .state('app.chart', {
                //     url: '/chart',
                //     templateUrl: 'tpl/ui_chart.html',
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad){
                //             return uiLoad.load('js/controllers/chart.js');
                //         }]
                //     }
                // })
                // // table
                // .state('app.table', {
                //     url: '/table',
                //     template: '<div ui-view></div>'
                // })
                // .state('app.table.static', {
                //     url: '/static',
                //     templateUrl: 'tpl/table_static.html'
                // })
                // .state('app.table.datatable', {
                //     url: '/datatable',
                //     templateUrl: 'tpl/table_datatable.html'
                // })
                // .state('app.table.footable', {
                //     url: '/footable',
                //     templateUrl: 'tpl/table_footable.html'
                // })
                // .state('app.table.grid', {
                //     url: '/grid',
                //     templateUrl: 'tpl/table_grid.html',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad ){
                //             return $ocLazyLoad.load('ngGrid').then(
                //                 function(){
                //                     return $ocLazyLoad.load('js/controllers/grid.js');
                //                 }
                //             );
                //         }]
                //     }
                // })
                // // form
                // .state('app.form', {
                //     url: '/form',
                //     template: '<div ui-view class="fade-in"></div>',
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad){
                //             return uiLoad.load('js/controllers/form.js');
                //         }]
                //     }
                // })
                // .state('app.form.elements', {
                //     url: '/elements',
                //     templateUrl: 'tpl/form_elements.html'
                // })
                // .state('app.form.validation', {
                //     url: '/validation',
                //     templateUrl: 'tpl/form_validation.html'
                // })
                // .state('app.form.wizard', {
                //     url: '/wizard',
                //     templateUrl: 'tpl/form_wizard.html'
                // })
                // .state('app.form.fileupload', {
                //     url: '/fileupload',
                //     templateUrl: 'tpl/form_fileupload.html',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad){
                //             return $ocLazyLoad.load('angularFileUpload').then(
                //                 function(){
                //                    return $ocLazyLoad.load('js/controllers/file-upload.js');
                //                 }
                //             );
                //         }]
                //     }
                // })
                // .state('app.form.imagecrop', {
                //     url: '/imagecrop',
                //     templateUrl: 'tpl/form_imagecrop.html',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad){
                //             return $ocLazyLoad.load('ngImgCrop').then(
                //                 function(){
                //                    return $ocLazyLoad.load('js/controllers/imgcrop.js');
                //                 }
                //             );
                //         }]
                //     }
                // })
                // .state('app.form.select', {
                //     url: '/select',
                //     templateUrl: 'tpl/form_select.html',
                //     controller: 'SelectCtrl',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad ){
                //             return $ocLazyLoad.load('ui.select').then(
                //                 function(){
                //                     return $ocLazyLoad.load('js/controllers/select.js');
                //                 }
                //             );
                //         }]
                //     }
                // })
                // .state('app.form.slider', {
                //     url: '/slider',
                //     templateUrl: 'tpl/form_slider.html',
                //     controller: 'SliderCtrl',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad ){
                //             return $ocLazyLoad.load('vr.directives.slider').then(
                //                 function(){
                //                     return $ocLazyLoad.load('js/controllers/slider.js');
                //                 }
                //             );
                //         }]
                //     }
                // })
                // .state('app.form.editor', {
                //     url: '/editor',
                //     templateUrl: 'tpl/form_editor.html',
                //     controller: 'EditorCtrl',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad ){
                //             return $ocLazyLoad.load('textAngular').then(
                //                 function(){
                //                     return $ocLazyLoad.load('js/controllers/editor.js');
                //                 }
                //             );
                //         }]
                //     }
                // })
                // // pages
                // .state('app.page', {
                //     url: '/page',
                //     template: '<div ui-view class="fade-in-down"></div>'
                // })
                // .state('app.page.profile', {
                //     url: '/profile',
                //     templateUrl: 'tpl/page_profile.html'
                // })
                // .state('app.page.post', {
                //     url: '/post',
                //     templateUrl: 'tpl/page_post.html'
                // })
                // .state('app.page.search', {
                //     url: '/search',
                //     templateUrl: 'tpl/page_search.html'
                // })
                // .state('app.page.invoice', {
                //     url: '/invoice',
                //     templateUrl: 'tpl/page_invoice.html'
                // })
                // .state('app.page.price', {
                //     url: '/price',
                //     templateUrl: 'tpl/page_price.html'
                // })
                // .state('app.docs', {
                //     url: '/docs',
                //     templateUrl: 'tpl/docs.html'
                // })
                // // others
                // .state('lockme', {
                //     url: '/lockme',
                //     templateUrl: 'tpl/page_lockme.html'
                // })
                // .state('access', {
                //     url: '/access',
                //     template: '<div ui-view class="fade-in-right-big smooth"></div>'
                // })
                // .state('access.signin', {
                //     url: '/signin',
                //     templateUrl: 'tpl/page_signin.html',
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad ){
                //             return uiLoad.load( ['js/controllers/signin.js'] );
                //         }]
                //     }
                // })
                // .state('access.signup', {
                //     url: '/signup',
                //     templateUrl: 'tpl/page_signup.html',
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad ){
                //             return uiLoad.load( ['js/controllers/signup.js'] );
                //         }]
                //     }
                // })
                // .state('access.forgotpwd', {
                //     url: '/forgotpwd',
                //     templateUrl: 'tpl/page_forgotpwd.html'
                // })
                // .state('access.404', {
                //     url: '/404',
                //     templateUrl: 'tpl/page_404.html'
                // })

                // // fullCalendar
                // .state('app.calendar', {
                //     url: '/calendar',
                //     templateUrl: 'tpl/app_calendar.html',
                //     // use resolve to load other dependences
                //     resolve: {
                //         deps: ['$ocLazyLoad', 'uiLoad',
                //           function( $ocLazyLoad, uiLoad ){
                //             return uiLoad.load(
                //               ['vendor/jquery/fullcalendar/fullcalendar.css',
                //                 'vendor/jquery/fullcalendar/theme.css',
                //                 'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                //                 'vendor/libs/moment.min.js',
                //                 'vendor/jquery/fullcalendar/fullcalendar.min.js',
                //                 'js/app/calendar/calendar.js']
                //             ).then(
                //               function(){
                //                 return $ocLazyLoad.load('ui.calendar');
                //               }
                //             )
                //         }]
                //     }
                // })

                // // mail
                // .state('app.mail', {
                //     abstract: true,
                //     url: '/mail',
                //     templateUrl: 'tpl/mail.html',
                //     // use resolve to load other dependences
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad ){
                //             return uiLoad.load( ['js/app/mail/mail.js',
                //                                  'js/app/mail/mail-service.js',
                //                                  'vendor/libs/moment.min.js'] );
                //         }]
                //     }
                // })
                // .state('app.mail.list', {
                //     url: '/inbox/{fold}',
                //     templateUrl: 'tpl/mail.list.html'
                // })
                // .state('app.mail.detail', {
                //     url: '/{mailId:[0-9]{1,4}}',
                //     templateUrl: 'tpl/mail.detail.html'
                // })
                // .state('app.mail.compose', {
                //     url: '/compose',
                //     templateUrl: 'tpl/mail.new.html'
                // })

                // .state('layout', {
                //     abstract: true,
                //     url: '/layout',
                //     templateUrl: 'tpl/layout.html'
                // })
                // .state('layout.fullwidth', {
                //     url: '/fullwidth',
                //     views: {
                //         '': {
                //             templateUrl: 'tpl/layout_fullwidth.html'
                //         },
                //         'footer': {
                //             templateUrl: 'tpl/layout_footer_fullwidth.html'
                //         }
                //     },
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad ){
                //             return uiLoad.load( ['js/controllers/vectormap.js'] );
                //         }]
                //     }
                // })
                // .state('layout.mobile', {
                //     url: '/mobile',
                //     views: {
                //         '': {
                //             templateUrl: 'tpl/layout_mobile.html'
                //         },
                //         'footer': {
                //             templateUrl: 'tpl/layout_footer_mobile.html'
                //         }
                //     }
                // })
                // .state('layout.app', {
                //     url: '/app',
                //     views: {
                //         '': {
                //             templateUrl: 'tpl/layout_app.html'
                //         },
                //         'footer': {
                //             templateUrl: 'tpl/layout_footer_fullwidth.html'
                //         }
                //     },
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad ){
                //             return uiLoad.load( ['js/controllers/tab.js'] );
                //         }]
                //     }
                // })
                // .state('apps', {
                //     abstract: true,
                //     url: '/apps',
                //     templateUrl: 'tpl/layout.html'
                // })
                // .state('apps.note', {
                //     url: '/note',
                //     templateUrl: 'tpl/apps_note.html',
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad ){
                //             return uiLoad.load( ['js/app/note/note.js',
                //                                  'vendor/libs/moment.min.js'] );
                //         }]
                //     }
                // })
                // .state('apps.contact', {
                //     url: '/contact',
                //     templateUrl: 'tpl/apps_contact.html',
                //     resolve: {
                //         deps: ['uiLoad',
                //           function( uiLoad ){
                //             return uiLoad.load( ['js/app/contact/contact.js'] );
                //         }]
                //     }
                // })
                // .state('app.weather', {
                //     url: '/weather',
                //     templateUrl: 'tpl/apps_weather.html',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad ){
                //             return $ocLazyLoad.load(
                //                 {
                //                     name: 'angular-skycons',
                //                     files: ['js/app/weather/skycons.js',
                //                             'vendor/libs/moment.min.js',
                //                             'js/app/weather/angular-skycons.js',
                //                             'js/app/weather/ctrl.js' ]
                //                 }
                //             );
                //         }]
                //     }
                // })
                // .state('music', {
                //     url: '/music',
                //     templateUrl: 'tpl/music.html',
                //     controller: 'MusicCtrl',
                //     resolve: {
                //         deps: ['$ocLazyLoad',
                //           function( $ocLazyLoad ){
                //             return $ocLazyLoad.load([
                //               'com.2fdevs.videogular',
                //               'com.2fdevs.videogular.plugins.controls',
                //               'com.2fdevs.videogular.plugins.overlayplay',
                //               'com.2fdevs.videogular.plugins.poster',
                //               'com.2fdevs.videogular.plugins.buffering',
                //               'js/app/music/ctrl.js',
                //               'js/app/music/theme.css'
                //             ]);
                //         }]
                //     }
                // })
                //   .state('music.home', {
                //       url: '/home',
                //       templateUrl: 'tpl/music.home.html'
                //   })
                //   .state('music.genres', {
                //       url: '/genres',
                //       templateUrl: 'tpl/music.genres.html'
                //   })
                //   .state('music.detail', {
                //       url: '/detail',
                //       templateUrl: 'tpl/music.detail.html'
                //   })
                //   .state('music.mtv', {
                //       url: '/mtv',
                //       templateUrl: 'tpl/music.mtv.html'
                //   })
                //   .state('music.mtvdetail', {
                //       url: '/mtvdetail',
                //       templateUrl: 'tpl/music.mtv.detail.html'
                //   })
                //   .state('music.playlist', {
                //       url: '/playlist/{fold}',
                //       templateUrl: 'tpl/music.playlist.html'
                //   })
            }
        ]
    );