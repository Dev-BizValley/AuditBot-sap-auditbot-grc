import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const MUGRCReportTable = (props) => {
    return (
        <ModernCommonTable 
            name={props.name} 
            data={props.data} 
            header={props.header} 
            colors={props.colors} 
            isReport={true}
            options={{
                ...props.options,
                rowsPerPage: 100,
                rowsPerPageOptions: [100, 250, 500, 1000]
            }}
        />
    );
}

export default MUGRCReportTable;