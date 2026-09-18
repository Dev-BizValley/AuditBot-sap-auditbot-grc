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
import com.sap.audit.bot.model.ControlFilterDTO;
import com.sap.audit.bot.model.JwtUser;
import com.sap.audit.bot.model.LicenceFilterDTO;
import com.sap.audit.bot.model.ReportDTO;
import com.sap.audit.bot.security.JwtValidator;
import com.sap.audit.bot.service.FunctionService;
import com.sap.conn.jco.JCoException;

@Tag(name = "Controls Audit", description = "Endpoints for SAP Controls Audit & Reports")
@RestController
@RequestMapping({ "/api" })
public class ControlController {

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

	@Operation(summary = "Get Controls Filter Data", description = "Fetches controls filter attributes")
	@GetMapping({ "/controlsfilter" })
	@CrossOrigin
	public List<Map<String, Object>> getAttributes(HttpServletRequest request)
			throws JCoException, AuditBotAuthenticationException {
		String authorisation = getAuthorisationToken(request);
		JwtUser user = this.jwtValidator.validate(authorisation);
		if (destinationSource.getDestinationByUser(user) == null) {
			throw new AuditBotAuthenticationException("Authentication failed", "Authentication failed");
		}
		List<Map<String, Object>> filter = this.functionService.getControlsFilterTableData(user);
		return filter;
	}
	
	
	   @Operation(summary = "Get Control Filter Data (Multiple)", description = "Fetches multiple control filter reports for JAVA_0007")
	   @PostMapping({"/JAVA_0007"})
	   @CrossOrigin
	   public Map<String,ReportDTO> getFilteredDataMultiple(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	     String authorisation = getAuthorisationToken(request);
	     JwtUser user = this.jwtValidator.validate(authorisation);
	     if(destinationSource.getDestinationByUser(user)==null) {
	    	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
	      }
	     Map<String, List<Map<String, Object>>> result = this.functionService.getControlFilterResultTableDataMultiple(user, data);
	     
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
	   
	   
	   @Operation(summary = "Get Control Detail Report", description = "Fetches control audit detail report for JAVA_0009")
	   @PostMapping({"/JAVA_0009"})
	   @CrossOrigin
	   public ReportDTO getUserRiskReport(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	     String authorisation = getAuthorisationToken(request);
	     JwtUser loginUser = this.jwtValidator.validate(authorisation);
	     if(destinationSource.getDestinationByUser(loginUser)==null) {
	    	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
	      }
	     ReportDTO filter = this.functionService.getControlReport(loginUser, data);
	     return filter;
	   }

	   @Operation(summary = "Get User Summary Control Report", description = "Fetches summary control report for JAVA_0008")
	   @PostMapping({"/JAVA_0008"})
	   @CrossOrigin
	   public ReportDTO getUserSummaryControlReport(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	     String authorisation = getAuthorisationToken(request);
	     JwtUser loginUser = this.jwtValidator.validate(authorisation);
	     if(destinationSource.getDestinationByUser(loginUser)==null) {
	    	 throw new AuditBotAuthenticationException("Authentication failed","Authentication failed");
	      }
	     ReportDTO filter = this.functionService.getSummaryControlReport(loginUser, data);
	     return filter;
	   }

	   @Operation(summary = "Get Control Filter Data by SAP System", description = "Fetches control filter results by SAP System")
	   @PostMapping({"/JAVA_0007/system"})
	   @CrossOrigin
	   public Map<String,ReportDTO> getControlFilterBySystem(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getFilteredDataMultiple(request, data);
	   }

	   @Operation(summary = "Get Control Filter Data by Year", description = "Fetches control filter results by Year")
	   @PostMapping({"/JAVA_0007/year"})
	   @CrossOrigin
	   public Map<String,ReportDTO> getControlFilterByYear(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getFilteredDataMultiple(request, data);
	   }

	   @Operation(summary = "Get Summary Control Report by User Group", description = "Fetches summary control report by User Group")
	   @PostMapping({"/JAVA_0008/user"})
	   @CrossOrigin
	   public ReportDTO getSummaryControlByUser(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getUserSummaryControlReport(request, data);
	   }

	   @Operation(summary = "Get Summary Control Report by Control ID", description = "Fetches summary control report by Control ID")
	   @PostMapping({"/JAVA_0008/control"})
	   @CrossOrigin
	   public ReportDTO getSummaryControlByControlId(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getUserSummaryControlReport(request, data);
	   }

	   @Operation(summary = "Get Control Audit User Detail Report", description = "Fetches detailed user control audit report")
	   @PostMapping({"/JAVA_0009/detail"})
	   @CrossOrigin
	   public ReportDTO getControlDetailReport(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getUserRiskReport(request, data);
	   }

	   @Operation(summary = "Get Control Audit Mitigation Report", description = "Fetches control mitigation analysis report")
	   @PostMapping({"/JAVA_0009/mitigation"})
	   @CrossOrigin
	   public ReportDTO getControlMitigationReport(HttpServletRequest request, @RequestBody ControlFilterDTO data) throws JCoException, AuditBotAuthenticationException {
	       return getUserRiskReport(request, data);
	   }

}
