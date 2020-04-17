//JavaScript代码区域
layui.use(['table', 'element', 'layer', 'upload'], function() {
	var element = layui.element,
		layer = layui.layer,
		table = layui.table,
		upload = layui.upload;

	//多图片上传
	upload.render({
		elem: '#test2',
		url: config.elevatorBackUrl + 'other/upload/img',
		multiple: true,
		data: {
			"name": "zyb",
			"age": 22
		},
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#demo2').append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">')
			});
		},
		done: function(res) {
			//上传完毕
			if(res.code > 0) {
				return layer.msg('图片上传失败');
			} else {
				return layer.msg('图片上传成功');
			}
		}
	});
});