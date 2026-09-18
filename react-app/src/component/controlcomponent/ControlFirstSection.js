import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import ControlGraphCard from './ControlGraphCard';

const ControlFirstSection = ({ dialogueOpen }) => {
  const result = useSelector(state => state.control.controlresult);
  const colors = useSelector(state => state.control.colors) || [];

  if (!result || !result.E_REPORT || !result.E_REPORT.data) return null;

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ControlGraphCard 
            chart='01' 
            stack={false} 
            color={colors} 
            data={result?.E_RESULT_01?.data || []} 
            name={result?.E_REPORT?.data?.[0]?.ZDESC || 'Section 1'}  
            chartType={1} 
            dialogueOpen={dialogueOpen} 
            chartHeader={result?.header?.data?.[0]?.ZDESC || ''} 
            chartId="SEC31" 
            height="55vh"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ControlGraphCard 
            chart='02' 
            stack={false} 
            color={colors}  
            data={result?.E_RESULT_01?.data || []} 
            name={result?.E_REPORT?.data?.[1]?.ZDESC || 'Section 2'} 
            chartType={4} 
            dialogueOpen={dialogueOpen} 
            chartHeader={result?.header?.data?.[1]?.ZDESC || ''} 
            chartId="SEC32" 
            height="55vh"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlFirstSection;