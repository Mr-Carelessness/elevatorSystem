package cn.edu.zucc.elevator.entity;

import java.util.List;

public class SuperManagerIndexData {
	//单位总数
	private int companyNumber;
	//新增单位
	private List<Company> recentAddCompany;
	//根据用户数排名靠前的单位
	private List<CompanyOperatorCount> sortByOperatorNumberCompany;
	//根据电梯数排名靠前的单位
	private List<CompanyElevatorCount> sortByElevatorNumberCompany;
	
	
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

	
	
	public int getCompanyNumber() {
		return companyNumber;
	}

	public void setCompanyNumber(int companyNumber) {
		this.companyNumber = companyNumber;
	}

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

	public List<Company> getRecentAddCompany() {
		return recentAddCompany;
	}

	public void setRecentAddCompany(List<Company> recentAddCompany) {
		this.recentAddCompany = recentAddCompany;
	}

	public List<CompanyOperatorCount> getSortByOperatorNumberCompany() {
		return sortByOperatorNumberCompany;
	}

	public void setSortByOperatorNumberCompany(List<CompanyOperatorCount> sortByOperatorNumberCompany) {
		this.sortByOperatorNumberCompany = sortByOperatorNumberCompany;
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

	public List<CompanyElevatorCount> getSortByElevatorNumberCompany() {
		return sortByElevatorNumberCompany;
	}

	public void setSortByElevatorNumberCompany(List<CompanyElevatorCount> sortByElevatorNumberCompany) {
		this.sortByElevatorNumberCompany = sortByElevatorNumberCompany;
	}
	
	
	
}
