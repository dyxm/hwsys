//延迟
if($('#delay').html()!=undefined){
	laydate({
	    elem: '#delay', 
	    event: 'click',
	    format: 'YYYY-MM-DD hh:mm:ss', //日期格式
        istime: true, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: true, //是否显示今天
        issure: true, //是否显示确认
        festival: true, //是否显示节日
        min: laydate.now(), //最小日期
        max: '2099-12-31 23:59:59', //最大日期
        choose: function(dates){ //选择好日期的回调
        	setDelay(dates);
			//$('#delay').html('提前结束');
        }
	});
}


//提前
if($('#advance').html()!=undefined){
	laydate({
	    elem: '#advance', 
	    event: 'click',
	    format: 'YYYY-MM-DD hh:mm:ss', //日期格式
        istime: true, //是否开启时间选择
        isclear: true, //是否显示清空
        istoday: true, //是否显示今天
        issure: true, //是否显示确认
        festival: true, //是否显示节日
        min: laydate.now(), //最小日期
        max: '{$taskData.deadline}', //最大日期
        choose: function(dates){ //选择好日期的回调
        	setAdvance(dates);
        }
	});
}