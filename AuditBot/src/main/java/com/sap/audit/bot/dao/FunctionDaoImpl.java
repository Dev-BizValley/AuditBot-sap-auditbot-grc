package com.sap.audit.bot.dao;

import com.sap.audit.bot.helper.SapObjectToJavaConversion;
import com.sap.audit.bot.model.ControlFilterDTO;
import com.sap.audit.bot.model.CrossSystemUserFilterDTO;
import com.sap.audit.bot.model.CrossSystemRoleFilterDTO;
import com.sap.audit.bot.model.CrossSystemTcodeFilterDTO;
import com.sap.audit.bot.model.FilterData;
import com.sap.audit.bot.model.JwtUser;
import com.sap.audit.bot.model.LicenceFilterDTO;
import com.sap.conn.jco.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class FunctionDaoImpl implements FunctionDao {
    @Autowired
    private DestinationSource destinationSource;

    public Map<String, Object>  getTableByFunctionModule(JwtUser user, String functionName, String valueString, int value,
                                                               String tableName) throws JCoException {
        JCoDestination destination = this.destinationSource.getDestinationByUser(user);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");
        function.getImportParameterList().setValue(valueString, value);

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        JCoTable table = function.getTableParameterList().getTable(tableName);
        List<Map<String, Object>> list = SapObjectToJavaConversion.getTableParameter(table);
        Map<String, Object> map = new HashMap<>();
        map.put("name", function.getExportParameterList().getValue("ZCOL1"));
        map.put("description", function.getExportParameterList().getValue("ZCOL2"));
        map.put("value", list);
        map.put("id", value);
        return map;
    }

    /*
     * public JCoTable getTableByFunctionModule(JwtUser user, String functionName,
     * String valueString, int value,
     * String tableName) throws JCoException {
     * JCoDestination destination =
     * this.destinationSource.getDestinationByUser(user);
     * JCoRepository repo = destination.getRepository();
     * JCoFunction function = repo.getFunction(functionName);
     * if (function == null)
     * throw new RuntimeException(functionName + "not found in SAP.");
     * function.getImportParameterList().setValue(valueString, value);
     * 
     * try {
     * function.execute(destination);
     * } catch (AbapException e) {
     * 
     * throw new RuntimeException("not able to execute function");
     * }
     * 
     * 
     * JCoTable table = function.getTableParameterList().getTable(tableName);
     * return table;
     * }
     */
    public JCoTable getTableByFunctionModule(JwtUser user, String functionName, FilterData data) throws JCoException {
        JCoDestination destination = this.destinationSource.getDestinationByUser(user);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");
        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(Integer.valueOf(data.getLevel()))) {
            function.getImportParameterList().setValue("I_LEVEL", data.getLevel());
        }
        function.getImportParameterList().setValue("I_GROUPBY1", "1");
        function.getImportParameterList().setValue("I_GROUPBY2", "2");
        function.getImportParameterList().setValue("I_GROUPBY3", "3");

        populateSapTableFromList(function.getTableParameterList().getTable("I_RISKTYPE"), data.getRiskType());
        populateSapTableFromList(function.getTableParameterList().getTable("I_RISKLEVEL"), data.getRiskLevel());
        populateSapTableFromList(function.getTableParameterList().getTable("I_APPCLASS"), data.getBusinessModule());

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }

        JCoTable table = function.getTableParameterList().getTable("E_RESULT");
        return table;
    }

    public Map<String, JCoTable> getTableByFunctionModule(JwtUser jwtUser, String functionName, String system,
            String client, String level, String riskType, String risklevel, String appclass, String risk, String user,
            String role) throws JCoException {
        Map<String, JCoTable> map = new LinkedHashMap<>();
        JCoDestination destination = this.destinationSource.getDestinationByUser(jwtUser);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");
        if (!StringUtils.isEmpty(system))
            function.getImportParameterList().setValue("I_SYS", system);
        if (!StringUtils.isEmpty(client))
            function.getImportParameterList().setValue("I_CLT", client);
        if (!StringUtils.isEmpty(level)) {
            function.getImportParameterList().setValue("I_LEVEL", level);
        }

        if (!StringUtils.isEmpty(riskType)) {
            JCoTable risktypeTable = function.getTableParameterList().getTable("I_RISKTYPE");
            risktypeTable.appendRow();
            risktypeTable.setValue("ZFIELD", riskType);
        }

        if (!StringUtils.isEmpty(risklevel)) {
            JCoTable risklevelTable = function.getTableParameterList().getTable("I_RISKLEVEL");
            risklevelTable.appendRow();
            risklevelTable.setValue("ZFIELD", risklevel);
        }
        if (!StringUtils.isEmpty(appclass)) {
            JCoTable busTable = function.getTableParameterList().getTable("I_APPCLASS");
            busTable.appendRow();
            busTable.setValue("ZFIELD", appclass);
        }

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }

        map.put("header", function.getTableParameterList().getTable("E_HEADER"));
        if (Integer.parseInt(level) == 1) {
            JCoTable table = function.getTableParameterList().getTable("E_RESULT");
            map.put("data", table);
        } else {
            JCoTable table = function.getTableParameterList().getTable("E_RESULT01");
            map.put("data", table);
        }

        return map;
    }

    public Map<String, JCoTable> getGRCTableByFunctionModule(JwtUser loginUser, String functionName, FilterData data)
            throws JCoException {
        Map<String, JCoTable> map = new LinkedHashMap<>();
        JCoDestination destination = this.destinationSource.getDestinationByUser(loginUser);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);

        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");
        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(Integer.valueOf(data.getLevel()))) {
            function.getImportParameterList().setValue("I_LEVEL", data.getLevel());
            if (!StringUtils.isEmpty(data.getUserInput())) {
                JCoTable userinput = null;
                if (data.getLevel() == 1) {
                    userinput = function.getTableParameterList().getTable("I_USER");
                } else {
                    userinput = function.getTableParameterList().getTable("I_ROLE");
                }
                // userinput.appendRow();
                // userinput.setValue("ZFIELD", data.getUserInput());
                populateSapTableFromInput(userinput, data.getUserInput());
            }
        }

        if (!StringUtils.isEmpty(data.getMitigation())) {
            function.getImportParameterList().setValue("I_MIT", data.getMitigation());
        }

        if (!StringUtils.isEmpty(data.getDrillDown())) {
            function.getImportParameterList().setValue("I_DRILL", data.getDrillDown());
        }

        if (data.getRiskType() != null && data.getRiskType().size() > 0) {
            JCoTable risktype = function.getTableParameterList().getTable("I_RISKTYPE");
            for (String riskType : data.getRiskType()) {
                risktype.appendRow();
                risktype.setValue("ZFIELD", riskType);
            }
        }

        if (data.getRiskType() != null && data.getRiskLevel().size() > 0) {
            JCoTable risklevel = function.getTableParameterList().getTable("I_RISKLEVEL");
            for (String riskLevel : data.getRiskLevel()) {
                risklevel.appendRow();
                risklevel.setValue("ZFIELD", riskLevel);
            }
        }

        if (data.getRiskType() != null && data.getBusinessModule().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_APPCLASS");
            for (String busMod : data.getBusinessModule()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", busMod);
            }
        }

        if (data.getRiskId() != null && data.getRiskId().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_RISK");
            for (String risk : data.getRiskId()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", risk);
            }
        }

        if (data.getAccount() != null && data.getAccount().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_ACCNT");
            for (String account : data.getAccount()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", account);
            }
        }

        if (data.getUserGroup() != null && data.getUserGroup().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_CLASS");
            for (String group : data.getUserGroup()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", group);
            }
        }

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        map.put("header", function.getTableParameterList().getTable("E_HEADER"));
        if (data.getLevel() == 1) {
            JCoTable table = function.getTableParameterList().getTable("E_RESULT");
            map.put("data", table);
        } else {
            JCoTable table = function.getTableParameterList().getTable("E_RESULT01");
            map.put("data", table);
        }

        JCoTable table2 = function.getTableParameterList().getTable("E_REPORT");
        map.put("E_REPORT", table2);

        return map;
    }

    @Override
    public Map<String, JCoTable> getTableByFunctionModuleMultiple(JwtUser user, String functionName, FilterData data)
            throws JCoException {
        JCoDestination destination = this.destinationSource.getDestinationByUser(user);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");
        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(Integer.valueOf(data.getLevel()))) {
            function.getImportParameterList().setValue("I_LEVEL", data.getLevel());
            if (!StringUtils.isEmpty(data.getUserInput())) {
                System.out.println("GRC Filter - UserInput: " + data.getUserInput() + ", Level: " + data.getLevel());
                JCoTable userinput = null;
                if (data.getLevel() == 1) {
                    userinput = function.getTableParameterList().getTable("I_USER");
                } else {
                    userinput = function.getTableParameterList().getTable("I_ROLE");
                }
                // userinput.appendRow();
                // userinput.setValue("ZFIELD", data.getUserInput());
                populateSapTableFromInput(userinput, data.getUserInput());
            }
        }

        if (!StringUtils.isEmpty(data.getReportType())) {
            function.getImportParameterList().setValue("I_RPTYPE", data.getReportType());
        }
        if (!StringUtils.isEmpty(data.getMitigation())) {
            function.getImportParameterList().setValue("I_MIT", data.getMitigation());
        }

        // function.getImportParameterList().setValue("I_GROUPBY1", "1");
        // function.getImportParameterList().setValue("I_GROUPBY2", "2");
        // function.getImportParameterList().setValue("I_GROUPBY3", "3");

        if (data.getRiskType() != null && data.getRiskType().size() > 0) {
            JCoTable risktype = function.getTableParameterList().getTable("I_RISKTYPE");
            for (String riskType : data.getRiskType()) {
                risktype.appendRow();
                risktype.setValue("ZFIELD", riskType);
            }
        }

        if (data.getRiskLevel() != null && data.getRiskLevel().size() > 0) {
            JCoTable risklevel = function.getTableParameterList().getTable("I_RISKLEVEL");
            for (String riskLevel : data.getRiskLevel()) {
                risklevel.appendRow();
                risklevel.setValue("ZFIELD", riskLevel);
            }
        }

        if (data.getBusinessModule() != null && data.getBusinessModule().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_APPCLASS");
            for (String busMod : data.getBusinessModule()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", busMod);
            }
        }

        if (data.getRiskId() != null && data.getRiskId().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_RISK");
            for (String riskId : data.getRiskId()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", riskId);
            }
        }

        if (data.getAccount() != null && data.getAccount().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_ACCNT");
            for (String account : data.getAccount()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", account);
            }
        }

        if (data.getUserGroup() != null && data.getUserGroup().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_CLASS");
            for (String group : data.getUserGroup()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", group);
            }
        }

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        Map<String, JCoTable> tables = new HashMap<String, JCoTable>();

        JCoTable table1 = function.getTableParameterList().getTable("E_RESULT_01");
        System.out.println("E_RESULT_01 rows: " + table1.getNumRows());
        tables.put("E_RESULT_01", table1);
        JCoTable table2 = function.getTableParameterList().getTable("E_RESULT_02");
        System.out.println("E_RESULT_02 rows: " + table2.getNumRows());
        tables.put("E_RESULT_02", table2);
        JCoTable table3 = function.getTableParameterList().getTable("E_RESULT_03");
        System.out.println("E_RESULT_03 rows: " + table3.getNumRows());
        tables.put("E_RESULT_03", table3);
        tables.put("header", function.getTableParameterList().getTable("E_HEADER"));
        tables.put("E_REPORT", function.getTableParameterList().getTable("E_REPORT"));
        return tables;
    }

    @Override
    public Map<String, JCoTable> getLicenceTableByFunctionModuleMultiple(JwtUser user, String functionName,
            LicenceFilterDTO data) throws JCoException {
        JCoDestination destination = this.destinationSource.getDestinationByUser(user);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");

        if (!StringUtils.isEmpty(data.getLevel()))
            function.getImportParameterList().setValue("I_LEVEL", data.getLevel());

        if (!StringUtils.isEmpty(data.getActiveUser()))
            function.getImportParameterList().setValue("I_ACT", data.getActiveUser());

        function.getImportParameterList().setValue("I_DATE1", data.getStartDate().toString().replace("-", ""));

        function.getImportParameterList().setValue("I_DATE2", data.getEndDate().toString().replace("-", ""));

        if (!StringUtils.isEmpty(data.getTcodes()))
            function.getImportParameterList().setValue("I_TCODE", data.getTcodes());

        if (!StringUtils.isEmpty(data.getCriteria()))
            function.getImportParameterList().setValue("I_CRITERIA", data.getCriteria());

        if (!StringUtils.isEmpty(data.getLogondays()))
            function.getImportParameterList().setValue("I_DAYS", data.getLogondays());

        if (!StringUtils.isEmpty(data.getCount()))
            function.getImportParameterList().setValue("I_COUNT", data.getCount());

        if (!StringUtils.isEmpty(data.getSapSystem())) {
            JCoTable system = function.getTableParameterList().getTable("I_SYS");
            for (String s : data.getSapSystem()) {
                system.appendRow();
                system.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getClient())) {
            JCoTable client = function.getTableParameterList().getTable("I_CLT");
            for (String s : data.getClient()) {
                client.appendRow();
                client.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getUserType())) {
            JCoTable type = function.getTableParameterList().getTable("I_TYPE");
            for (String s : data.getUserType()) {
                type.appendRow();
                type.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getUserGroup())) {
            JCoTable grp = function.getTableParameterList().getTable("I_GROUP");
            for (String s : data.getUserGroup()) {
                grp.appendRow();
                grp.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getAccount())) {
            JCoTable account = function.getTableParameterList().getTable("I_ACCNT");
            for (String s : data.getAccount()) {
                account.appendRow();
                account.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getLicenseType())) {
            JCoTable lic = function.getTableParameterList().getTable("I_LIC");
            populateLicenseTypeTable(lic, data.getLicenseType());
        }

        if (!StringUtils.isEmpty(data.getUserStatus())) {
            JCoTable status = function.getTableParameterList().getTable("I_STATUS");
            for (String s : data.getUserStatus()) {
                status.appendRow();
                status.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getUserId())) {
            JCoTable userid = function.getTableParameterList().getTable("I_USER");
            // userid.appendRow();
            // userid.setValue("ZFIELD", data.getUserId());
            populateSapTableFromInput(userid, data.getUserId());
        }

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        Map<String, JCoTable> tables = new HashMap<String, JCoTable>();

        JCoTable table1 = function.getTableParameterList().getTable("E_RESULT_01");
        tables.put("E_RESULT_01", table1);
        JCoTable table2 = function.getTableParameterList().getTable("E_RESULT_02");
        tables.put("E_RESULT_02", table2);
        JCoTable table3 = function.getTableParameterList().getTable("E_RESULT_03");
        tables.put("E_RESULT_03", table3);
        JCoTable table4 = function.getTableParameterList().getTable("E_RESULT_04");
        tables.put("E_RESULT_04", table4);
        JCoTable table5 = function.getTableParameterList().getTable("E_RESULT_00");
        tables.put("E_RESULT_00", table5);
        tables.put("header", function.getTableParameterList().getTable("E_HEADER"));
        tables.put("E_REPORT", function.getTableParameterList().getTable("E_REPORT"));
        return tables;
    }

    @Override
    public Map<String, JCoTable> getLicenceTableByFunctionModule(JwtUser jwtUser, String functionName,
            LicenceFilterDTO data) throws JCoException {
        Map<String, JCoTable> map = new LinkedHashMap<>();
        JCoDestination destination = this.destinationSource.getDestinationByUser(jwtUser);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");

        if (!StringUtils.isEmpty(data.getLevel()))
            function.getImportParameterList().setValue("I_LEVEL", data.getLevel());

        if (!StringUtils.isEmpty(data.getActiveUser()))
            function.getImportParameterList().setValue("I_ACT", data.getActiveUser());

        function.getImportParameterList().setValue("I_DATE1", data.getStartDate().toString().replace("-", ""));

        function.getImportParameterList().setValue("I_DATE2", data.getEndDate().toString().replace("-", ""));

        if (!StringUtils.isEmpty(data.getTcodes()))
            function.getImportParameterList().setValue("I_TCODE", data.getTcodes());

        if (!StringUtils.isEmpty(data.getCriteria()))
            function.getImportParameterList().setValue("I_CRITERIA", data.getCriteria());

        if (!StringUtils.isEmpty(data.getLogondays()))
            function.getImportParameterList().setValue("I_DAYS", data.getLogondays());

        if (!StringUtils.isEmpty(data.getCount()))
            function.getImportParameterList().setValue("I_COUNT", data.getCount());

        if (!StringUtils.isEmpty(data.getSapSystem())) {
            JCoTable system = function.getTableParameterList().getTable("I_SYS");
            for (String s : data.getSapSystem()) {
                system.appendRow();
                system.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getClient())) {
            JCoTable client = function.getTableParameterList().getTable("I_CLT");
            for (String s : data.getClient()) {
                client.appendRow();
                client.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getUserType())) {
            JCoTable type = function.getTableParameterList().getTable("I_TYPE");
            for (String s : data.getUserType()) {
                type.appendRow();
                type.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getUserGroup())) {
            JCoTable grp = function.getTableParameterList().getTable("I_GROUP");
            for (String s : data.getUserGroup()) {
                grp.appendRow();
                grp.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getAccount())) {
            JCoTable account = function.getTableParameterList().getTable("I_ACCNT");
            for (String s : data.getAccount()) {
                account.appendRow();
                account.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getLicenseType())) {
            JCoTable lic = function.getTableParameterList().getTable("I_LIC");
            populateLicenseTypeTable(lic, data.getLicenseType());
        }

        if (!StringUtils.isEmpty(data.getUserStatus())) {
            JCoTable status = function.getTableParameterList().getTable("I_STATUS");
            for (String s : data.getUserStatus()) {
                status.appendRow();
                status.setValue("ZFIELD", s);
            }
        }

        if (!StringUtils.isEmpty(data.getUserId())) {
            JCoTable userid = function.getTableParameterList().getTable("I_USER");
            // userid.appendRow();
            // userid.setValue("ZFIELD", data.getUserId());
            populateSapTableFromInput(userid, data.getUserId());
        }

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }

        map.put("header", function.getTableParameterList().getTable("E_HEADER"));

        JCoTable table = function.getTableParameterList().getTable("E_RESULT_01");
        map.put("data", table);
        map.put("E_REPORT", function.getTableParameterList().getTable("E_REPORT"));

        return map;
    }

    @Override
    public Map<String, JCoTable> getGRCRiskTechTableByFunctionModule(JwtUser loginUser, String functionName,
            FilterData data) throws JCoException {
        Map<String, JCoTable> map = new LinkedHashMap<>();
        JCoDestination destination = this.destinationSource.getDestinationByUser(loginUser);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");
        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(Integer.valueOf(data.getLevel()))) {
            function.getImportParameterList().setValue("I_LEVEL", data.getLevel());
            if (!StringUtils.isEmpty(data.getUserInput())) {
                JCoTable userinput = null;
                if (data.getLevel() == 1) {
                    userinput = function.getTableParameterList().getTable("I_USER");
                } else {
                    userinput = function.getTableParameterList().getTable("I_ROLE");
                }
                // userinput.appendRow();
                // userinput.setValue("ZFIELD", data.getUserInput());
                populateSapTableFromInput(userinput, data.getUserInput());
            }
        }

        if (data.getRiskType() != null && data.getRiskType().size() > 0) {
            JCoTable risktype = function.getTableParameterList().getTable("I_RISKTYPE");
            for (String riskType : data.getRiskType()) {
                risktype.appendRow();
                risktype.setValue("ZFIELD", riskType);
            }
        }

        if (data.getRiskType() != null && data.getRiskLevel().size() > 0) {
            JCoTable risklevel = function.getTableParameterList().getTable("I_RISKLEVEL");
            for (String riskLevel : data.getRiskLevel()) {
                risklevel.appendRow();
                risklevel.setValue("ZFIELD", riskLevel);
            }
        }

        if (data.getRiskType() != null && data.getBusinessModule().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_APPCLASS");
            for (String busMod : data.getBusinessModule()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", busMod);
            }
        }

        if (data.getRiskId() != null && data.getRiskId().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_RISK");
            for (String risk : data.getRiskId()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", risk);
            }
        }
        if (data.getAccount() != null && data.getAccount().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_ACCNT");
            for (String account : data.getAccount()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", account);
            }
        }

        if (data.getUserGroup() != null && data.getUserGroup().size() > 0) {
            JCoTable busTable = function.getTableParameterList().getTable("I_CLASS");
            for (String group : data.getUserGroup()) {
                busTable.appendRow();
                busTable.setValue("ZFIELD", group);
            }
        }

        if (!StringUtils.isEmpty(data.getReportView())) {

            function.getImportParameterList().setValue("I_VIEW", data.getReportView());
        }

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        map.put("header", function.getTableParameterList().getTable("E_HEADER"));

        if (data.getLevel() == 1) {

            if (Integer.parseInt(data.getReportView()) == 2 && data.getRiskType().size() > 0
                    && data.getRiskType().contains("G")) {
                JCoTable table = function.getTableParameterList().getTable("E_RESULT_05");
                map.put("data", table);
            } else if (Integer.parseInt(data.getReportView()) == 2) {
                JCoTable table = function.getTableParameterList().getTable("E_RESULT_02");
                map.put("data", table);
            } else {
                JCoTable table = function.getTableParameterList().getTable("E_RESULT_01");
                map.put("data", table);
            }
        } else {
            if (Integer.parseInt(data.getReportView()) == 2 && data.getRiskType().size() > 0
                    && data.getRiskType().contains("G")) {
                JCoTable table = function.getTableParameterList().getTable("E_RESULT_06");
                map.put("data", table);
            } else if (Integer.parseInt(data.getReportView()) == 2) {
                JCoTable table = function.getTableParameterList().getTable("E_RESULT_04");
                map.put("data", table);
            } else {
                JCoTable table = function.getTableParameterList().getTable("E_RESULT_03");
                map.put("data", table);
            }
        }

        map.put("E_REPORT", function.getTableParameterList().getTable("E_REPORT"));
        return map;
    }

    @Override
    public Map<String, JCoTable> getControlByFunctionModuleMultiple(JwtUser user, String functionName,
            ControlFilterDTO data) throws JCoException {
        JCoDestination destination = this.destinationSource.getDestinationByUser(user);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");

        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(data.getYear()))
            function.getImportParameterList().setValue("I_YEAR", data.getYear());

        if (!StringUtils.isEmpty(data.getControls())) {
            JCoTable system = function.getTableParameterList().getTable("I_RECNO");
            for (String s : data.getControls()) {
                system.appendRow();
                system.setValue("ZFIELD", s);
            }
        }

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        Map<String, JCoTable> tables = new HashMap<String, JCoTable>();

        JCoTable table1 = function.getTableParameterList().getTable("E_RESULT_01");
        tables.put("E_RESULT_01", table1);
        JCoTable table2 = function.getTableParameterList().getTable("E_RESULT_02");
        tables.put("E_RESULT_02", table2);
        tables.put("header", function.getTableParameterList().getTable("E_HEADER"));
        tables.put("E_REPORT", function.getTableParameterList().getTable("E_REPORT"));
        return tables;
    }

    @Override
    public Map<String, JCoTable> getControlTableByFunctionModule(JwtUser user, String functionName,
            ControlFilterDTO data) throws JCoException {
        JCoDestination destination = this.destinationSource.getDestinationByUser(user);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");

        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(data.getYear()))
            function.getImportParameterList().setValue("I_YEAR", data.getYear());
        if (!StringUtils.isEmpty(data.getControl()))
            function.getImportParameterList().setValue("I_RECNO", data.getControl());

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        Map<String, JCoTable> tables = new HashMap<String, JCoTable>();

        tables.put("header", function.getTableParameterList().getTable("E_HEADER"));

        JCoTable table1 = function.getTableParameterList().getTable("E_RESULT_01");
        tables.put("data", table1);
        JCoTable table2 = function.getTableParameterList().getTable("E_REPORT");
        tables.put("E_REPORT", table2);

        return tables;
    }

    @Override
    public Map<String, JCoTable> getControlSummaryTableByFunctionModule(JwtUser user, String functionName,
            ControlFilterDTO data) throws JCoException {
        JCoDestination destination = this.destinationSource.getDestinationByUser(user);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");

        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(data.getYear()))
            function.getImportParameterList().setValue("I_YEAR", data.getYear());
        if (!StringUtils.isEmpty(data.getControls())) {
            JCoTable system = function.getTableParameterList().getTable("I_RECNO");
            for (String s : data.getControls()) {
                system.appendRow();
                system.setValue("ZFIELD", s);
            }
        }

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        Map<String, JCoTable> tables = new HashMap<String, JCoTable>();

        tables.put("header", function.getTableParameterList().getTable("E_HEADER"));

        JCoTable table1 = function.getTableParameterList().getTable("E_RESULT_01");
        tables.put("data", table1);
        JCoTable table2 = function.getTableParameterList().getTable("E_REPORT");
        tables.put("E_REPORT", table2);

        return tables;
    }

    @Override
    public Map<String, JCoTable> getGrcRiskReportTableByFunctionModule(JwtUser loginUser, String functionName,
            FilterData data)
            throws JCoException {
        Map<String, JCoTable> map = new LinkedHashMap<>();
        JCoDestination destination = this.destinationSource.getDestinationByUser(loginUser);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + "not found in SAP.");
        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(Integer.valueOf(data.getLevel()))) {
            function.getImportParameterList().setValue("I_LEVEL", data.getLevel());
            if (!StringUtils.isEmpty(data.getUserInput())) {
                JCoTable userinput = null;
                if (data.getLevel() == 1) {
                    userinput = function.getTableParameterList().getTable("I_USER");
                } else {
                    userinput = function.getTableParameterList().getTable("I_ROLE");
                }
                // userinput.appendRow();
                // userinput.setValue("ZFIELD", data.getUserInput());
                populateSapTableFromInput(userinput, data.getUserInput());
            }
        }

        if (!StringUtils.isEmpty(data.getMitigation())) {
            function.getImportParameterList().setValue("I_MIT", data.getMitigation());
        }

        if (!StringUtils.isEmpty(data.getDrillDown())) {
            function.getImportParameterList().setValue("I_DRILL", data.getDrillDown());
        }

        populateSapTableFromList(function.getTableParameterList().getTable("I_RISKTYPE"), data.getRiskType());
        populateSapTableFromList(function.getTableParameterList().getTable("I_RISKLEVEL"), data.getRiskLevel());
        populateSapTableFromList(function.getTableParameterList().getTable("I_APPCLASS"), data.getBusinessModule());
        populateSapTableFromList(function.getTableParameterList().getTable("I_RISK"), data.getRiskId());
        populateSapTableFromList(function.getTableParameterList().getTable("I_ACCNT"), data.getAccount());
        populateSapTableFromList(function.getTableParameterList().getTable("I_CLASS"), data.getUserGroup());

        try {
            function.execute(destination);
        } catch (AbapException e) {

            throw new RuntimeException("not able to execute function");
        }
        map.put("header", function.getTableParameterList().getTable("E_HEADER"));
        if (data.getLevel() == 1) {
            JCoTable table = function.getTableParameterList().getTable("E_RESULT");
            map.put("data", table);
        } else {
            JCoTable table = function.getTableParameterList().getTable("E_RESULT01");
            map.put("data", table);
        }

        JCoTable table2 = function.getTableParameterList().getTable("E_REPORT");
        map.put("E_REPORT", table2);

        return map;
    }

    @Override
    public Map<String, JCoTable> getCrossSystemUserTableByFunctionModule(JwtUser loginUser, String functionName,
            CrossSystemUserFilterDTO data) throws JCoException {
        Map<String, JCoTable> map = new LinkedHashMap<>();
        JCoDestination destination = this.destinationSource.getDestinationByUser(loginUser);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + " not found in SAP.");

        // Scalar Import Parameters (Image 1 & 2)
        if (!StringUtils.isEmpty(data.getSapSystem()))
            function.getImportParameterList().setValue("I_SYS", data.getSapSystem());
        if (!StringUtils.isEmpty(data.getClient()))
            function.getImportParameterList().setValue("I_CLT", data.getClient());
        if (!StringUtils.isEmpty(data.getLogondays()))
            setNumericImportParamSafely(function, "I_DAYS", data.getLogondays());

        // Note: I_STATUS parameter is omitted per requirement ("No need to pass value")

        // Table Input Parameters (Image 2 - structure /BOT/STRING)
        populateSapTableFromInput(function.getTableParameterList().getTable("I_USER"), data.getUserId());
        populateSapTableFromInput(function.getTableParameterList().getTable("I_ROLE"), data.getRole());
        populateSapTableFromInput(function.getTableParameterList().getTable("I_TCODE"), data.getTcode());

        if (data.getUserGroup() != null) {
            JCoTable grp = function.getTableParameterList().getTable("I_CLASS");
            for (String s : data.getUserGroup()) {
                if (!StringUtils.isEmpty(s)) {
                    grp.appendRow();
                    grp.setValue("ZFIELD", s);
                }
            }
        }

        if (data.getUserType() != null) {
            JCoTable ustyp = function.getTableParameterList().getTable("I_USTYP");
            for (String s : data.getUserType()) {
                if (!StringUtils.isEmpty(s)) {
                    ustyp.appendRow();
                    ustyp.setValue("ZFIELD", s);
                }
            }
        }

        if (data.getAccount() != null) {
            JCoTable accnt = function.getTableParameterList().getTable("I_ACCNT");
            for (String s : data.getAccount()) {
                if (!StringUtils.isEmpty(s)) {
                    accnt.appendRow();
                    accnt.setValue("ZFIELD", s);
                }
            }
        }

        // Note: LicenseType I_LIC table parameter is not sent to SAP RFC because SAP DB has blank LIC_TYPE fields.
        // Post-processing filtering by LAW_LIC / REC_LIC / LIC_TYPE is handled in FunctionServiceImpl.

        System.out.println("=== SAP RFC /BOT/JAVA_0011 EXECUTION START ===");
        System.out.println("  I_SYS: " + data.getSapSystem() + " | I_CLT: " + data.getClient() + " | I_DAYS: " + data.getLogondays());
        System.out.println("  LicenseType input: " + data.getLicenseType());

        JCoTable licTest = getTableSafely(function.getTableParameterList(), "I_LIC");
        if (licTest != null) {
            System.out.println("  I_LIC rows populated: " + licTest.getNumRows());
            for (int i = 0; i < licTest.getNumRows(); i++) {
                licTest.setRow(i);
                System.out.println("    Row " + i + " ZFIELD: '" + licTest.getString("ZFIELD") + "'");
            }
        } else {
            System.out.println("  I_LIC table parameter DOES NOT EXIST in /BOT/JAVA_0011!");
        }

        try {
            function.execute(destination);
            System.out.println("=== SAP RFC /BOT/JAVA_0011 EXECUTION SUCCESS ===");
            JCoTable resTable = function.getTableParameterList().getTable("E_RESULT_01");
            System.out.println("  E_RESULT_01 Row Count: " + (resTable != null ? resTable.getNumRows() : 0));
        } catch (AbapException e) {
            System.out.println("=== SAP RFC /BOT/JAVA_0011 EXECUTION ERROR: " + e.getMessage() + " ===");
            throw new RuntimeException("Error executing function " + functionName + ": " + e.getMessage());
        }

        map.put("E_RESULT_01", function.getTableParameterList().getTable("E_RESULT_01"));
        map.put("header", function.getTableParameterList().getTable("E_HEADER"));
        map.put("E_REPORT", function.getTableParameterList().getTable("E_REPORT"));
        return map;
    }

    @Override
    public Map<String, JCoTable> getCrossSystemRoleTableByFunctionModule(JwtUser loginUser, String functionName,
            CrossSystemRoleFilterDTO data) throws JCoException {
        Map<String, JCoTable> map = new LinkedHashMap<>();
        JCoDestination destination = this.destinationSource.getDestinationByUser(loginUser);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + " not found in SAP.");

        // Scalar Import Parameters (Image 1 & 2)
        setImportParamSafely(function, "I_SYS", data.getSapSystem());
        setImportParamSafely(function, "I_CLT", data.getClient());
        setImportParamSafely(function, "I_USER", data.getUserId());
        setImportParamSafely(function, "I_UNAME", data.getUserId());
        setImportParamSafely(function, "I_BNAME", data.getUserId());
        setImportParamSafely(function, "I_ROLE", data.getRole());
        setImportParamSafely(function, "I_TCODE", data.getTcode());
        setImportParamSafely(function, "I_OBJ", data.getAuthObj());
        setImportParamSafely(function, "I_FIELD", data.getAuthField());
        setImportParamSafely(function, "I_VAL", data.getAuthVal());

        JCoParameterList tableList = function.getTableParameterList();
        if (tableList != null) {
            populateSapTableFromInput(getTableSafely(tableList, "I_USER"), data.getUserId());
            populateSapTableFromInput(getTableSafely(tableList, "I_UNAME"), data.getUserId());
            populateSapTableFromInput(getTableSafely(tableList, "I_BNAME"), data.getUserId());
            populateSapTableFromInput(getTableSafely(tableList, "I_ROLE"), data.getRole());
            populateSapTableFromInput(getTableSafely(tableList, "I_TCODE"), data.getTcode());
            populateSapTableFromInput(getTableSafely(tableList, "I_OBJ"), data.getAuthObj());
            populateSapTableFromInput(getTableSafely(tableList, "I_FIELD"), data.getAuthField());
            populateSapTableFromInput(getTableSafely(tableList, "I_VAL"), data.getAuthVal());

            // Note: LicenseType I_LIC table parameter is not sent to SAP RFC because SAP DB has blank LIC_TYPE fields.
            // Filtering is handled safely in FunctionServiceImpl.
        }

        System.out.println("=== SAP RFC /BOT/JAVA_0014 EXECUTION START ===");
        System.out.println("  I_SYS: " + data.getSapSystem() + " | I_CLT: " + data.getClient());
        System.out.println("  I_USER: " + data.getUserId() + " | I_ROLE: " + data.getRole() + " | I_TCODE: " + data.getTcode());
        System.out.println("  I_OBJ: " + data.getAuthObj() + " | I_FIELD: " + data.getAuthField() + " | I_VAL: " + data.getAuthVal());

        try {
            function.execute(destination);
            System.out.println("=== SAP RFC /BOT/JAVA_0014 EXECUTION SUCCESS ===");
            JCoTable resTable = function.getTableParameterList().getTable("E_RESULT_01");
            System.out.println("  E_RESULT_01 Row Count: " + (resTable != null ? resTable.getNumRows() : 0));
        } catch (AbapException e) {
            System.out.println("=== SAP RFC /BOT/JAVA_0014 EXECUTION ERROR: " + e.getMessage() + " ===");
            throw new RuntimeException("Error executing function " + functionName + ": " + e.getMessage());
        }

        map.put("E_RESULT_01", function.getTableParameterList().getTable("E_RESULT_01"));
        map.put("header", function.getTableParameterList().getTable("E_HEADER"));
        map.put("E_REPORT", function.getTableParameterList().getTable("E_REPORT"));
        return map;
    }

    @Override
    public Map<String, JCoTable> getCrossSystemTcodeTableByFunctionModule(JwtUser loginUser, String functionName,
            CrossSystemTcodeFilterDTO data) throws JCoException {
        Map<String, JCoTable> map = new LinkedHashMap<>();
        JCoDestination destination = this.destinationSource.getDestinationByUser(loginUser);
        JCoRepository repo = destination.getRepository();
        JCoFunction function = repo.getFunction(functionName);
        if (function == null)
            throw new RuntimeException(functionName + " not found in SAP.");

        // Scalar Import Parameters (Image 1 & 2)
        setImportParamSafely(function, "I_SYS", data.getSapSystem());
        setImportParamSafely(function, "I_CLT", data.getClient());
        setImportParamSafely(function, "I_TYPE", data.getType() != null ? data.getType() : "1");
        setImportParamSafely(function, "I_USER", data.getUserId());
        setImportParamSafely(function, "I_UNAME", data.getUserId());
        setImportParamSafely(function, "I_BNAME", data.getUserId());
        setImportParamSafely(function, "I_ROLE", data.getRole());
        setImportParamSafely(function, "I_TCODE", data.getTcode());

        // Table Input Parameters
        JCoParameterList tableList = function.getTableParameterList();
        if (tableList != null) {
            populateSapTableFromInput(getTableSafely(tableList, "I_USER"), data.getUserId());
            populateSapTableFromInput(getTableSafely(tableList, "I_UNAME"), data.getUserId());
            populateSapTableFromInput(getTableSafely(tableList, "I_BNAME"), data.getUserId());
            populateSapTableFromInput(getTableSafely(tableList, "I_ROLE"), data.getRole());
            populateSapTableFromInput(getTableSafely(tableList, "I_TCODE"), data.getTcode());
            populateLicenseTypeTable(getTableSafely(tableList, "I_LIC"), data.getLicenseType());
        }

        System.out.println("=== SAP RFC /BOT/JAVA_0015 EXECUTION START ===");
        System.out.println("  I_SYS: " + data.getSapSystem() + " | I_CLT: " + data.getClient() + " | I_TYPE: " + data.getType());
        System.out.println("  I_USER: " + data.getUserId() + " | I_ROLE: " + data.getRole() + " | I_TCODE: " + data.getTcode());
        System.out.println("  I_LIC: " + data.getLicenseType());

        try {
            function.execute(destination);
            System.out.println("=== SAP RFC /BOT/JAVA_0015 EXECUTION SUCCESS ===");
            JCoTable resTable = function.getTableParameterList().getTable("E_RESULT_01");
            System.out.println("  E_RESULT_01 Row Count: " + (resTable != null ? resTable.getNumRows() : 0));
        } catch (AbapException e) {
            System.out.println("=== SAP RFC /BOT/JAVA_0015 EXECUTION ERROR: " + e.getMessage() + " ===");
            throw new RuntimeException("Error executing function " + functionName + ": " + e.getMessage());
        }

        map.put("E_RESULT_01", function.getTableParameterList().getTable("E_RESULT_01"));
        map.put("header", function.getTableParameterList().getTable("E_HEADER"));
        map.put("E_REPORT", function.getTableParameterList().getTable("E_REPORT"));
        return map;
    }

    private void setImportParamSafely(JCoFunction function, String paramName, String value) {
        if (function == null || StringUtils.isEmpty(value)) return;
        try {
            JCoParameterList importParams = function.getImportParameterList();
            if (importParams != null && importParams.getMetaData() != null) {
                if (importParams.getMetaData().indexOf(paramName) >= 0) {
                    importParams.setValue(paramName, value.trim().toUpperCase());
                }
            }
        } catch (Exception e) {
            // ignore
        }
    }

    private void setNumericImportParamSafely(JCoFunction function, String paramName, String value) {
        if (function == null || StringUtils.isEmpty(value)) return;
        String trimmed = value.trim();
        if (!trimmed.matches("\\d+")) return;
        try {
            JCoParameterList importParams = function.getImportParameterList();
            if (importParams != null && importParams.getMetaData() != null) {
                if (importParams.getMetaData().indexOf(paramName) >= 0) {
                    importParams.setValue(paramName, Integer.parseInt(trimmed));
                }
            }
        } catch (Exception e) {
            // ignore
        }
    }

    private JCoTable getTableSafely(JCoParameterList tableList, String tableName) {
        if (tableList == null || tableName == null) return null;
        try {
            return tableList.getTable(tableName);
        } catch (Exception e) {
            return null;
        }
    }

    private boolean isValidValue(String s) {
        if (StringUtils.isEmpty(s)) return false;
        String trimmed = s.trim();
        if (trimmed.isEmpty() || trimmed.equalsIgnoreCase("string")) return false;
        return true;
    }

    private void populateSapTableFromList(JCoTable table, List<String> list) {
        if (table == null || list == null) return;
        for (String s : list) {
            if (isValidValue(s)) {
                table.appendRow();
                table.setValue("ZFIELD", s.trim().toUpperCase());
            }
        }
    }

    private void populateSapTableFromInput(JCoTable table, String input) {
        if (table == null) return;
        if (input != null && !input.isEmpty()) {
            String[] values = input.split(",");
            for (String val : values) {
                String trimmedVal = val.trim();
                if (isValidValue(trimmedVal)) {
                    table.appendRow();
                    table.setValue("ZFIELD", trimmedVal.toUpperCase());
                }
            }
        }
    }

    private void populateLicenseTypeTable(JCoTable licTable, List<String> licenseTypes) {
        if (licTable == null || licenseTypes == null) return;
        for (String s : licenseTypes) {
            if (!StringUtils.isEmpty(s)) {
                String val = s.trim();
                licTable.appendRow();
                licTable.setValue("ZFIELD", val);
                if (!val.equals(val.toUpperCase())) {
                    licTable.appendRow();
                    licTable.setValue("ZFIELD", val.toUpperCase());
                }
                if (val.matches("\\d+")) {
                    try {
                        String padded = String.format("%010d", Long.parseLong(val));
                        if (!padded.equals(val)) {
                            licTable.appendRow();
                            licTable.setValue("ZFIELD", padded);
                        }
                    } catch (Exception e) {
                        // ignore padding failure
                    }
                }
            }
        }
    }

}

