package com.sap.audit.bot.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public class FilterData {
    @Schema(example = "1", description = "Report level: 1 = User Level, 2 = Role Level")
    private int level;
    @Schema(example = "P71")
    private String sapSystem;
    @Schema(example = "200")
    private String client;
    @Schema(example = "[]")
    private List<String> riskType;
    @Schema(example = "[]")
    private List<String> riskLevel;
    @Schema(example = "[]")
    private List<String> businessModule;
    @Schema(example = "[]")
    private List<String> riskId;
    @Schema(example = "")
    private String mitigation;
    @Schema(example = "")
    private String reportType;
    @Schema(example = "")
    private String drillDown;
    @Schema(example = "")
    private String userInput;
    @Schema(example = "")
    private String reportView;

    @Schema(example = "[]")
    private List<Integer> breakDown;

    @Schema(example = "[]")
    private List<String> account;

    public List<String> getAccount() {
        return account;
    }

    public void setAccount(List<String> account) {
        this.account = account;
    }

    public List<String> getUserGroup() {
        return userGroup;
    }

    public void setUserGroup(List<String> userGroup) {
        this.userGroup = userGroup;
    }

    private List<String> userGroup;


    public List<String> getRiskType() {
        return this.riskType;
    }

    public void setRiskType(List<String> riskType) {
        this.riskType = riskType;
    }

    public String getSapSystem() {
        return this.sapSystem;
    }

    public void setSapSystem(String sapSystem) {
        this.sapSystem = sapSystem;
    }

    public String getClient() {
        return this.client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public List<String> getRiskLevel() {
        return this.riskLevel;
    }

    public void setRiskLevel(List<String> riskLevel) {
        this.riskLevel = riskLevel;
    }

    public List<String> getBusinessModule() {
        return this.businessModule;
    }

    public void setBusinessModule(List<String> businessModule) {
        this.businessModule = businessModule;
    }

    public int getLevel() {
        return this.level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public List<Integer> getBreakDown() {
        return this.breakDown;
    }

    public void setBreakDown(List<Integer> breakDown) {
        this.breakDown = breakDown;
    }


    public String getUserInput() {
        return userInput;
    }

    public void setUserInput(String userInput) {
        this.userInput = userInput;
    }

    public List<String> getRiskId() {
        return riskId;
    }

    public void setRiskId(List<String> riskId) {
        this.riskId = riskId;
    }

    public String getMitigation() {
        return mitigation;
    }

    public void setMitigation(String mitigation) {
        this.mitigation = mitigation;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public String getDrillDown() {
        return drillDown;
    }

    public void setDrillDown(String drillDown) {
        this.drillDown = drillDown;
    }

    public String getReportView() {
        return reportView;
    }

    public void setReportView(String reportView) {
        this.reportView = reportView;
    }


}

