package com.sap.audit.bot.service;

import com.sap.audit.bot.exception.AuditBotAuthenticationException;
import com.sap.audit.bot.model.ControlFilterDTO;
import com.sap.audit.bot.model.CrossSystemUserFilterDTO;
import com.sap.audit.bot.model.CrossSystemRoleFilterDTO;
import com.sap.audit.bot.model.CrossSystemTcodeFilterDTO;
import com.sap.audit.bot.model.FilterData;
import com.sap.audit.bot.model.JwtUser;
import com.sap.audit.bot.model.LicenceFilterDTO;
import com.sap.audit.bot.model.ReportDTO;
import com.sap.conn.jco.JCoException;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public interface FunctionService {
    List<Map<String, Object>> getFilterTableData(JwtUser paramJwtUser);

    List<Map<String, Object>> getFilterResultTableData(JwtUser paramJwtUser, FilterData paramFilterData) throws JCoException;

    ReportDTO getRiskDetailReport(JwtUser jwtUser, String system, String client, String level, String riskType, String risklevel, String appclass, String risk, String user, String role) throws JCoException;

    ReportDTO getGRCReport(JwtUser paramJwtUser, FilterData paramFilterData) throws JCoException;


    Map<String, List<Map<String, Object>>> getFilterResultTableDataMultiple(JwtUser paramJwtUser, FilterData paramFilterData) throws JCoException;


    Map<String, List<Map<String, Object>>> getLicenceFilterResultTableDataMultiple(JwtUser paramJwtUser, LicenceFilterDTO paramFilterData) throws JCoException;

    List<Map<String, Object>> gelicensetFilterTableData(JwtUser paramJwtUser);

    ReportDTO getLicenceReport(JwtUser loginUser, LicenceFilterDTO data) throws JCoException;

    List<Map<String, Object>> getSidebarTableData(JwtUser user);

    ReportDTO getGRCRiskTechReport(JwtUser loginUser, FilterData data) throws JCoException;


    List<Map<String, Object>> getControlsFilterTableData(JwtUser paramJwtUser);

    Map<String, List<Map<String, Object>>> getControlFilterResultTableDataMultiple(JwtUser paramJwtUser, ControlFilterDTO paramFilterData) throws JCoException;

    ReportDTO getControlReport(JwtUser loginUser, ControlFilterDTO data) throws JCoException;

    ReportDTO getSummaryControlReport(JwtUser loginUser, ControlFilterDTO data) throws JCoException;

    ReportDTO getGrcRiskReport(JwtUser loginUser, FilterData data) throws JCoException;

    ReportDTO getCrossSystemUserReport(JwtUser loginUser, CrossSystemUserFilterDTO data) throws JCoException;

    ReportDTO getCrossSystemRoleReport(JwtUser loginUser, CrossSystemRoleFilterDTO data) throws JCoException;

    ReportDTO getCrossSystemTcodeReport(JwtUser loginUser, CrossSystemTcodeFilterDTO data) throws JCoException;
}
