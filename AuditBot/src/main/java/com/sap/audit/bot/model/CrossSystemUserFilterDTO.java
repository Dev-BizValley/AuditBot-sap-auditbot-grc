package com.sap.audit.bot.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public class CrossSystemUserFilterDTO {
    @Schema(example = "")
    private String sapSystem;
    @Schema(example = "")
    private String client;
    private List<String> userGroup;
    private List<String> userType;
    private List<String> account;
    private List<String> licenseType;
    @Schema(example = "90", description = "Logon inactive days (numeric integer)")
    private String logondays;
    @Schema(example = "")
    private String userId;
    @Schema(example = "")
    private String role;
    @Schema(example = "")
    private String tcode;

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
    public List<String> getUserGroup() {
        return userGroup;
    }
    public void setUserGroup(List<String> userGroup) {
        this.userGroup = userGroup;
    }
    public List<String> getUserType() {
        return userType;
    }
    public void setUserType(List<String> userType) {
        this.userType = userType;
    }
    public List<String> getAccount() {
        return account;
    }
    public void setAccount(List<String> account) {
        this.account = account;
    }
    public List<String> getLicenseType() {
        return licenseType;
    }
    public void setLicenseType(List<String> licenseType) {
        this.licenseType = licenseType;
    }
    public String getLogondays() {
        return logondays;
    }
    public void setLogondays(String logondays) {
        this.logondays = logondays;
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
}
