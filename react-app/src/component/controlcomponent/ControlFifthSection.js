import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import ControlGraphCard from './ControlGraphCard';

const ControlFifthSection = ({ dialogueOpen }) => {
  const result = useSelector(state => state.control.controlresult);
  const colors = useSelector(state => state.control.colors) || [];

  if (!result || !result.E_REPORT || !result.E_REPORT.data) return null;

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ControlGraphCard 
            chart='07' 
            stack={false} 
            color={colors} 
            data={result?.E_RESULT_01?.data || []} 
            name={result?.E_REPORT?.data?.[6]?.ZDESC || 'Section 7'}  
            chartType={3}  
            dialogueOpen={dialogueOpen} 
            chartHeader={result?.header?.data?.[6]?.ZDESC || ''} 
            chartId="SEC37"
            height="55vh"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ControlGraphCard 
            chart='08' 
            stack={false} 
            color={colors}  
            data={result?.E_RESULT_01?.data || []} 
            name={result?.E_REPORT?.data?.[7]?.ZDESC || 'Section 8'} 
            chartType={3}  
            dialogueOpen={dialogueOpen} 
            chartHeader={result?.header?.data?.[7]?.ZDESC || ''} 
            chartId="SEC38" 
            height="55vh"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlFifthSection;