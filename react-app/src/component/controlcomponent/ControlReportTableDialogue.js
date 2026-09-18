import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const ControlReportTableDialogue = (props) => {
    return (
        <ModernCommonTable 
            name={props.name || ""} 
            data={props.data} 
            header={props.header} 
            colors={props.colors} 
            options={{ rowsPerPage: 200 }}
            onClose={props.onClose}
        />
    );
}

export default ControlReportTableDialogue;