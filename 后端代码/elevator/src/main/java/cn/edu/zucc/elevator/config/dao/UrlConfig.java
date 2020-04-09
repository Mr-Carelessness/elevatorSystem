package cn.edu.zucc.elevator.config.dao;

public class UrlConfig {
	private static String imgLocalUrl = "C:\\inetpub\\wwwroot\\resource\\img\\";
	//本机地址："E:\\tmp\\"
	//部署服务器地址："C:\\inetpub\\wwwroot\\resource\\img\\";
	private static String imgPublicUrl = "https://zuccsecondary.cn/resource/img/";
	//本机地址："E:\\tmp\\"
	//部署服务器地址："https://zuccsecondary.cn/resource/img/";
	
	
	
	public static String getImgLocalUrl() {
		return imgLocalUrl;
	}
	public static String getImgPublicUrl() {
		return imgPublicUrl;
	}
}
