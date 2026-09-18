import React from 'react';
import ModernCommonTable from '../ModernCommonTable';

const MUSummaryControlReportTable = (props) => {

    const onTableCellClick = (colData, cellMeta) => {
        let datapoint = props.data[cellMeta.dataIndex];
        props.openDialogue("chart", datapoint.ZREC);
    }

    const customOptions = {
        onCellClick: onTableCellClick
    };

    return (
        <ModernCommonTable 
            name={props.name} 
            data={props.data} 
            header={props.header} 
            colors={props.colors} 
            options={customOptions}
            isReport={true}
        />
    );
}

export default MUSummaryControlReportTable;