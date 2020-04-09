package cn.edu.zucc.elevator.entity;

public class ElevatorScoreDistribution {
	private static int id1 = 1;
	private static String desc11 = "0分-2分";
	private static String desc12 = "不合格";
	private int count1;
	
	private static int id2 = 2;
	private static String desc21 = "2分-3分";
	private static String desc22 = "一般";
	private int count2;
	
	private static int id3 = 3;
	private static String desc31 = "3分-4分";
	private static String desc32 = "良";
	private int count3;
	
	private static int id4 = 1;
	private static String desc41 = "4分-5分";
	private static String desc42 = "优";
	private int count4;
	
	
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
	public int getCount4() {
		return count4;
	}
	public void setCount4(int count4) {
		this.count4 = count4;
	}
	
	
}
