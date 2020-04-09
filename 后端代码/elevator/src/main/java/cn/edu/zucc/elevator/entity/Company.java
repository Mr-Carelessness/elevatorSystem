package cn.edu.zucc.elevator.entity;

public class Company {
    private Integer id;

    private String cname;//

    private String address;

    private String authority;

    private String safetyManagementInfo;

    private String securityTechnologyInfo;

    private String emegyTechnologyInfo;

    private String safetyOrganizationInfo;

    private String sealUrl;

    private String avatarUrl;

    private Integer delflag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname == null ? null : cname.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority == null ? null : authority.trim();
    }

    public String getSafetyManagementInfo() {
		return safetyManagementInfo;
	}

	public void setSafetyManagementInfo(String safetyManagementInfo) {
		this.safetyManagementInfo = safetyManagementInfo;
	}

	public String getSecurityTechnologyInfo() {
		return securityTechnologyInfo;
	}

	public void setSecurityTechnologyInfo(String securityTechnologyInfo) {
		this.securityTechnologyInfo = securityTechnologyInfo;
	}

	public String getEmegyTechnologyInfo() {
		return emegyTechnologyInfo;
	}

	public void setEmegyTechnologyInfo(String emegyTechnologyInfo) {
		this.emegyTechnologyInfo = emegyTechnologyInfo;
	}

	public String getSafetyOrganizationInfo() {
		return safetyOrganizationInfo;
	}

	public void setSafetyOrganizationInfo(String safetyOrganizationInfo) {
		this.safetyOrganizationInfo = safetyOrganizationInfo;
	}

	public String getSealUrl() {
		return sealUrl;
	}

	public void setSealUrl(String sealUrl) {
		this.sealUrl = sealUrl;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public Integer getDelflag() {
        return delflag;
    }

    public void setDelflag(Integer delflag) {
        this.delflag = delflag;
    }
}