package com.sap.audit.bot.controller;

import com.sap.audit.bot.dao.DestinationSource;
import com.sap.audit.bot.exception.AuditBotAuthenticationException;
import com.sap.audit.bot.model.CrossSystemUserFilterDTO;
import com.sap.audit.bot.model.CrossSystemRoleFilterDTO;
import com.sap.audit.bot.model.CrossSystemTcodeFilterDTO;
import com.sap.audit.bot.model.FilterData;
import com.sap.audit.bot.model.JwtUser;
import com.sap.audit.bot.model.ReportDTO;
import com.sap.audit.bot.security.JwtValidator;
import com.sap.audit.bot.service.FunctionService;
import com.sap.conn.jco.JCoException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@Tag(name = "Data & Risk Reports", description = "Endpoints for Audit Data, GRC Risk Reports, and Cross System Audits")
@RestController
@RequestMapping({"/api"})
public class DataController
{
  @Autowired
  private JwtValidator jwtValidator;
  @Autowired
  private FunctionService functionService;
  
  @Autowired
  private DestinationSource destinationSource;

  private String getAuthorisationToken(HttpServletRequest request) {
    if (request == null) return null;
    String auth = request.getHeader("Authorisation");
    if (auth == null || auth.isEmpty()) {
      auth = request.getHeader("Authorization");
    }
    return auth;
  }
   
  @Operation(summary = "Get Filter Options", description = "Retrieves available data filter attributes")
  @GetMapping({"/filter"})
  @CrossOrigin
  public List<Map<String, Object>> getAttributes(HttpServletRequest request) throws JCoException, AuditBotAuthenticationException {
    String authorisation = getAuthorisationToken(request);
    JwtUser user = this.jwtValidator.validate(authorisation);
    if(destinationSource.getDestinationByUser(user)==null) {
    	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
    }
    List<Map<String, Object>> filter = this.functionService.getFilterTableData(user);
    return filter;
  }
   
  @Operation(summary = "Get Filtered Data (Single Report)", description = "Fetches filtered audit dataset for JAVA_0002")
  @PostMapping({"/JAVA_0002"})
  @CrossOrigin
  public ReportDTO getFilteredData(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
    String authorisation = getAuthorisationToken(request);
    JwtUser user = this.jwtValidator.validate(authorisation);
    if(destinationSource.getDestinationByUser(user)==null) {
     	throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
     }
    List<Map<String, Object>> result = this.functionService.getFilterResultTableData(user, data);
    List<Object> header = new ArrayList(((Map)result.get(0)).keySet());
    ReportDTO filter = new ReportDTO();
    filter.setData(result);
    filter.setHeader(header);
    return filter;
  }

   
  @Operation(summary = "Get Filtered Data (Multiple Reports)", description = "Fetches filtered audit datasets for JAVA_0002N")
  @PostMapping({"/JAVA_0002N"})
  @CrossOrigin
  public Map<String,ReportDTO> getFilteredDataMultiple(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
    String authorisation = getAuthorisationToken(request);
    JwtUser user = this.jwtValidator.validate(authorisation);
    if(destinationSource.getDestinationByUser(user)==null) {
    	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
     }
    Map<String, List<Map<String, Object>>> result = this.functionService.getFilterResultTableDataMultiple(user, data);
    
    Map<String,ReportDTO> results=new HashMap<String, ReportDTO>();
    
    result.forEach((k,v)->{
   	  List<Object> header = new ArrayList(((Map)v.get(0)).keySet());
   	     ReportDTO filter = new ReportDTO();
   	     filter.setData(v);
   	     filter.setHeader(header);
   	     results.put(k, filter);
    });
    
  
    return results;
  }

   
  @Operation(summary = "Get User Risk Report", description = "Fetches user risk details report based on parameters")
  @GetMapping({"/JAVA_0003"})
  @CrossOrigin
  public ReportDTO getUserRiskReport(HttpServletRequest request, @RequestParam(value = "system", required = false) String system, @RequestParam(value = "client", required = false) String client, @RequestParam(value = "level", required = false) String level, @RequestParam(value = "risktype", required = false) String riskType, @RequestParam(value = "risklevel", required = false) String risklevel, @RequestParam(value = "appclass", required = false) String appclass, @RequestParam(value = "risk", required = false) String risk, @RequestParam(value = "user", required = false) String user, @RequestParam(value = "role", required = false) String role ) throws JCoException, AuditBotAuthenticationException {
    String authorisation = getAuthorisationToken(request);
    JwtUser loginUser = this.jwtValidator.validate(authorisation);
    if(destinationSource.getDestinationByUser(loginUser)==null) {
   	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
     }
    ReportDTO filter = this.functionService.getRiskDetailReport(loginUser, system, client, level, riskType, risklevel, appclass, risk, user, role);
    return filter;
  }

   
  @Operation(summary = "Get GRC Risk Report (Multiple Filters)", description = "Fetches GRC report for multiple filter criteria")
  @PostMapping({"/JAVA_MUL_0003"})
  @CrossOrigin
  public ReportDTO getUserRiskReport(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
    String authorisation = getAuthorisationToken(request);
    JwtUser loginUser = this.jwtValidator.validate(authorisation);
    if(destinationSource.getDestinationByUser(loginUser)==null) {
   	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
     }
    ReportDTO filter = this.functionService.getGRCReport(loginUser, data);
    return filter;
  }
   
   
  @Operation(summary = "Get GRC Risk Technical Report", description = "Fetches GRC technical risk report")
  @PostMapping({"/JAVA_MUL_0004"})
  @CrossOrigin
  public ReportDTO getUserRiskTechReport(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
    String authorisation = getAuthorisationToken(request);
    JwtUser loginUser = this.jwtValidator.validate(authorisation);
    if(destinationSource.getDestinationByUser(loginUser)==null) {
   	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
     }
    ReportDTO filter = this.functionService.getGRCRiskTechReport(loginUser, data);
    return filter;
  }

  @Operation(summary = "Get GRC Risk Field-Permission Report", description = "Fetches GRC risk report with field permission details")
  @PostMapping({"/JAVA_0003N_FP"})
  @CrossOrigin
  public ReportDTO getGrcRiskReport(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
      String authorisation = getAuthorisationToken(request);
      JwtUser loginUser = this.jwtValidator.validate(authorisation);
      if(destinationSource.getDestinationByUser(loginUser)==null) {
          throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
      }
      ReportDTO filter = this.functionService.getGrcRiskReport(loginUser, data);
      return filter;
  }

  @Operation(summary = "Get Cross System User Report", description = "Fetches cross-system user analysis report")
  @PostMapping({"/JAVA_0011"})
  @CrossOrigin
  public ReportDTO getCrossSystemUserReport(HttpServletRequest request, @RequestBody CrossSystemUserFilterDTO data) throws JCoException, AuditBotAuthenticationException {
      String authorisation = getAuthorisationToken(request);
      JwtUser loginUser = this.jwtValidator.validate(authorisation);
      if(destinationSource.getDestinationByUser(loginUser)==null) {
          throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
      }
      ReportDTO filter = this.functionService.getCrossSystemUserReport(loginUser, data);
      return filter;
  }

  @Operation(summary = "Get Cross System Role Report", description = "Fetches cross-system role analysis report")
  @PostMapping({"/JAVA_0014"})
  @CrossOrigin
  public ReportDTO getCrossSystemRoleReport(HttpServletRequest request, @RequestBody CrossSystemRoleFilterDTO data) throws JCoException, AuditBotAuthenticationException {
      String authorisation = getAuthorisationToken(request);
      JwtUser loginUser = this.jwtValidator.validate(authorisation);
      if(destinationSource.getDestinationByUser(loginUser)==null) {
          throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
      }
      ReportDTO filter = this.functionService.getCrossSystemRoleReport(loginUser, data);
      return filter;
  }

  @Operation(summary = "Get Cross System Tcode Report", description = "Fetches cross-system transaction code analysis report")
  @PostMapping({"/JAVA_0015"})
  @CrossOrigin
  public ReportDTO getCrossSystemTcodeReport(HttpServletRequest request, @RequestBody CrossSystemTcodeFilterDTO data) throws JCoException, AuditBotAuthenticationException {
      String authorisation = getAuthorisationToken(request);
      JwtUser loginUser = this.jwtValidator.validate(authorisation);
      if(destinationSource.getDestinationByUser(loginUser)==null) {
          throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
      }
      ReportDTO filter = this.functionService.getCrossSystemTcodeReport(loginUser, data);
      return filter;
  }

  @Operation(summary = "Get Filtered Data by User ID", description = "Fetches single report audit data filtered by User ID")
  @PostMapping({"/JAVA_0002/user"})
  @CrossOrigin
  public ReportDTO getFilteredDataByUser(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
      return getFilteredData(request, data);
  }

  @Operation(summary = "Get Filtered Data by Role Name", description = "Fetches single report audit data filtered by Role Name")
  @PostMapping({"/JAVA_0002/role"})
  @CrossOrigin
  public ReportDTO getFilteredDataByRole(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
      return getFilteredData(request, data);
  }

  @Operation(summary = "Get Filtered Data by Transaction Code", description = "Fetches single report audit data filtered by T-Code")
  @PostMapping({"/JAVA_0002/tcode"})
  @CrossOrigin
  public ReportDTO getFilteredDataByTcode(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
      return getFilteredData(request, data);
  }

  @Operation(summary = "Get User Risk Report by User ID", description = "Fetches user risk details report for specific User ID")
  @GetMapping({"/JAVA_0003/user"})
  @CrossOrigin
  public ReportDTO getUserRiskReportByUser(HttpServletRequest request, @RequestParam("user") String user, @RequestParam(value = "system", required = false) String system, @RequestParam(value = "client", required = false) String client) throws JCoException, AuditBotAuthenticationException {
      return getUserRiskReport(request, system, client, null, null, null, null, null, user, null);
  }

  @Operation(summary = "Get Role Risk Report by Role Name", description = "Fetches role risk details report for specific Role Name")
  @GetMapping({"/JAVA_0003/role"})
  @CrossOrigin
  public ReportDTO getUserRiskReportByRole(HttpServletRequest request, @RequestParam("role") String role, @RequestParam(value = "system", required = false) String system, @RequestParam(value = "client", required = false) String client) throws JCoException, AuditBotAuthenticationException {
      return getUserRiskReport(request, system, client, null, null, null, null, null, null, role);
  }

  @Operation(summary = "Get Risk Report by Risk ID", description = "Fetches risk details report for specific Risk ID")
  @GetMapping({"/JAVA_0003/risk"})
  @CrossOrigin
  public ReportDTO getUserRiskReportByRisk(HttpServletRequest request, @RequestParam("risk") String risk, @RequestParam(value = "system", required = false) String system, @RequestParam(value = "client", required = false) String client) throws JCoException, AuditBotAuthenticationException {
      return getUserRiskReport(request, system, client, null, null, null, null, risk, null, null);
  }

  @Operation(summary = "Get Risk Report by Risk Level", description = "Fetches risk details report by Risk Level (High/Medium/Low)")
  @GetMapping({"/JAVA_0003/level"})
  @CrossOrigin
  public ReportDTO getUserRiskReportByLevel(HttpServletRequest request, @RequestParam("risklevel") String risklevel, @RequestParam(value = "system", required = false) String system, @RequestParam(value = "client", required = false) String client) throws JCoException, AuditBotAuthenticationException {
      return getUserRiskReport(request, system, client, null, null, risklevel, null, null, null, null);
  }

  @Operation(summary = "Get GRC Multi-Filter User Risk Report", description = "Fetches multi-criteria user risk report")
  @PostMapping({"/JAVA_MUL_0003/user"})
  @CrossOrigin
  public ReportDTO getGrcUserRiskReport(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
      return getUserRiskReport(request, data);
  }

  @Operation(summary = "Get GRC Multi-Filter Role Risk Report", description = "Fetches multi-criteria role risk report")
  @PostMapping({"/JAVA_MUL_0003/role"})
  @CrossOrigin
  public ReportDTO getGrcRoleRiskReport(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
      return getUserRiskReport(request, data);
  }

  @Operation(summary = "Get GRC Technical Detail Risk Report", description = "Fetches GRC technical detail risk report")
  @PostMapping({"/JAVA_MUL_0004/tech"})
  @CrossOrigin
  public ReportDTO getGrcTechDetailReport(HttpServletRequest request, @RequestBody FilterData data) throws JCoException, AuditBotAuthenticationException {
      return getUserRiskTechReport(request, data);
  }
}
