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
		{field: 'id', title: '排名', type:"numbers", width:70},
		{field: 'cname', title: '单位名称'},
		{field: 'address', title: '单位地址'},
		{field: 'count', title: '单位电梯数量', width:120},
	]];
	var col2 = [[
		{field: 'cname', title: '单位名称'}
	]];
	var col3 = [[
		{field: 'id', title: '排名', type:"numbers", width:80},
		{field: 'cname', title: '单位名称'},
		{field: 'address', title: '单位地址'},
		{field: 'count', title: '单位成员数量', width:150},
	]];
	
	layui.use(['table'], function() {
		var table = layui.table;
		getChartData(table);
	
	});
	
	function getChartData(table){
		var url = LOCAL_ADDRESS + "other/index/getSuperManagerIndexData?managerId="+userInfo.id+"&managerType=1";
		
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
					document.getElementById("c1").innerText = chartData.companyNumber;
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
					setChart3();
					setChart4();
					setChart5();
					setChart6();
					//表格设置
					tableIns = table.render({
						elem: '#demo1',
						title: '单位电梯贡献度',
						data: chartData.sortByElevatorNumberCompany, 
						limit: 10,
						cols: col1,
					});
					tableIns = table.render({
						elem: '#demo2',
						title: '新增单位',
						data: chartData.recentAddCompany, 
						limit: 10,
						cols: col2,
					});
					tableIns = table.render({
						elem: '#demo3',
						title: '单位成员贡献度',
						data: chartData.sortByOperatorNumberCompany, 
						limit: 10,
						cols: col3,
					});
					
				}
			}
		});
	}
	
	function setChart1(){
		var convertData = function (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var item = data[i];
		        if (item) {
		            res.push({
		                name: data[i].elevatorName,
		                value: [data[i].longtitude, data[i].latitude, data[i].score*20]
		            });
		        }
		    }
		    console.log(res);
		    return res;
		};
		myChart1 = echarts.init(document.getElementById('main1'), 'shine');
	    // 指定图表的配置项和数据
	    var option = {
		    title: {
		        text: '电梯地理位置分布概况',
		        textStyle: {
		            fontSize: 21
		        },
		        subtext: '由于同一区块电梯过于拥挤，可能压缩成1个点，地图暂不支持放大操作',
		        subtextStyle: {
		            fontSize: 12
		        },
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: function (params) {
		            return params.name + ' : ' + params.value[2] + '分';
		        }
		    },
		    /*legend: {
		        orient: 'vertical',
		        top: 'bottom',
		        left: 'right',
		        data:['pm2.5'],
		        textStyle: {
		            color: '#fff'
		        }
		    },*/
		    visualMap: {
		        min: 0,
		        max: 200,
		        calculable: true,
		        inRange: {
		            color: ['#50a3ba', '#eac736', '#d94e5d']
		        },
		        textStyle: {
		            color: '#fff'
		        }
		    },
		    geo: {
		        map: '浙江',
		        itemStyle: {
		            areaColor: '#323c48',
		            borderColor: '#111'
		        },
		        emphasis: {
		            itemStyle: {
		                areaColor: '#2a333d'
		            },
		            label: {
		                show: false
		            }
		        }
		    },
		    series: [
		        {
		            name: 'pm2.5',
		            type: 'scatter',
		            coordinateSystem: 'geo',
		            data: convertData(chartData.elevator),
		            symbolSize: 12,
		            emphasis: {
		                itemStyle: {
		                    borderColor: '#fff',
		                    borderWidth: 1
		                }
		            }
		        }
		    ]
		};
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
		        x: 'center',
		        text: '用户构成',
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
		        text: '管理员构成情况',
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
		        data: ['超级管理员', '单位管理员']
		    },
		    series: [
		        {
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
		                {value: chartData.userDistribution.superManagerCount, name: '超级管理员'},
		                {value: chartData.userDistribution.companyManagerCount, name: '单位管理员'}
		            ]
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
	    myChart6.setOption(option);
	    window.addEventListener("resize", function () {
	        myChart6.resize();
	    });
	}
	function setChart7(){
		
	}
	
	
}