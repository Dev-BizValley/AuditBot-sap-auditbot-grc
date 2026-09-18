package com.sap.audit.bot.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.sap.audit.bot.config.AuditBotConstants;
import com.sap.audit.bot.dao.FunctionDao;
import com.sap.audit.bot.helper.SapObjectToJavaConversion;
import com.sap.audit.bot.model.ControlFilterDTO;
import com.sap.audit.bot.model.CrossSystemUserFilterDTO;
import com.sap.audit.bot.model.CrossSystemRoleFilterDTO;
import com.sap.audit.bot.model.CrossSystemTcodeFilterDTO;
import com.sap.audit.bot.model.FilterData;
import com.sap.audit.bot.model.JwtUser;
import com.sap.audit.bot.model.LicenceFilterDTO;
import com.sap.audit.bot.model.ReportDTO;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoTable;


@Component
public class FunctionServiceImpl
        implements FunctionService {
    @Autowired
    private FunctionDao functionDao;

    public List<Map<String, Object>> getFilterTableData(JwtUser user) {
        List<Map<String, Object>> filters = new ArrayList<>();
        Arrays.<AuditBotConstants.FilterTableMapping>asList(AuditBotConstants.FilterTableMapping.values()).forEach(param -> {
            try {
                Map<String, Object>  list =   this.functionDao.getTableByFunctionModule(user, "/BOT/JAVA_0001", param.getValueString(), param.getTableNum(), param.getTableName());
                filters.add(list);
            } catch (JCoException e) {
                e.printStackTrace();
            }
        });

        return filters;
    }
/*
    public List<Map<String, Object>> getFilterTableData(JwtUser user) {
        List<Map<String, Object>> filters = new ArrayList<>();
        Arrays.<AuditBotConstants.FilterTableMapping>asList(AuditBotConstants.FilterTableMapping.values()).forEach(param -> {
            try {
                JCoTable table = this.functionDao.getTableByFunctionModule(user, "/BOT/JAVA_0001", param.getValueString(), param.getTableNum(), param.getTableName());
                List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table);
                //System.out.printf("res"+ table.getClassNameOfValue(table));

                // List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());



                Map<String, Object> map = new HashMap<>();
                map.put("name", param.getTableNamealias());
                map.put("ZCOL1","");
                map.put("value", list);
                map.put("id", Integer.valueOf(param.getTableNum()));
                filters.add(map);
            } catch (JCoException e) {
                e.printStackTrace();
            }
        });

        return filters;
    }*/


    public List<Map<String, Object>> gelicensetFilterTableData(JwtUser user) {
        List<Map<String, Object>> filters = new ArrayList<>();
        Arrays.<AuditBotConstants.LicenseFilterTableMapping>asList(AuditBotConstants.LicenseFilterTableMapping.values()).forEach(param -> {
            try {
                /*JCoTable table = this.functionDao.getTableByFunctionModule(user, "/BOT/JAVA_0001", param.getValueString(), param.getTableNum(), param.getTableName());
                List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table);
                Map<String, Object> map = new HashMap<>();
                map.put("name", param.getTableNamealias());
                map.put("value", list);
                map.put("id", Integer.valueOf(param.getTableNum()));
                filters.add(map);*/
                Map<String, Object>  list =   this.functionDao.getTableByFunctionModule(user, "/BOT/JAVA_0001", param.getValueString(), param.getTableNum(), param.getTableName());
                filters.add(list);
            } catch (JCoException e) {
                e.printStackTrace();
            }
        });

        return filters;
    }


    public List<Map<String, Object>> getFilterResultTableData(JwtUser jwtUser, FilterData data) throws JCoException {
        JCoTable table = this.functionDao.getTableByFunctionModule(jwtUser, "/BOT/JAVA_0002", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table);
        return list;
    }


    public Map<String, List<Map<String, Object>>> getFilterResultTableDataMultiple(JwtUser jwtUser, FilterData data) throws JCoException {
        Map<String, JCoTable> tables = this.functionDao.getTableByFunctionModuleMultiple(jwtUser, "/BOT/JAVA_0002N", data);

        Map<String, List<Map<String, Object>>> tableMap = new HashMap<String, List<Map<String, Object>>>();

        tables.forEach((k, v) -> {
            tableMap.put(k, SapObjectToJavaConversion.getTableParameter(v));
        });


        return tableMap;
    }


    public ReportDTO getRiskDetailReport(JwtUser jwtUser, String system, String client, String level, String riskType, String risklevel, String appclass, String risk, String user, String role) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getTableByFunctionModule(jwtUser, "/BOT/JAVA_0003N", system, client, level, riskType, risklevel, appclass, risk, user, role);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table.get("data"));
        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        return dto;
    }


    public ReportDTO getGRCReport(JwtUser loginUser, FilterData data) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getGRCTableByFunctionModule(loginUser, "/BOT/JAVA_0003N", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table.get("data"));
        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        List<Object> reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }


    @Override
    public Map<String, List<Map<String, Object>>> getLicenceFilterResultTableDataMultiple(JwtUser jwtUser,
                                                                                          LicenceFilterDTO paramFilterData) throws JCoException {
        Map<String, JCoTable> tables = this.functionDao.getLicenceTableByFunctionModuleMultiple(jwtUser, "/BOT/JAVA_0005", paramFilterData);

        Map<String, List<Map<String, Object>>> tableMap = new HashMap<String, List<Map<String, Object>>>();

        tables.forEach((k, v) -> {
            tableMap.put(k, SapObjectToJavaConversion.getTableParameter(v));
        });


        return tableMap;
    }


    @Override
    public ReportDTO getLicenceReport(JwtUser loginUser, LicenceFilterDTO data) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getLicenceTableByFunctionModule(loginUser, "/BOT/JAVA_0006", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameterForLicence(table.get("data"));
        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameterForLicence(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        List<Object> reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }


    @Override
    public List<Map<String, Object>> getSidebarTableData(JwtUser user) {
        List<Map<String, Object>> filters = new ArrayList<>();
        Arrays.<AuditBotConstants.AuthorizationMapping>asList(AuditBotConstants.AuthorizationMapping.values()).forEach(param -> {
            try {
               /* JCoTable table = this.functionDao.getTableByFunctionModule(user, "/BOT/JAVA_0001", param.getValueString(), param.getTableNum(), param.getTableName());
                List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table);
                Map<String, Object> map = new HashMap<>();
                map.put("name", param.getTableNamealias());
                map.put("value", list);
                map.put("id", Integer.valueOf(param.getTableNum()));
                filters.add(map);*/
                Map<String, Object>  list =   this.functionDao.getTableByFunctionModule(user, "/BOT/JAVA_0001", param.getValueString(), param.getTableNum(), param.getTableName());
                filters.add(list);
            } catch (JCoException e) {
                e.printStackTrace();
            }
        });

        return filters;
    }


    @Override
    public ReportDTO getGRCRiskTechReport(JwtUser loginUser, FilterData data) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getGRCRiskTechTableByFunctionModule(loginUser, "/BOT/JAVA_0004", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table.get("data"));
        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        List<Object> reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }


    @Override
    public List<Map<String, Object>> getControlsFilterTableData(JwtUser user) {
        List<Map<String, Object>> filters = new ArrayList<>();
        Arrays.<AuditBotConstants.ControlsFilterTableMapping>asList(AuditBotConstants.ControlsFilterTableMapping.values()).forEach(param -> {
            try {
              /*  JCoTable table = this.functionDao.getTableByFunctionModule(paramJwtUser, "/BOT/JAVA_0001", param.getValueString(), param.getTableNum(), param.getTableName());
                List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table);
                Map<String, Object> map = new HashMap<>();
                map.put("name", param.getTableNamealias());
                map.put("value", list);
                map.put("id", Integer.valueOf(param.getTableNum()));
                filters.add(map);
                */

                Map<String, Object>  list =   this.functionDao.getTableByFunctionModule(user, "/BOT/JAVA_0001", param.getValueString(), param.getTableNum(), param.getTableName());
                filters.add(list);
            } catch (JCoException e) {
                e.printStackTrace();
            }
        });

        return filters;
    }


    @Override
    public Map<String, List<Map<String, Object>>> getControlFilterResultTableDataMultiple(JwtUser jwtUser,
                                                                                          ControlFilterDTO paramFilterData) throws JCoException {
        Map<String, JCoTable> tables = this.functionDao.getControlByFunctionModuleMultiple(jwtUser, "/BOT/JAVA_0007", paramFilterData);

        Map<String, List<Map<String, Object>>> tableMap = new HashMap<String, List<Map<String, Object>>>();

        tables.forEach((k, v) -> {
            tableMap.put(k, SapObjectToJavaConversion.getTableParameter(v));
        });


        return tableMap;
    }


    @Override
    public ReportDTO getControlReport(JwtUser loginUser, ControlFilterDTO data) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getControlTableByFunctionModule(loginUser, "/BOT/JAVA_0009", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table.get("data"));
        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        List<Object> reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }


    @Override
    public ReportDTO getSummaryControlReport(JwtUser loginUser, ControlFilterDTO data) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getControlSummaryTableByFunctionModule(loginUser, "/BOT/JAVA_0008", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table.get("data"));
        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        List<Object> reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }

    @Override
    public ReportDTO getGrcRiskReport(JwtUser loginUser, FilterData data) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getGrcRiskReportTableByFunctionModule(loginUser, "/BOT/JAVA_0003N_FP", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table.get("data"));
        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        List<Object> reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }

    @Override
    public ReportDTO getCrossSystemUserReport(JwtUser loginUser, CrossSystemUserFilterDTO data) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getCrossSystemUserTableByFunctionModule(loginUser, "/BOT/JAVA_0011", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table.get("E_RESULT_01"));

        if (data != null && data.getLicenseType() != null && !data.getLicenseType().isEmpty()) {
            List<String> selectedLics = data.getLicenseType().stream()
                    .filter(s -> !StringUtils.isEmpty(s))
                    .map(String::trim)
                    .collect(Collectors.toList());

            if (!selectedLics.isEmpty() && list != null && !list.isEmpty()) {
                List<Map<String, Object>> filteredList = new ArrayList<>();
                for (Map<String, Object> row : list) {
                    String lawLic = row.get("LAW_LIC") != null ? row.get("LAW_LIC").toString().trim() : "";
                    String recLic = row.get("REC_LIC") != null ? row.get("REC_LIC").toString().trim() : "";
                    String licType = row.get("LIC_TYPE") != null ? row.get("LIC_TYPE").toString().trim() : "";

                    boolean matches = selectedLics.stream().anyMatch(lic ->
                        (!lawLic.isEmpty() && (lawLic.equalsIgnoreCase(lic) || isZeroPaddedMatch(lawLic, lic))) ||
                        (!recLic.isEmpty() && (recLic.equalsIgnoreCase(lic) || isZeroPaddedMatch(recLic, lic))) ||
                        (!licType.isEmpty() && (licType.equalsIgnoreCase(lic) || isZeroPaddedMatch(licType, lic)))
                    );

                    if (matches) {
                        filteredList.add(row);
                    }
                }

                if (filteredList.isEmpty()) {
                    Map<String, Object> emptyRow = new java.util.LinkedHashMap<>(list.get(0));
                    emptyRow.keySet().forEach(k -> emptyRow.put(k, ""));
                    emptyRow.put("USER_TYPE", "List does not contain any data");
                    emptyRow.put("ZCOUNT", 0);
                    emptyRow.put("ZROLECOUNT", 0);
                    emptyRow.put("ZTRXCOUNT", 0);
                    emptyRow.put("ZRANGECOUNT", 0);
                    emptyRow.put("ZSTARCOUNT", 0);
                    emptyRow.put("ZCMPCOUNT", 0);
                    emptyRow.put("ZEXECOUNT", 0);
                    emptyRow.put("ZRISKCOUNT", 0);
                    emptyRow.put("ZRISKEXCOUNT", 0);
                    emptyRow.put("UFLAG", 0);
                    list = Collections.singletonList(emptyRow);
                } else {
                    list = filteredList;
                }
            }
        }

        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        List<Object> reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }

    @Override
    public ReportDTO getCrossSystemRoleReport(JwtUser loginUser, CrossSystemRoleFilterDTO data) throws JCoException {
        List<String> selectedLics = null;
        if (data != null && data.getLicenseType() != null && !data.getLicenseType().isEmpty()) {
            selectedLics = data.getLicenseType().stream()
                    .filter(s -> !StringUtils.isEmpty(s))
                    .map(String::trim)
                    .collect(Collectors.toList());

            if (!selectedLics.isEmpty()) {
                CrossSystemUserFilterDTO userFilter = new CrossSystemUserFilterDTO();
                userFilter.setSapSystem(data.getSapSystem());
                userFilter.setClient(data.getClient());
                userFilter.setLogondays("90");

                Map<String, JCoTable> userTableMap = this.functionDao.getCrossSystemUserTableByFunctionModule(loginUser, "/BOT/JAVA_0011", userFilter);
                List<Map<String, Object>> allUsers = SapObjectToJavaConversion.getTableParameter(userTableMap.get("E_RESULT_01"));

                List<String> matchingUserIds = new ArrayList<>();
                if (allUsers != null) {
                    for (Map<String, Object> uRow : allUsers) {
                        String bname = uRow.get("BNAME") != null ? uRow.get("BNAME").toString().trim() : "";
                        String lawLic = uRow.get("LAW_LIC") != null ? uRow.get("LAW_LIC").toString().trim() : "";
                        String recLic = uRow.get("REC_LIC") != null ? uRow.get("REC_LIC").toString().trim() : "";
                        String licType = uRow.get("LIC_TYPE") != null ? uRow.get("LIC_TYPE").toString().trim() : "";

                        final List<String> licsToMatch = selectedLics;
                        boolean matches = licsToMatch.stream().anyMatch(lic ->
                            (!lawLic.isEmpty() && (lawLic.equalsIgnoreCase(lic) || isZeroPaddedMatch(lawLic, lic))) ||
                            (!recLic.isEmpty() && (recLic.equalsIgnoreCase(lic) || isZeroPaddedMatch(recLic, lic))) ||
                            (!licType.isEmpty() && (licType.equalsIgnoreCase(lic) || isZeroPaddedMatch(licType, lic)))
                        );

                        if (matches && !bname.isEmpty()) {
                            matchingUserIds.add(bname);
                        }
                    }
                }

                if (matchingUserIds.isEmpty()) {
                    List<Map<String, Object>> emptyList = new ArrayList<>();
                    Map<String, Object> emptyRow = new java.util.LinkedHashMap<>();
                    emptyRow.put("COL1_VAL", "List does not contain any data");
                    for (int i = 2; i <= 15; i++) {
                        emptyRow.put("COL" + i + "_VAL", "");
                    }
                    emptyList.add(emptyRow);

                    List<Object> header = Arrays.asList(
                        "Sys", "Client", "Type", "Role", "Lic", "Count", "Profiles",
                        "Child Roles", "Auth Objects", "Assigned Users", "Risks",
                        "Ind TCodes", "Star TCodes", "Range TCodes", "Wild TCodes"
                    );
                    List<Object> reportName = Arrays.asList("Cross System Roles Details");

                    ReportDTO dto = new ReportDTO();
                    dto.setData(emptyList);
                    dto.setHeader(header);
                    dto.setReportName(reportName);
                    return dto;
                }

                String joinedUserIds = matchingUserIds.stream().collect(Collectors.joining(","));
                if (!StringUtils.isEmpty(data.getUserId())) {
                    joinedUserIds = data.getUserId() + "," + joinedUserIds;
                }
                data.setUserId(joinedUserIds);
            }
        }

        Map<String, JCoTable> table = this.functionDao.getCrossSystemRoleTableByFunctionModule(loginUser, "/BOT/JAVA_0014", data);
        List<Map<String, Object>> rawList = SapObjectToJavaConversion.getTableParameter(table.get("E_RESULT_01"));
        List<Map<String, Object>> list = new ArrayList<>();
        if (rawList != null) {
            for (Map<String, Object> row : rawList) {
                Map<String, Object> filteredRow = new java.util.LinkedHashMap<>();
                for (int i = 1; i <= 15; i++) {
                    String key = "COL" + i + "_VAL";
                    filteredRow.put(key, row.get(key));
                }
                list.add(filteredRow);
            }
        }

        if (data != null && !org.springframework.util.StringUtils.isEmpty(data.getUserId())) {
            List<Map<String, Object>> filteredList = new ArrayList<>();
            for (Map<String, Object> row : list) {
                Object col10 = row.get("COL10_VAL");
                if (col10 != null) {
                    String valStr = col10.toString().trim();
                    try {
                        long count = Long.parseLong(valStr);
                        if (count > 0) {
                            filteredList.add(row);
                        }
                    } catch (Exception e) {
                        // Ignore non-numeric rows when filtering by userId
                    }
                }
            }
            list = filteredList;
        }

        if (selectedLics != null && !selectedLics.isEmpty() && list != null) {
            String licLabel = String.join(", ", selectedLics);
            for (Map<String, Object> row : list) {
                if (row.containsKey("COL5_VAL") && !"List does not contain any data".equals(row.get("COL1_VAL"))) {
                    row.put("COL5_VAL", licLabel);
                }
            }
        }

        List<Object> header = null;
        if (table.get("header") != null) {
            header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header"))
                    .stream()
                    .map(p -> p.get("ZDESC"))
                    .filter(java.util.Objects::nonNull)
                    .collect(Collectors.toList());
        }

        if (header == null || header.isEmpty() || header.size() < 15) {
            header = Arrays.asList(
                "Sys", "Client", "Type", "Role", "Lic", "Count", "Profiles",
                "Child Roles", "Auth Objects", "Assigned Users", "Risks",
                "Ind TCodes", "Star TCodes", "Range TCodes", "Wild TCodes"
            );
        } else if (header.size() > 15) {
            header = header.subList(0, 15);
        }

        List<Object> reportName = null;
        if (table.get("E_REPORT") != null) {
            reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT"))
                    .stream()
                    .map(p -> p.get("ZDESC"))
                    .collect(Collectors.toList());
        }
        if (reportName == null || reportName.isEmpty()) {
            reportName = Arrays.asList("Cross System Roles Details");
        }

        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }

    @Override
    public ReportDTO getCrossSystemTcodeReport(JwtUser loginUser, CrossSystemTcodeFilterDTO data) throws JCoException {
        Map<String, JCoTable> table = this.functionDao.getCrossSystemTcodeTableByFunctionModule(loginUser, "/BOT/JAVA_0015", data);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table.get("E_RESULT_01"));

        if (data != null && data.getLicenseType() != null && !data.getLicenseType().isEmpty()) {
            List<String> selectedLics = data.getLicenseType().stream()
                    .filter(s -> !StringUtils.isEmpty(s))
                    .map(String::trim)
                    .collect(Collectors.toList());

            if (!selectedLics.isEmpty() && list != null && !list.isEmpty()) {
                List<Map<String, Object>> filteredList = new ArrayList<>();
                for (Map<String, Object> row : list) {
                    String lawLic = row.get("LAW_LIC") != null ? row.get("LAW_LIC").toString().trim() : "";
                    String recLic = row.get("REC_LIC") != null ? row.get("REC_LIC").toString().trim() : "";
                    String licType = row.get("LIC_TYPE") != null ? row.get("LIC_TYPE").toString().trim() : "";
                    String col7 = row.get("COL7_VAL") != null ? row.get("COL7_VAL").toString().trim() : "";

                    boolean matches = selectedLics.stream().anyMatch(lic ->
                        (!lawLic.isEmpty() && (lawLic.equalsIgnoreCase(lic) || isZeroPaddedMatch(lawLic, lic))) ||
                        (!recLic.isEmpty() && (recLic.equalsIgnoreCase(lic) || isZeroPaddedMatch(recLic, lic))) ||
                        (!licType.isEmpty() && (licType.equalsIgnoreCase(lic) || isZeroPaddedMatch(licType, lic))) ||
                        (!col7.isEmpty() && (col7.equalsIgnoreCase(lic) || isZeroPaddedMatch(col7, lic)))
                    );

                    if (matches) {
                        filteredList.add(row);
                    }
                }

                if (!filteredList.isEmpty()) {
                    list = filteredList;
                }
            }
        }

        if (data != null && !StringUtils.isEmpty(data.getUserId()) && list != null && !list.isEmpty()) {
            List<Map<String, Object>> filteredList = new ArrayList<>();
            boolean isExecutedReport = "2".equals(data.getType());
            String checkCol = isExecutedReport ? "COL11_VAL" : "COL10_VAL";

            for (Map<String, Object> row : list) {
                Object valObj = row.get(checkCol);
                if (valObj != null) {
                    try {
                        long count = Long.parseLong(valObj.toString().trim());
                        if (count > 0) {
                            filteredList.add(row);
                        }
                    } catch (Exception e) {
                        // Keep row if unparseable
                    }
                }
            }
            if (!filteredList.isEmpty()) {
                list = filteredList;
            }
        }

        List<Object> header = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("header")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        List<Object> reportName = (List<Object>) SapObjectToJavaConversion.getTableParameter(table.get("E_REPORT")).stream().map(p -> p.get("ZDESC")).collect(Collectors.toList());
        ReportDTO dto = new ReportDTO();
        dto.setData(list);
        dto.setHeader(header);
        dto.setReportName(reportName);
        return dto;
    }

    private boolean isZeroPaddedMatch(String val1, String val2) {
        if (StringUtils.isEmpty(val1) || StringUtils.isEmpty(val2)) return false;
        try {
            if (val1.matches("\\d+") && val2.matches("\\d+")) {
                return Long.parseLong(val1) == Long.parseLong(val2);
            }
        } catch (Exception e) {
            // ignore
        }
        return false;
    }
}

 
