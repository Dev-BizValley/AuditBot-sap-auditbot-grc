package com.sap.audit.bot.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class ControlFilterDTO {
	  @Schema(example = "")
	  private String sapSystem;
	  @Schema(example = "")
	  private String client;
	  @Schema(example = "[]")
	 private List<String> controls;
	  @Schema(example = "")
	 private String mitigation;
	  @Schema(example = "")
	 private String drillDown;
	  @Schema(example = "")
	 private String control;
	  @Schema(example = "")
	 private String year;
	 
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}

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
	public List<String> getControls() {
		return controls;
	}
	public void setControls(List<String> controls) {
		this.controls = controls;
	}
	public String getMitigation() {
		return mitigation;
	}
	public void setMitigation(String mitigation) {
		this.mitigation = mitigation;
	}
	public String getDrillDown() {
		return drillDown;
	}
	public void setDrillDown(String drillDown) {
		this.drillDown = drillDown;
	}
	public String getControl() {
		return control;
	}
	public void setControl(String control) {
		this.control = control;
	}
	  
	

}
