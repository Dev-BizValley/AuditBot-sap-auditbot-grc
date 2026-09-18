import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const LicenceReportTableDialogue = (props) => {
    return (
        <ModernCommonTable 
            name={props.name || "Details"} 
            data={props.data} 
            header={props.header} 
            colors={props.colors} 
            isTocGrid={true}
            options={{ 
                rowsPerPage: 100,
                rowsPerPageOptions: [100, 250, 500]
            }}
        />
    );
}

export default LicenceReportTableDialogue;