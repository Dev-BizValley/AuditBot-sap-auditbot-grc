import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const MUGRCReportTable = (props) => {
    
    const onTableCellClick = (colData, cellMeta) => {
        console.log(`[MUGRCReportTable-DEBUG] Cell Clicked:`, { dataIndex: cellMeta.dataIndex, hasOpenDialogue: !!props.openDialogue, hasFilterContext: !!props.filterContext });
        let datapoint = props.data[cellMeta.dataIndex];
        
        if(props.openDialogue) {
            props.openDialogue("drillDown", datapoint);
        } else if (props.filterContext) {
            // New Tab Redirection logic for GRC Report
            const drilldownData = {
                ...datapoint,
                SYSID: datapoint.SYSID || props.filterContext?.sapSystem?.selectedValue,
                MANDT: datapoint.MANDT || props.filterContext?.client?.selectedValue,
                ZRISK_TYPE: datapoint.ZRISK_TYPE,
                ZRISK_LEVEL: datapoint.ZRISK_LEVEL,
                ZAUDIT_ID: datapoint.ZAUDIT_ID,
                roleLevel: props.filterContext?.level || { selectedValue: datapoint.BNAME ? "1" : "2" },
                account: props.filterContext?.account,
                userGroup: props.filterContext?.userGroup
            };

            // Store in localStorage as expected by GRCRiskTeccReport
            localStorage.setItem('drilldownReportFilter', JSON.stringify(drilldownData));
            if (props.colors) {
                localStorage.setItem('drilldownReportColors', JSON.stringify(props.colors));
            }
            
            // Open the report in a new tab with standardized query param
            const newTab = window.open('/grcrisktechviewreport?drilldownReport', '_blank');
            if (newTab) newTab.opener = null;
        }
    }

    const options = {
        filterType: 'textField',
        rowsPerPage: 100,
        rowsPerPageOptions: [100, 250, 500, 1000, 2000, 5000, 10000],
        onCellClick: onTableCellClick,
        setRowProps: () => ({
            style: { cursor: 'pointer' }
        }),
        ...props.options // Allow overriding options like tableBodyMaxHeight
    };

    // Keys are auto-detected from data[0] by ModernCommonTable when not passed,
    // ensuring the columns always match whatever the API returns (including USER NAME, COMPANY CODE, etc.)
    // const keys = ["SYSID", "MANDT", "BNAME", "ZRISK_TYPE", "ZRISK_LEVEL",
    //     "APPLCLASS", "APPLDESC", "RISKEXE", "ZAUDIT_ID", "ZAUDIT_NAME", "ZVELMIT_ID", "ZNAME",
    //     "ZCOUNT3", "ZCOUNT2", "ZCOUNT1", "ZCOUNT"];

    return (
        <ModernCommonTable 
            name={props.name}
            data={props.data}
            header={props.header}
            colors={props.colors}
            options={options}
            isReport={true}
        />
    );
}

export default MUGRCReportTable;