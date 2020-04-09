package cn.edu.zucc.elevator.entity;

public class AHPBody {
	// 二维数组大小
	private Integer size;
	// 二维数组
	private double[][] arr;
	// 备用数组
	private double[][] tmp;
	
	public double[][] getArr() {
		return arr;
	}
	public void setArr(String str) {
		//System.out.println(str.substring(1, str.length()-1));
		String []a = str.substring(1, str.length()-1).split(",");
		int sz = (int) Math.sqrt(a.length);
		double [][]b = new double[sz][sz];
		double [][]temp = new double[sz][sz];
		
		String []tmp;
		for(int i=0;i<sz;i++) {
			for(int j=0;j<sz;j++) {
				if(a[i*sz+j].contains("/")) {
					tmp = a[i*sz+j].split("/");
					b[i][j] = new Double(tmp[0])/new Double(tmp[1]);
					temp[i][j] = b[i][j];
				}else {
					b[i][j] = new Double(a[i*sz+j]);
					temp[i][j] = b[i][j];
				}
				//System.out.println(i+":"+j+"-----"+b[i][j]);
			}
		}
		this.arr = b;
		this.tmp = temp;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public double[][] getTmp() {
		return tmp;
	}
	public void setTmp(double[][] tmp) {
		this.tmp = tmp;
	}
	
	
	
}
