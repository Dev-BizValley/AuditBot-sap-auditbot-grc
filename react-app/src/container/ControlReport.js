import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, Grid, Typography, Paper, ThemeProvider, CssBaseline, useScrollTrigger, createMuiTheme, makeStyles } from '@material-ui/core';

import * as action from '../Store/actions/index';
import baseTheme, { getDynamicFont, FALLBACK_FONT_FAMILY } from '../theme';

// Original Components
import ControlFilter from '../component/controlcomponent/ControlFilter';
import MUControlReportTable from '../component/controlcomponent/MUControlReportTable';
import Loader from '../component/Loader';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: theme.palette.background.default,
    height: 'calc(100vh - 48px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  headerPaper: {
    zIndex: 1100,
    position: 'sticky',
    top: 0,
    backgroundColor: '#FFFFFF',
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    padding: '0px 0',
    width: '100%',
    overflow: 'visible'
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto',
    width: '100%',
    paddingBottom: '32px'
  },
  contentContainer: {
    marginTop: 8,
    paddingBottom: 12,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    }
  },
  tablePaper: {
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  }
}));

const ControlReport = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = useSelector(state => state.login.token);
  const loader = useSelector(state => state.control.loader);
  const controlreport = useSelector(state => state.control.controlreport);
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
    },
  }), [primaryColor, dynamicFont]);

  useEffect(() => {
    dispatch(action.updatePathname(location.pathname));
    dispatch(action.clearControlTableReport());
    dispatch(action.initControlFilter(token));
  }, [dispatch, location.pathname, token]);

  const trigger = useScrollTrigger();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.pageContainer}>
        {/* Fixed Header / Filter Bar - Hidden when no system selected */}
        <Paper 
            elevation={0} 
            className={classes.headerPaper}
          >
            <Box px={0} width="100%">
              <Box display="flex" alignItems="center" width="100%">
                <ControlFilter type='Report' />
              </Box>
            </Box>
          </Paper>

        <Box className={classes.scrollContainer}>
          <Container maxWidth={false} disableGutters className={classes.contentContainer}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {Object.keys(controlreport).length > 0 && controlreport.data && controlreport.data.length > 0 ? (
                <Paper elevation={0} className={classes.tablePaper}>
                  <MUControlReportTable 
                    colors={colors} 
                    header={controlreport.header} 
                    data={controlreport.data} 
                    name={controlreport.reportName && controlreport.reportName[0] ? controlreport.reportName[0] : "Control Report"} 
                  />
                </Paper>
              ) : (
                !loader && Object.keys(controlreport).length > 0 && (
                  <Box py={10} textAlign="center">
                    <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: dynamicFont }}>
                      No records found for the selected criteria.
                    </Typography>
                  </Box>
                )
              )}
            </Grid>
          </Grid>
        </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ControlReport;

