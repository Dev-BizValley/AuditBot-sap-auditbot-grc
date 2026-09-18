package com.sap.audit.bot.controller;

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
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

import com.sap.audit.bot.dao.DestinationSource;
import com.sap.audit.bot.exception.AuditBotAuthenticationException;
import com.sap.audit.bot.model.FilterData;
import com.sap.audit.bot.model.JwtUser;
import com.sap.audit.bot.model.LicenceFilterDTO;
import com.sap.audit.bot.model.ReportDTO;
import com.sap.audit.bot.security.JwtValidator;
import com.sap.audit.bot.service.FunctionService;
import com.sap.conn.jco.JCoException;

@Tag(name = "License Audit", description = "Endpoints for SAP License Audit & Optimization")
@RestController
@RequestMapping({"/api"})
public class LicenseDataController {
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
	   
	   @Operation(summary = "Get License Filter Data", description = "Fetches license audit filter attributes")
	   @GetMapping({"/licensefilter"})
	   @CrossOrigin
	   public List<Map<String, Object>> getAttributes(HttpServletRequest request) throws JCoException, AuditBotAuthenticationException {
	     String authorisation = getAuthorisationToken(request);
	     JwtUser user = this.jwtValidator.validate(authorisation);
	     if(destinationSource.getDestinationByUser(user)==null) {
	    	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
	     }
	     List<Map<String, Object>> filter = this.functionService.gelicensetFilterTableData(user);
	     return filter;
	   }
	   
	   
	   @Operation(summary = "Get License Filter Data (Multiple)", description = "Fetches multiple license audit reports for JAVA_0005")
	   @PostMapping({"/JAVA_0005"})
	   @CrossOrigin
	   public Map<String,ReportDTO> getFilteredDataMultiple(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	     String authorisation = getAuthorisationToken(request);
	     JwtUser user = this.jwtValidator.validate(authorisation);
	     if(destinationSource.getDestinationByUser(user)==null) {
	    	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
	      }
	     Map<String, List<Map<String, Object>>> result = this.functionService.getLicenceFilterResultTableDataMultiple(user, data);
	     
	     Map<String,ReportDTO> results=new HashMap<String, ReportDTO>();
	     
	     result.forEach((k,v)->{
	         ReportDTO filter = new ReportDTO();
    	     filter.setData(v);
    	     results.put(k, filter);
	    	  if(v.size()>0) {
	    	     List<Object> header = new ArrayList(((Map)v.get(0)).keySet());
	    	     filter.setHeader(header);
	    	  }
	    	
	     });
	     
	   
	     return results;
	   }
	   
	   
	   @Operation(summary = "Get License Audit Detail Report", description = "Fetches license audit detail report for JAVA_0006")
	   @PostMapping({"/JAVA_0006"})
	   @CrossOrigin
	   public ReportDTO getUserRiskReport(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	     String authorisation = getAuthorisationToken(request);
	     JwtUser loginUser = this.jwtValidator.validate(authorisation);
	     if(destinationSource.getDestinationByUser(loginUser)==null) {
	    	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
	      }
	     ReportDTO filter = this.functionService.getLicenceReport(loginUser, data);
	     return filter;
	   }

	   @Operation(summary = "Get License Filter Results by User Type", description = "Fetches license filter audit results filtered by User Type")
	   @PostMapping({"/JAVA_0005/userType"})
	   @CrossOrigin
	   public Map<String,ReportDTO> getLicenseByUserType(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getFilteredDataMultiple(request, data);
	   }

	   @Operation(summary = "Get License Filter Results by License Type", description = "Fetches license filter audit results filtered by License Type")
	   @PostMapping({"/JAVA_0005/licenseType"})
	   @CrossOrigin
	   public Map<String,ReportDTO> getLicenseByLicenseType(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getFilteredDataMultiple(request, data);
	   }

	   @Operation(summary = "Get License Filter Results by Inactive Days", description = "Fetches license filter audit results filtered by Logon Inactive Days")
	   @PostMapping({"/JAVA_0005/logondays"})
	   @CrossOrigin
	   public Map<String,ReportDTO> getLicenseByLogonDays(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getFilteredDataMultiple(request, data);
	   }

	   @Operation(summary = "Get License Audit Detail Report by User ID", description = "Fetches license audit detail report for specific User ID")
	   @PostMapping({"/JAVA_0006/user"})
	   @CrossOrigin
	   public ReportDTO getLicenseReportByUser(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getUserRiskReport(request, data);
	   }

	   @Operation(summary = "Get License Audit Detail Report for Active Users", description = "Fetches license audit detail report for active users")
	   @PostMapping({"/JAVA_0006/active"})
	   @CrossOrigin
	   public ReportDTO getLicenseReportActiveUsers(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getUserRiskReport(request, data);
	   }

	   @Operation(summary = "Get License Audit Detail Report for Inactive Users", description = "Fetches license audit detail report for inactive users")
	   @PostMapping({"/JAVA_0006/inactive"})
	   @CrossOrigin
	   public ReportDTO getLicenseReportInactiveUsers(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getUserRiskReport(request, data);
	   }

	   @Operation(summary = "Get License Audit Detail Report by T-Code Execution", description = "Fetches license audit detail report filtered by T-Code execution")
	   @PostMapping({"/JAVA_0006/tcode"})
	   @CrossOrigin
	   public ReportDTO getLicenseReportByTcode(HttpServletRequest request, @RequestBody LicenceFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getUserRiskReport(request, data);
	   }
	   
}
