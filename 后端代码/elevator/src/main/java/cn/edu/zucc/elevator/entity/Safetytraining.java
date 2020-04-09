package cn.edu.zucc.elevator.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Safetytraining {
    private Integer id;

    private Integer companyId;

    private String record;

    private Integer participantNumber;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date trainingDate;
    
    private String imgUrl;
    
    private Integer delflag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record == null ? null : record.trim();
    }

    public Date getTrainingDate() {
        return trainingDate;
    }

    public void setTrainingdate(Date trainingDate) {
        this.trainingDate = trainingDate;
    }

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public Integer getParticipantNumber() {
		return participantNumber;
	}

	public void setParticipantNumber(Integer participantNumber) {
		this.participantNumber = participantNumber;
	}
	
	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
	public void setTrainingDate(Date trainingDate) {
		this.trainingDate = trainingDate;
	}

	public void setDelflag(Integer delflag) {
		this.delflag = delflag;
	}

	public Integer getDelflag() {
		return delflag;
	}

	public void setDelFlag(Integer delFlag) {
		this.delflag = delFlag;
	}

}