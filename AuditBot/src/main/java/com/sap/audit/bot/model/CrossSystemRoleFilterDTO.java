package com.sap.audit.bot.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public class CrossSystemRoleFilterDTO {
    @Schema(example = "")
    private String sapSystem;
    @Schema(example = "")
    private String client;
    @Schema(example = "[]")
    private List<String> licenseType;
    @Schema(example = "")
    private String userId;
    @Schema(example = "")
    private String role;
    @Schema(example = "")
    private String tcode;
    @Schema(example = "")
    private String authObj;
    @Schema(example = "")
    private String authField;
    @Schema(example = "")
    private String authVal;

    public String getSapSystem() {
        return sapSystem;
    }
    public void setSapSystem(String sapSystem) {
        this.sapSystem = sapSystem;
    }
    public String getClient() {
        return client;
    }
    public void setClient(String client) {
        this.client = client;
    }
    public List<String> getLicenseType() {
        return licenseType;
    }
    public void setLicenseType(List<String> licenseType) {
        this.licenseType = licenseType;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getTcode() {
        return tcode;
    }
    public void setTcode(String tcode) {
        this.tcode = tcode;
    }
    public String getAuthObj() {
        return authObj;
    }
    public void setAuthObj(String authObj) {
        this.authObj = authObj;
    }
    public String getAuthField() {
        return authField;
    }
    public void setAuthField(String authField) {
        this.authField = authField;
    }
    public String getAuthVal() {
        return authVal;
    }
    public void setAuthVal(String authVal) {
        this.authVal = authVal;
    }
}
