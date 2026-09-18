import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const MUControlReportTable = (props) => {
    return (
        <ModernCommonTable 
            name={props.name} 
            data={props.data} 
            header={props.header} 
            colors={props.colors} 
            isReport={true}
        />
    );
}

export default MUControlReportTable;