import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import ControlGraphCard from './ControlGraphCard';

const ControlFourthSection = ({ dialogueOpen }) => {
  const result = useSelector(state => state.control.controlresult);
  const colors = useSelector(state => state.control.colors) || [];

  if (!result || !result.E_REPORT || !result.E_REPORT.data) return null;

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ControlGraphCard 
            chart='03' 
            stack={false} 
            color={colors} 
            data={result?.E_RESULT_01?.data || []} 
            name={result?.E_REPORT?.data?.[2]?.ZDESC || 'Section 5'} 
            chartType={3}  
            dialogueOpen={dialogueOpen} 
            chartHeader={result?.header?.data?.[2]?.ZDESC || ''} 
            chartId="SEC33"
            height="55vh"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ControlGraphCard 
            chart='04' 
            stack={false} 
            color={colors} 
            data={result?.E_RESULT_01?.data || []} 
            name={result?.E_REPORT?.data?.[3]?.ZDESC || 'Section 6'} 
            chartType={3}  
            dialogueOpen={dialogueOpen} 
            chartHeader={result?.header?.data?.[3]?.ZDESC || ''} 
            chartId="SEC34" 
            height="55vh"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlFourthSection;