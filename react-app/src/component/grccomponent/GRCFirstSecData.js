import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import ModernGraphCard from './ModernGraphCard';

const GRCFirstSecData = ({ dialogueOpen }) => {
  const result = useSelector(state => state.filter.result);

  if (!result || !result.E_RESULT_01 || !result.E_RESULT_03) return null;

  return (
    <Box mt={0} width="100%">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ModernGraphCard
            data={result.E_RESULT_01.data}
            name={result.E_REPORT.data.length > 6 ? result.E_REPORT.data[6].ZDESC : 'Risk Matrix'}
            chartType={1}
            chartId="SEC13"
            dialogueOpen={dialogueOpen}
            header={result.header.data[6].ZDESC}
            chart="03"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ModernGraphCard
            data={result.E_RESULT_03.data}
            name={result.E_REPORT.data.length > 7 ? result.E_REPORT.data[7].ZDESC : 'Distribution'}
            chartType={1}
            chartId="SEC15"
            dialogueOpen={dialogueOpen}
            header={result.header.data[7].ZDESC}
            chart="05"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GRCFirstSecData;
