package com.sap.audit.bot.config;

import org.springframework.stereotype.Component;

@Component
public class AuditBotConstants {
    public enum FilterTableMapping {
        TABLE1("SAP System", "ZTYPE", 1, "ZRESULT" ),
        TABLE2("Client", "ZTYPE", 2, "ZRESULT"),
        TABLE3("Risk Type", "ZTYPE", 3, "ZRESULT"),
        TABLE4("Risk Level", "ZTYPE", 4, "ZRESULT"),
        TABLE5("Business Module", "ZTYPE", 5, "ZRESULT"),
        TABLE6("Risk Id", "ZTYPE", 6, "ZRESULT"),
        TABLE7("Mitigation", "ZTYPE", 7, "ZRESULT"),
        TABLE8("Report Type", "ZTYPE", 8, "ZRESULT"),
        TABLE9("Drill Down", "ZTYPE", 9, "ZRESULT"),
        TABLE10("Report View", "ZTYPE", 10, "ZRESULT"),
        TABLE13("User Group", "ZTYPE", 13, "ZRESULT"),
        TABLE14("Account", "ZTYPE", 14, "ZRESULT"),
        TABLE26("Report Level", "ZTYPE", 26, "ZRESULT"),
        TABLE51("COLORS", "ZTYPE", 51, "ZRESULT");


        private String tableNamealias;
        private String valueString;
        private int tableNum;
        private String tableName;


        FilterTableMapping(String tableNamealias, String valueString, int tableNum, String tableName) {
            this.tableName = tableName;
            this.tableNum = tableNum;
            this.tableNamealias = tableNamealias;
            this.valueString = valueString;
        }

        public String getTableName() {
            return this.tableName;
        }

        public int getTableNum() {
            return this.tableNum;
        }

        public String getTableNamealias() {
            return this.tableNamealias;
        }

        public String getValueString() {
            return this.valueString;
        }
    }


    public enum LicenseFilterTableMapping {
        TABLE1("SAP System", "ZTYPE", 1, "ZRESULT"),
        TABLE2("Client", "ZTYPE", 2, "ZRESULT"),
        TABLE11("Level", "ZTYPE", 11, "ZRESULT"),
        TABLE12("User Type", "ZTYPE", 12, "ZRESULT"),
        TABLE13("User Group", "ZTYPE", 13, "ZRESULT"),
        TABLE14("Account", "ZTYPE", 14, "ZRESULT"),
        TABLE15("License Type", "ZTYPE", 15, "ZRESULT"),
        TABLE16("User Status", "ZTYPE", 16, "ZRESULT"),
        TABLE17("Active User", "ZTYPE", 17, "ZRESULT"),
        TABLE18("TCodes", "ZTYPE", 18, "ZRESULT"),
        TABLE19("Criteria", "ZTYPE", 19, "ZRESULT"),
        TABLE26("Report Level", "ZTYPE", 26, "ZRESULT"),
        TABLE51("COLORS", "ZTYPE", 51, "ZRESULT");


        private String tableNamealias;
        private String valueString;
        private int tableNum;
        private String tableName;

        LicenseFilterTableMapping(String tableNamealias, String valueString, int tableNum, String tableName) {
            this.tableName = tableName;
            this.tableNum = tableNum;
            this.tableNamealias = tableNamealias;
            this.valueString = valueString;
        }

        public String getTableName() {
            return this.tableName;
        }

        public int getTableNum() {
            return this.tableNum;
        }

        public String getTableNamealias() {
            return this.tableNamealias;
        }

        public String getValueString() {
            return this.valueString;
        }
    }

    public enum AuthorizationMapping {
        TABLE20("Authorization", "ZTYPE", 20, "ZRESULT");


        private String tableNamealias;
        private String valueString;
        private int tableNum;
        private String tableName;

        AuthorizationMapping(String tableNamealias, String valueString, int tableNum, String tableName) {
            this.tableName = tableName;
            this.tableNum = tableNum;
            this.tableNamealias = tableNamealias;
            this.valueString = valueString;
        }

        public String getTableName() {
            return this.tableName;
        }

        public int getTableNum() {
            return this.tableNum;
        }

        public String getTableNamealias() {
            return this.tableNamealias;
        }

        public String getValueString() {
            return this.valueString;
        }
    }


    public enum ControlsFilterTableMapping {
        TABLE1("SAP System", "ZTYPE", 1, "ZRESULT"),
        TABLE2("Client", "ZTYPE", 2, "ZRESULT"),
        TABLE7("Mitigation", "ZTYPE", 7, "ZRESULT"),
        TABLE9("Drill Down", "ZTYPE", 9, "ZRESULT"),
        TABLE21("Controls", "ZTYPE", 21, "ZRESULT"),
        TABLE51("COLORS", "ZTYPE", 51, "ZRESULT");


        private String tableNamealias;
        private String valueString;
        private int tableNum;
        private String tableName;

        ControlsFilterTableMapping(String tableNamealias, String valueString, int tableNum, String tableName) {
            this.tableName = tableName;
            this.tableNum = tableNum;
            this.tableNamealias = tableNamealias;
            this.valueString = valueString;
        }

        public String getTableName() {
            return this.tableName;
        }

        public int getTableNum() {
            return this.tableNum;
        }

        public String getTableNamealias() {
            return this.tableNamealias;
        }

        public String getValueString() {
            return this.valueString;
        }
    }
}


