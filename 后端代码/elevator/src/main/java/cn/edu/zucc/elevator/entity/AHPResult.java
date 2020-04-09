package cn.edu.zucc.elevator.entity;

public class AHPResult {
	private double CR;
	private double CI;
	private double []weight;
	private boolean testResult;
	private String testInfo;
	
	public double getCR() {
		return CR;
	}
	public void setCR(double cR) {
		CR = cR;
	}
	public double getCI() {
		return CI;
	}
	public void setCI(double cI) {
		CI = cI;
	}
	public double[] getWeight() {
		return weight;
	}
	public void setWeight(double[] weight) {
		this.weight = weight;
	}
	public boolean isTestResult() {
		return testResult;
	}
	public void setTestResult(boolean testResult) {
		this.testResult = testResult;
	}
	public String getTestInfo() {
		return testInfo;
	}
	public void setTestInfo(String testInfo) {
		this.testInfo = testInfo;
	}
	
	
}
