import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import ControlGraphCard from './ControlGraphCard';

const ControlThirdSection = ({ dialogueOpen }) => {
  const result = useSelector(state => state.control.controlresult);
  const colors = useSelector(state => state.control.colors) || [];

  if (!result || !result.E_REPORT || !result.E_REPORT.data) return null;

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ControlGraphCard 
            chart='05' 
            stack={false} 
            color={colors} 
            data={result?.E_RESULT_01?.data || []} 
            name={result?.E_REPORT?.data?.[4]?.ZDESC || 'Section 3'}  
            chartType={1} 
            dialogueOpen={dialogueOpen} 
            chartHeader={result?.header?.data?.[4]?.ZDESC || ''} 
            chartId="SEC35" 
            height="55vh"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ControlGraphCard 
            chart='06' 
            stack={false} 
            color={colors}  
            data={result?.E_RESULT_01?.data || []} 
            name={result?.E_REPORT?.data?.[5]?.ZDESC || 'Section 4'} 
            chartType={1} 
            dialogueOpen={dialogueOpen} 
            chartHeader={result?.header?.data?.[5]?.ZDESC || ''} 
            chartId="SEC36" 
            height="55vh"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlThirdSection;