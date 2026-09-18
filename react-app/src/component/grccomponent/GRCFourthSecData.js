import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import ModernGraphCard from './ModernGraphCard';

const GRCFourthSecData = ({ dialogueOpen }) => {
  const result = useSelector(state => state.filter.result);

  if (!result || !result.E_RESULT_01) return null;

  return (
    <Box mt={0}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <ModernGraphCard 
              data={result.E_RESULT_01.data}
              name={result.E_REPORT.data.length > 4 ? result.E_REPORT.data[4].ZDESC : 'Risk Trends'}
              chartType={3}
              chartId="SEC12"
              dialogueOpen={dialogueOpen}
              header={result.header.data[4].ZDESC}
              chart="01"
              isStacked={false}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <ModernGraphCard 
              data={result.E_RESULT_01.data}
              name={result.E_REPORT.data.length > 5 ? result.E_REPORT.data[5].ZDESC : 'Risk Analysis'}
              chartType={5}
              chartId="SEC11"
              dialogueOpen={dialogueOpen}
              header={result.header.data[5].ZDESC}
              chart="02"
              isStacked={true}
            />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GRCFourthSecData;
