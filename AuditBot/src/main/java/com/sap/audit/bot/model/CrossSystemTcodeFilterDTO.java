package com.sap.audit.bot.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public class CrossSystemTcodeFilterDTO {
    @Schema(example = "")
    private String sapSystem;
    @Schema(example = "")
    private String client;
    @Schema(example = "1", description = "1 for Assigned TCodes, 2 for Executed TCodes")
    private String type; // "1" for Assigned TCodes, "2" for Executed TCodes
    @Schema(example = "[]")
    private List<String> licenseType;
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
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
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
}
