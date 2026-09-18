import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import ModernGraphCard from './ModernGraphCard';

const GRCFifthSecData = ({ dialogueOpen }) => {
  const result = useSelector(state => state.filter.result);

  if (!result || !result.E_RESULT_03) return null;

  return (
    <Box mt={0}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ModernGraphCard
            data={result.E_RESULT_03.data}
            name={result.E_REPORT.data.length > 2 ? result.E_REPORT.data[2].ZDESC : 'Risk Matrix'}
            chartType={5}
            chartId="SEC321"
            dialogueOpen={dialogueOpen}
            header={result.header.data[2].ZDESC}
            chart="03"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ModernGraphCard
            data={result.E_RESULT_03.data}
            name={result.E_REPORT.data.length > 3 ? result.E_REPORT.data[3].ZDESC : 'Risk Summary'}
            chartType={1}
            chartId="SEC34"
            dialogueOpen={dialogueOpen}
            header={result.header.data[3].ZDESC}
            chart="04"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GRCFifthSecData;
