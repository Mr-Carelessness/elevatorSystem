package cn.edu.zucc.elevator.entity;

public class ElevatorStateDistribution {
	private static int id0 = 0;
	private static String desc01 = "施工中";
	private int count0;
	
	private static int id1 = 1;
	private static String desc11 = "待投入运行";
	private int count1;
	
	private static int id2 = 2;
	private static String desc21 = "运行中";
	private int count2;
	
	private static int id3 = 2;
	private static String desc31 = "维修中";
	private int count3;
	
	
	
	public int getCount0() {
		return count0;
	}
	public void setCount0(int count0) {
		this.count0 = count0;
	}
	public int getCount1() {
		return count1;
	}
	public void setCount1(int count1) {
		this.count1 = count1;
	}
	public int getCount2() {
		return count2;
	}
	public void setCount2(int count2) {
		this.count2 = count2;
	}
	public int getCount3() {
		return count3;
	}
	public void setCount3(int count3) {
		this.count3 = count3;
	}
	
}
