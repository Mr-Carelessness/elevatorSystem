package cn.edu.zucc.elevator.entity;

import java.util.List;

public class ManagerIndexData {
	//接收消息数量 
	private int receivedMessageNumber;
	//接收已读消息数量
	private int receivedMessageNumberRead;
	//接收未读消息数量
	private int receivedMessageNumberUnread;
	//发送消息数量
	private int sendMessageNumber;
	
	//电梯总数
	private int elevatorNumber;
	//所有电梯
	private List<Elevator> elevator;
	//电梯得分分布情况
	private ElevatorScoreDistribution elevatorScoreDistribution;
	//电梯当前状态分布情况
	private ElevatorStateDistribution elevatorStateDistribution;
	
	//单位成员分布情况
	private UserDistribution userDistribution;
	
	//最近施工信息
	private List<Construction> recentConstruction;
	//施工状态分布
	private ConstructionStateDistribution constructionStateDistribution;
	
	//最近施工信息
	private List<Inspection> recentInspection;
	//电梯巡查记录数量
	private int inspectionCount;
	
	//最近维护信息
	private List<Maintainence> recentMaintainence;
	//维护状态分布
	private MaintainenceStateDistribution maintainenceStateDistribution;
	
	//最近检测信息
	private List<Testing> recentTesting;
	//检测状态分布
	private TestingStateDistribution testingStateDistribution;
	
	
	public int getReceivedMessageNumber() {
		return receivedMessageNumber;
	}
	public void setReceivedMessageNumber(int receivedMessageNumber) {
		this.receivedMessageNumber = receivedMessageNumber;
	}
	public int getReceivedMessageNumberRead() {
		return receivedMessageNumberRead;
	}
	public void setReceivedMessageNumberRead(int receivedMessageNumberRead) {
		this.receivedMessageNumberRead = receivedMessageNumberRead;
	}
	public int getReceivedMessageNumberUnread() {
		return receivedMessageNumberUnread;
	}
	public void setReceivedMessageNumberUnread(int receivedMessageNumberUnread) {
		this.receivedMessageNumberUnread = receivedMessageNumberUnread;
	}
	public int getSendMessageNumber() {
		return sendMessageNumber;
	}
	public void setSendMessageNumber(int sendMessageNumber) {
		this.sendMessageNumber = sendMessageNumber;
	}
	public int getElevatorNumber() {
		return elevatorNumber;
	}
	public void setElevatorNumber(int elevatorNumber) {
		this.elevatorNumber = elevatorNumber;
	}
	public List<Elevator> getElevator() {
		return elevator;
	}
	public void setElevator(List<Elevator> elevator) {
		this.elevator = elevator;
	}
	public ElevatorScoreDistribution getElevatorScoreDistribution() {
		return elevatorScoreDistribution;
	}
	public void setElevatorScoreDistribution(ElevatorScoreDistribution elevatorScoreDistribution) {
		this.elevatorScoreDistribution = elevatorScoreDistribution;
	}
	public ElevatorStateDistribution getElevatorStateDistribution() {
		return elevatorStateDistribution;
	}
	public void setElevatorStateDistribution(ElevatorStateDistribution elevatorStateDistribution) {
		this.elevatorStateDistribution = elevatorStateDistribution;
	}
	public UserDistribution getUserDistribution() {
		return userDistribution;
	}
	public void setUserDistribution(UserDistribution userDistribution) {
		this.userDistribution = userDistribution;
	}
	public List<Construction> getRecentConstruction() {
		return recentConstruction;
	}
	public void setRecentConstruction(List<Construction> recentConstruction) {
		this.recentConstruction = recentConstruction;
	}
	public ConstructionStateDistribution getConstructionStateDistribution() {
		return constructionStateDistribution;
	}
	public void setConstructionStateDistribution(ConstructionStateDistribution constructionStateDistribution) {
		this.constructionStateDistribution = constructionStateDistribution;
	}
	public List<Inspection> getRecentInspection() {
		return recentInspection;
	}
	public void setRecentInspection(List<Inspection> recentInspection) {
		this.recentInspection = recentInspection;
	}
	public int getInspectionCount() {
		return inspectionCount;
	}
	public void setInspectionCount(int inspectionCount) {
		this.inspectionCount = inspectionCount;
	}
	public List<Maintainence> getRecentMaintainence() {
		return recentMaintainence;
	}
	public void setRecentMaintainence(List<Maintainence> recentMaintainence) {
		this.recentMaintainence = recentMaintainence;
	}
	public MaintainenceStateDistribution getMaintainenceStateDistribution() {
		return maintainenceStateDistribution;
	}
	public void setMaintainenceStateDistribution(MaintainenceStateDistribution maintainenceStateDistribution) {
		this.maintainenceStateDistribution = maintainenceStateDistribution;
	}
	public List<Testing> getRecentTesting() {
		return recentTesting;
	}
	public void setRecentTesting(List<Testing> recentTesting) {
		this.recentTesting = recentTesting;
	}
	public TestingStateDistribution getTestingStateDistribution() {
		return testingStateDistribution;
	}
	public void setTestingStateDistribution(TestingStateDistribution testingStateDistribution) {
		this.testingStateDistribution = testingStateDistribution;
	}
	
	
	
}
