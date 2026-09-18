import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const GRCReportTable = (props) => {
    return (
        <ModernCommonTable 
            name={props.name} 
            data={props.data} 
            header={props.header} 
            colors={props.colors} 
            isReport={true}
            isTocGrid={props.isTocGrid}
            onClose={props.onClose}
        />
    );
}

export default GRCReportTable;