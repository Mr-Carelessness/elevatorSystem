package cn.edu.zucc.elevator.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Elevator {
    private Integer id;

    private Integer companyId;

    private Company company;
    
    private String elevatorName;

    private String equipmentType;

    private String equipmentName;

    private String typeNumber;

    private Float speed;

    private Integer floor;

    private Float weight;

    private Float liftHeight;

    private String address;

    private Double longtitude;

    private Double latitude;

    private Integer state;

    private Date planDate;
    
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date runningDate;

    private Float score;
    
    private ElevatorIndices elevatorIndices;
    
    private Integer delflag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

    public String getElevatorName() {
		return elevatorName;
	}

	public void setElevatorName(String elevatorName) {
		this.elevatorName = elevatorName;
	}

	public String getEquipmentType() {
		return equipmentType;
	}

	public void setEquipmentType(String equipmentType) {
		this.equipmentType = equipmentType;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getTypeNumber() {
		return typeNumber;
	}

	public void setTypeNumber(String typeNumber) {
		this.typeNumber = typeNumber;
	}

	public Float getSpeed() {
        return speed;
    }

    public void setSpeed(Float speed) {
        this.speed = speed;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }
    
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Double getLongtitude() {
        return longtitude;
    }

    public void setLongtitude(Double longtitude) {
        this.longtitude = longtitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }
    
    public Float getLiftHeight() {
		return liftHeight;
	}

	public void setLiftHeight(Float liftHeight) {
		this.liftHeight = liftHeight;
	}

	public Date getPlanDate() {
		return planDate;
	}

	public void setPlanDate(Date planDate) {
		this.planDate = planDate;
	}

	public Date getRunningDate() {
		return runningDate;
	}

	public void setRunningDate(Date runningDate) {
		this.runningDate = runningDate;
	}

	public ElevatorIndices getElevatorIndices() {
		return elevatorIndices;
	}

	public void setElevatorIndices(ElevatorIndices elevatorIndices) {
		this.elevatorIndices = elevatorIndices;
	}

	public Integer getDelflag() {
        return delflag;
    }

    public void setDelflag(Integer delflag) {
        this.delflag = delflag;
    }
    
}