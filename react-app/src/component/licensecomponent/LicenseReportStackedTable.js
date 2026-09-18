import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const LicenseReportStackedTable = (props) => {
    return (
        <ModernCommonTable 
            name={props.name || "License Report"} 
            data={props.data} 
            header={props.header} 
            colors={props.colors} 
            isReport={true}
            options={{
                rowsPerPage: 100,
                rowsPerPageOptions: [100, 250, 500, 1000],
                ...props.options
            }}
        />
    );
}

export default LicenseReportStackedTable;