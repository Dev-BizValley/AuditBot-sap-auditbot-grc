package com.sap.audit.bot.model;

import java.util.List;
import java.util.Map;

public class ReportDTO {
  private List<Map<String, Object>> data;
  private List<Object> header;
  private List<Object> reportName;
  public List<Map<String, Object>> getData() {
    return this.data;
  }
  public void setData(List<Map<String, Object>> data) {
    this.data = data;
  }
  public List<Object> getHeader() {
    return this.header;
  }
  public void setHeader(List<Object> header) {
    this.header = header;
  }
public List<Object> getReportName() {
	return reportName;
}
public void setReportName(List<Object> reportName) {
	this.reportName = reportName;
}
  
}

