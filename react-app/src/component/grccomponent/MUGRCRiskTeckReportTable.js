import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const MUGRCRiskTeckReportTable = (props) => {

    const options = {
        filterType: 'textField',
        rowsPerPage: 100,
        rowsPerPageOptions: [100, 250, 500, 1000, 2000, 5000, 10000]
    };

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

export default MUGRCRiskTeckReportTable;