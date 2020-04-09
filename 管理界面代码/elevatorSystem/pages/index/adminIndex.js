//========================================
init();
//========================================
function init(){
	layui.use('form', function() {
		form = layui.form;
		layer = layui.layer;
		load();
	});
	
}

function load(){
	var userInfo = JSON.parse(localStorage.getItem("adminInfo"));
	const LOCAL_ADDRESS = config.elevatorBackUrl;
	
	var chartData = {};
	//图表变量定义
	var myChart1;
	var myChart2;
	var myChart3;
	var myChart4;
	var myChart5;
	var myChart6;
	var myChart7;
	//表格列定义
	var col1 = [[
		{field: 'id', title: '序号', type:"numbers", width:70},
		{field: 'elevator', title: '施工电梯', templet:"#elevator"},
		{field: 'company', title: '所在公司', templet:"#company"},
		{field: 'state', title: '当前状态', width: 100, templet:"#state1"}
	]];
	var col2 = [[
		{field: 'id', title: '序号', type:"numbers", width:70},
		{field: 'company', title: '巡查者', templet:"#operator"},
		{field: 'elevator', title: '巡查电梯', templet:"#elevator"},
		{field: 'inspectionDate', title: '巡查时间'}
	]];
	var col3 = [[
		{field: 'id', title: '序号', type:"numbers", width:70},
		{field: 'elevator', title: '维护电梯', templet:"#elevator"},
		{field: 'company', title: '所在公司', templet:"#company"},
		{field: 'state', title: '当前状态', width: 100, templet:"#state3"}
	]];
	var col4 = [[
		{field: 'id', title: '序号', type:"numbers", width:70},
		{field: 'elevator', title: '检测电梯', templet:"#elevator"},
		{field: 'company', title: '所在公司', templet:"#company"},
		{field: 'state', title: '当前状态', width: 100, templet:"#state4"}
	]];
	
	layui.use(['table'], function() {
		var table = layui.table;
		getChartData(table);
	
	});
	
	function getChartData(table){
		var url = LOCAL_ADDRESS + "other/index/getManagerIndexData?managerId="+userInfo.id+"&managerType=0&companyId="+userInfo.company.id;
		document.getElementById("c1").innerText = userInfo.company.cname;
		var auth = userInfo.company.authority;
		if(auth[0] != 1){
			document.getElementById("a4").style.display = "none";
			document.getElementById("a5").style.display = "none";
			document.getElementById("block-construction").style.display = "none";
		}
		if(auth[1] != 1){
			document.getElementById("a6").style.display = "none";
			document.getElementById("a7").style.display = "none";
			document.getElementById("a8").style.display = "none";
			document.getElementById("a9").style.display = "none";
			document.getElementById("block-inspection").style.display = "none";
		}
		if(auth[2] != 1){
			document.getElementById("a10").style.display = "none";
			document.getElementById("a11").style.display = "none";
			document.getElementById("a12").style.display = "none";
			document.getElementById("block-maintainence").style.display = "none";
		}
		if(auth[3] != 1){
			document.getElementById("a13").style.display = "none";
			document.getElementById("a14").style.display = "none";
			document.getElementById("block-testing").style.display = "none";
		}
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: {},
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				if(result.code == 0) {
					chartData = result.data;
					
					// 设置图表内容
					document.getElementById("c2").innerText = chartData.elevatorNumber;
					document.getElementById("c3").innerText = chartData.userDistribution.allCount;
					document.getElementById("c4").innerText = 12345;
					document.getElementById("m1").innerText = chartData.receivedMessageNumber;
					document.getElementById("m2").innerText = chartData.receivedMessageNumberRead;
					document.getElementById("m3").innerText = chartData.receivedMessageNumberUnread;
					document.getElementById("m4").innerText = chartData.sendMessageNumber;
					// 调用函数设置
					setChart1();
					setChart2();
					
					if(auth[0] == 1){
						// 赋值表格数据
						tableIns = table.render({
							elem: '#demo1',
							title: '最新施工记录',
							data: chartData.recentConstruction, 
							limit: 5,
							cols: col1,
						});
						setChart3();
					}
					if(auth[1] == 1){
						// 赋值表格数据
						tableIns = table.render({
							elem: '#demo2',
							title: '最新巡查记录',
							data: chartData.recentInspection, 
							limit: 10,
							cols: col2,
						});
						setChart4();
						setChart5();
					}
					if(auth[2] == 1){
						// 赋值表格数据
						tableIns = table.render({
							elem: '#demo3',
							title: '最新维护记录',
							data: chartData.recentMaintainence, 
							limit: 5,
							cols: col3,
						});
						setChart6();
					}
					if(auth[3] == 1){
						// 赋值表格数据
						tableIns = table.render({
							elem: '#demo4',
							title: '最新检测记录',
							data: chartData.recentTesting, 
							limit: 5,
							cols: col4,
						});
						setChart7();
					}
					
				}
			}
		});
	}
	
	function setChart1(){
		myChart1 = echarts.init(document.getElementById('main1'), 'shine');
	    // 指定图表的配置项和数据
	    var option = {
		    title: {
		        x: 'center',
		        text: '单位成员构成情况',
		        textStyle: {
		            fontSize: 21
		        },
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    grid: {
		        left: '2%',
		        right: '2%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value',
		        boundaryGap: [0, 0.01]
		    },
		    yAxis: {
		        type: 'category',
		        data: ['总量(人)', '管理员', '操作者', '普通用户']
		    },
		    series: [
		        {
		            type: 'bar',
		            data: [chartData.userDistribution.allCount, chartData.userDistribution.managerCount, chartData.userDistribution.operatorCount, chartData.userDistribution.userCount],
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                           '#c12e34', '#e6b600', '#0098d9', '#2b821d', 
		                           '#005eaa', '#339ca8', '#cda819', '#32a487'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'right',
		                        formatter: '{c}'
		                    }
		                }
		            }
		        }
		    ]
		};
	    // 使用刚指定的配置项和数据显示图表。
	    myChart1.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart1.resize();
	    });
	}
	function setChart2(){
		myChart2 = echarts.init(document.getElementById('main2'), 'shine');
	    // 指定图表的配置项和数据
	    var option = {
		    title: {
		        text: '操作者构成情况',
		        left: 'center',
		        textStyle: {
		            fontSize: 21
		        },
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b}: {c} ({d}%)'
		    },
		    legend: {
		        orient: 'vertival',
		        top: 'bottom',
		        left: 'right',
		        data: ['施工负责人', '巡查员', '维护人员', '检测人员']
		    },
		    series: [
		        {
		            name: '访问来源',
		            type: 'pie',
		            radius: '65%',
		            center: ['50%', '50%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data: [
		                {value: chartData.userDistribution.constructorCount, name: '施工负责人'},
		                {value: chartData.userDistribution.inspectorCount, name: '巡查员'},
		                {value: chartData.userDistribution.maintainorCount, name: '维护人员'},
		                {value: chartData.userDistribution.testorCount, name: '检测人员'}
		            ]
		        }
		    ]
		};
	    // 使用刚指定的配置项和数据显示图表。
	    myChart2.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart2.resize();
	    });
	}
	function setChart3(){
		myChart3 = echarts.init(document.getElementById('main3'), 'shine');
	    // 指定图表的配置项和数据
	    var option = {
		    title: {
		        x: 'center',
		        text: '施工任务完成情况',
		        textStyle: {
		            fontSize: 21
		        },
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: ['待安排', '施工中', '已完成'],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis: [
		        {
		            name: '任务数量',
		            type: 'value'
		        }
		    ],
		    series: [
		        {
		            type: 'bar',
		            barWidth: '50%',
		            data: [chartData.constructionStateDistribution.count0, chartData.constructionStateDistribution.count1, chartData.constructionStateDistribution.count2],
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                           '#c12e34', '#e6b600', '#2b821d', '#0098d9', 
		                           '#005eaa', '#339ca8', '#cda819', '#32a487'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{c}'
		                    }
		                }
		            }
		        }
		    ]
		};

	    // 使用刚指定的配置项和数据显示图表。
	    myChart3.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart3.resize();
	    });
	}
	function setChart4(){
		myChart4 = echarts.init(document.getElementById('main4'), 'shine');
	    // 指定图表的配置项和数据
	    var option = {
		    title: {
		        x: 'center',
		        text: '电梯得分分布状况',
		        textStyle: {
		            fontSize: 21
		        },
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: ['[0,40)分/高危状态', '[40,60)分/轻度危险', '[60,80)分/较为安全', '[80,100]/非常安全'],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis: [
		        {
		            name: '任务数量',
		            type: 'value'
		        }
		    ],
		    series: [
		        {
		            type: 'bar',
		            barWidth: '50%',
		            data: [chartData.elevatorScoreDistribution.count1, chartData.elevatorScoreDistribution.count2, chartData.elevatorScoreDistribution.count3, chartData.elevatorScoreDistribution.count4],
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                           '#c12e34', '#e6b600', '#0098d9', '#2b821d', 
		                           '#005eaa', '#339ca8', '#cda819', '#32a487'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{c}'
		                    }
		                }
		            }
		        }
		    ]
		};

	    // 使用刚指定的配置项和数据显示图表。
	    myChart4.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart4.resize();
	    });
	}
	function setChart5(){
		myChart5 = echarts.init(document.getElementById('main5'), 'shine');
	    // 指定图表的配置项和数据
	    var option = {
		    title: {
		        x: 'center',
		        text: '电梯当前状态分布状况',
		        textStyle: {
		            fontSize: 21
		        },
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: ['施工中', '待投入运行', '运行中', '维护中'],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis: [
		        {
		            name: '任务数量',
		            type: 'value'
		        }
		    ],
		    series: [
		        {
		            type: 'bar',
		            barWidth: '50%',
		            data: [chartData.elevatorStateDistribution.count0, chartData.elevatorStateDistribution.count1, chartData.elevatorStateDistribution.count2, chartData.elevatorStateDistribution.count3],
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                           '#e6b600', '#2b821d', '#0098d9', '#c12e34',
		                           '#005eaa', '#339ca8', '#cda819', '#32a487'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{c}'
		                    }
		                }
		            }
		        }
		    ]
		};

	    // 使用刚指定的配置项和数据显示图表。
	    myChart5.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart5.resize();
	    });
	}
	function setChart6(){
		myChart6 = echarts.init(document.getElementById('main6'), 'shine');
	    // 指定图表的配置项和数据
	    var option = {
		    title: {
		        x: 'center',
		        text: '维护任务完成情况',
		        textStyle: {
		            fontSize: 21
		        },
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: ['待安排', '维护中', '已完成'],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis: [
		        {
		            name: '任务数量',
		            type: 'value'
		        }
		    ],
		    series: [
		        {
		            type: 'bar',
		            barWidth: '50%',
		            data: [chartData.maintainenceStateDistribution.count0, chartData.maintainenceStateDistribution.count1, chartData.maintainenceStateDistribution.count2],
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                           '#c12e34', '#e6b600', '#2b821d', '#0098d9', 
		                           '#005eaa', '#339ca8', '#cda819', '#32a487'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{c}'
		                    }
		                }
		            }
		        }
		    ]
		};

	    // 使用刚指定的配置项和数据显示图表。
	    myChart6.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart6.resize();
	    });
	}
	function setChart7(){
		myChart7 = echarts.init(document.getElementById('main7'), 'shine');
	    // 指定图表的配置项和数据
	    var option = {
		    title: {
		        x: 'center',
		        text: '检测任务完成情况',
		        textStyle: {
		            fontSize: 21
		        },
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: ['待安排', '检测中', '已完成'],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis: [
		        {
		            name: '任务数量',
		            type: 'value'
		        }
		    ],
		    series: [
		        {
		            type: 'bar',
		            barWidth: '50%',
		            data: [chartData.testingStateDistribution.count0, chartData.testingStateDistribution.count1, chartData.testingStateDistribution.count2],
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                           '#c12e34', '#e6b600', '#2b821d', '#0098d9', 
		                           '#005eaa', '#339ca8', '#cda819', '#32a487'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{c}'
		                    }
		                }
		            }
		        }
		    ]
		};

	    // 使用刚指定的配置项和数据显示图表。
	    myChart7.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart7.resize();
	    });
	}
	
	
}