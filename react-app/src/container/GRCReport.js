import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Typography, Paper, ThemeProvider, CssBaseline, useScrollTrigger, createMuiTheme, makeStyles } from '@material-ui/core';

import * as action from '../Store/actions/index';
import * as actionType from '../Store/actions/actionsType';
// import baseTheme, { MENU_FONT_FAMILY, getDynamicFont } from '../theme';
import baseTheme, { getDynamicFont, FALLBACK_FONT_FAMILY } from '../theme';

// Original Components
import GRCFilter from '../component/grccomponent/GRCFilter';
import MUGRCReportTable from '../component/grccomponent/MUGRCReportTable';
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
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }
}));

const GRCReport = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const token = useSelector(state => state.login.token);
  const grcreport = useSelector(state => state.filter.grcreport);
  const sapSystem = useSelector(state => state.filter.sapSystem);
  const loader = useSelector(state => state.filter.loader);
  const colors = useSelector(state => state.filter.colors);

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
    dispatch(action.updatePathname('/grcreport'));
    dispatch({ type: actionType.CLEAR_RESULT });
    dispatch(action.initFilter(token));
  }, [dispatch, token]);

  const client = useSelector(state => state.filter.client);
  const level = useSelector(state => state.filter.level);
  const riskType = useSelector(state => state.filter.riskType);
  const riskLevel = useSelector(state => state.filter.riskLevel);
  const account = useSelector(state => state.filter.account);
  const userGroup = useSelector(state => state.filter.userGroup);
  const reportType = useSelector(state => state.filter.reportType);
  const businessModule = useSelector(state => state.filter.businessModule);
  const mitigation = useSelector(state => state.filter.mitigation);
  const drillDown = useSelector(state => state.filter.drillDown);
  const riskid = useSelector(state => state.filter.riskid);
  const userinput = useSelector(state => state.filter.userinput);



  const trigger = useScrollTrigger();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.pageContainer}>
        {/* Fixed Header / Filter Bar - 100% Sticky/Static */}
        <Paper 
          elevation={0} 
          className={classes.headerPaper}
        >
          <Box px={2} width="100%">
            <Box display="flex" alignItems="center" width="100%">
              <GRCFilter type='Report' />
            </Box>
          </Box>
        </Paper>

        {/* Scrollable Work Area */}
        <Box className={classes.scrollContainer}>
          <Container maxWidth={false} className={classes.contentContainer}>
          {/* <Box mb={4}>
            <Typography variant="h4" style={{ fontWeight: 800, color: theme.palette.text.primary, letterSpacing: '-0.02em', marginBottom: 8, fontFamily: dynamicFont }}>
              Detailed Risk Analysis
            </Typography>
            <Typography variant="body1" style={{ color: theme.palette.text.secondary, fontWeight: 500, fontFamily: dynamicFont }}>
              Historical review and system-level risk identification.
            </Typography>
          </Box> */}

          <Grid container spacing={1}>
            <Grid item xs={12}>
              {Object.keys(grcreport).length > 0 && grcreport.data && grcreport.data.length > 0 ? (
                <Fade in={true} timeout={600}>
                  <Paper elevation={0} className={classes.tablePaper}>
                    <MUGRCReportTable 
                      colors={colors} 
                      header={grcreport.header} 
                      data={grcreport.data} 
                      name={grcreport.reportName && grcreport.reportName[0] ? grcreport.reportName[0] : "GRC Report"}
                      // Pass filter context for redirection
                      filterContext={{
                        sapSystem,
                        client,
                        level,
                        riskType,
                        riskLevel,
                        account,
                        userGroup,
                        reportType
                      }}
                    />
                  </Paper>
                </Fade>
              ) : (
                !loader && Object.keys(grcreport).length > 0 && (
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
        </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

// Simple Fade component since it was missing from original modernization
const Fade = ({ children, in: inProp, timeout }) => (
  <div style={{ 
    opacity: inProp ? 1 : 0, 
    transition: `opacity ${timeout}ms ease-in-out` 
  }}>
    {children}
  </div>
);

export default GRCReport;

