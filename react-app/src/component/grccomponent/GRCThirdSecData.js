import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, Typography } from '@material-ui/core';
import ModernGraphCard from './ModernGraphCard';

const GRCThirdSecData = ({ dialogueOpen }) => {
  const result = useSelector(state => state.filter.result);
  const colors = useSelector(state => state.filter.colors);

  if (!result || !result.E_RESULT_03) return null;

  return (
    <Box mt={0}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <ModernGraphCard 
              data={result.E_RESULT_03.data}
              name={result.E_REPORT.data[0].ZDESC}
              chartType={1}
              chartId="SEC1"
              dialogueOpen={dialogueOpen}
              isStacked={true}
              header={result.header.data[0].ZDESC}
              chart="01"
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <ModernGraphCard 
              data={result.E_RESULT_03.data}
              name={result.E_REPORT.data[1].ZDESC}
              chartType={5}
              chartId="SEC32"
              dialogueOpen={dialogueOpen}
              header={result.header.data[1].ZDESC}
              chart="02"
            />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GRCThirdSecData;
