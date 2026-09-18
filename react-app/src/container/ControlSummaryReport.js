import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, Grid, Typography, Paper, ThemeProvider, CssBaseline, useScrollTrigger, createMuiTheme } from '@material-ui/core';

import * as action from '../Store/actions/index';
import baseTheme, { getDynamicFont, FALLBACK_FONT_FAMILY } from '../theme';

// Original Components
import ControlFilter from '../component/controlcomponent/ControlFilter';
import MUSummaryControlReportTable from '../component/controlcomponent/MUSummaryControlReportTable';
import Loader from '../component/Loader';
import ControlsDraggableDialog from './ControlDragableDialogue';

const ControlSummaryReport = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [dialogue, setDialogue] = useState(false);
  const [groupby, setGroupby] = useState('');
  const [chart, setChart] = useState('');

  const token = useSelector(state => state.login.token);
  const loader = useSelector(state => state.control.loader);
  const controlsummaryreport = useSelector(state => state.control.controlsummaryreport);
  const colors = useSelector(state => state.control.colors);
  const sapSystem = useSelector(state => state.control.sapSystem);

  // Dynamic UI settings
  const primaryColor = (colors && colors.length > 0) ? colors[0] : '#2563eb';
  const dynamicFont = getDynamicFont(colors);

  const theme = useMemo(() => createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: { main: primaryColor },
    },
    typography: {
      ...baseTheme.typography,
      // fontFamily: [dynamicFont, 'Inter', 'Roboto', 'sans-serif'].join(','),
      fontFamily: [dynamicFont, FALLBACK_FONT_FAMILY].join(','),
    }
  }), [primaryColor, dynamicFont]);

  useEffect(() => {
    dispatch(action.updatePathname(location.pathname));
    dispatch(action.clearControlTableReport());
    dispatch(action.initControlFilter(token));
  }, [dispatch, location.pathname, token]);

  const openDialogue = (chart, groupby) => {
    setDialogue(true);
    setGroupby(groupby);
    setChart(chart);
  };

  const closeDialogue = () => {
    dispatch(action.clearControlTableReport());
    setDialogue(false);
    setGroupby('');
    setChart('');
  };

  const trigger = useScrollTrigger();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        backgroundColor: theme.palette.background.default,
        height: 'calc(100vh - 48px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Fixed Header / Filter Bar - Hidden when no system selected */}
        <Paper 
            elevation={0} 
            style={{ 
              zIndex: 1100,
              position: 'sticky',
              top: 0,
              backgroundColor: '#FFFFFF',
              borderBottom: `1px solid ${theme.palette.divider}`,
              borderRadius: 0,
              padding: '0px 0',
              width: '100%',
              overflow: 'visible'
            }}
          >
            <Box px={1} width="100%">
              <Box display="flex" alignItems="center" width="100%">
                <ControlFilter type='Summary' />
              </Box>
            </Box>
          </Paper>

        <Box 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            width: '100%', 
            paddingBottom: '32px' 
          }}
        >
        <Container maxWidth={false} style={{ marginTop: 8, paddingBottom: 12, paddingLeft: 12, paddingRight: 12 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {Object.keys(controlsummaryreport).length > 0 && controlsummaryreport.data && controlsummaryreport.data.length > 0 ? (
                <Paper elevation={0} style={{ 
                  borderRadius: 16, 
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}>
                  <MUSummaryControlReportTable 
                    colors={colors} 
                    header={controlsummaryreport.header} 
                    data={controlsummaryreport.data} 
                    name={controlsummaryreport.reportName && controlsummaryreport.reportName[0] ? controlsummaryreport.reportName[0] : "Control Summary Report"} 
                    openDialogue={openDialogue}
                  />
                </Paper>
              ) : (
                !loader && Object.keys(controlsummaryreport).length > 0 && (
                  <Box py={10} textAlign="center">
                    <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: dynamicFont }}>
                      No records found for the selected criteria.
                    </Typography>
                  </Box>
                )
              )}
            </Grid>
          </Grid>
          
          {loader && <Loader />}
          {dialogue && (
            <ControlsDraggableDialog 
              type="Summary"
              dialogueState={dialogue} 
              groupby={groupby} 
              chart={chart} 
              closeDialogue={closeDialogue} 
            />
          )}
        </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ControlSummaryReport;

