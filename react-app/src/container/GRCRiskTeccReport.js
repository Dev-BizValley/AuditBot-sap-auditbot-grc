import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, Grid, Typography, Paper, ThemeProvider, CssBaseline, useScrollTrigger, createMuiTheme, makeStyles } from '@material-ui/core';

import * as action from '../Store/actions/index';
import * as actionType from '../Store/actions/actionsType';
// import baseTheme, { MENU_FONT_FAMILY, getDynamicFont } from '../theme';
import baseTheme, { getDynamicFont, FALLBACK_FONT_FAMILY } from '../theme';

import GRCRiskTechFilter from '../component/grccomponent/GRCRiskTechFilter';
import MUGRCRiskTeckReportTable from '../component/grccomponent/MUGRCRiskTeckReportTable';
import Loader from '../component/Loader';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: theme.palette.background.default,
    height: 'calc(100vh - 48px)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
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
    overflow: 'visible',
    flexShrink: 0
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

const GRCRiskTeccReport = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isDrillDown, setIsDrillDown] = useState(false);

  const token = useSelector(state => state.login.token);
  const grcreport = useSelector(state => state.filter.tableRiskTechReport);
  const sapSystem = useSelector(state => state.filter.sapSystem);
  const loader = useSelector(state => state.filter.loader);
  const reduxColors = useSelector(state => state.filter.colors);
  
  // Use localStorage colors to prevent a flash of unstyled content while Redux fetches
  const colors = useMemo(() => {
      if (reduxColors && reduxColors.length > 0) return reduxColors;
      try {
          const stored = localStorage.getItem('drilldownReportColors');
          return stored ? JSON.parse(stored) : [];
      } catch (e) {
          return [];
      }
  }, [reduxColors]);

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
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            overflow: (grcreport && Object.keys(grcreport).length > 0) ? 'auto' : 'hidden',
          },
        },
      },
    },
  }), [primaryColor, dynamicFont, grcreport]);

  useEffect(() => {
    dispatch(action.updatePathname(location.pathname));
    dispatch({ type: actionType.CLEAR_GRCRISKTECH_REPORT });
    
    const isDrillDown = window.location.search.length > 0;
    dispatch(action.initRiskTechFilter(token, isDrillDown));

    if (isDrillDown) {
      const storedData = localStorage.getItem('drilldownReportFilter');
      if (storedData) {
        const queryData = JSON.parse(storedData);
        dispatch(action.grcReportDrillDown({
          data: {
            token,
            sapSystem: queryData?.SYSID,
            client: queryData?.MANDT,
            level: queryData?.roleLevel.selectedValue,
            riskType: [queryData?.ZRISK_TYPE],
            riskLevel: [queryData?.ZRISK_LEVEL],
            riskId: [queryData?.ZAUDIT_ID],
            userInput: queryData?.roleLevel.selectedValue === "1" ? queryData?.BNAME : queryData?.AGR_NAME,
            account: queryData?.account.selectedValue,
            userGroup: queryData?.userGroup.selectedValue
          }
        }));

        setIsDrillDown(true);
        localStorage.removeItem('drilldownReportFilter');
        localStorage.removeItem('drilldownReportColors');
      }
    }
  }, [dispatch, location.pathname, token]);

  const trigger = useScrollTrigger();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.pageContainer}>
        {/* Fixed Header / Filter Bar - Hidden in redirected/drill-down view */}
        {!isDrillDown && sapSystem && sapSystem.value && sapSystem.value.length > 0 && (
          <Paper 
            elevation={0} 
            className={classes.headerPaper}
          >
            <Box px={0} width="100%">
              <Box display="flex" alignItems="center" width="100%">
                <GRCRiskTechFilter type='Report' />
              </Box>
            </Box>
          </Paper>
        )}

        <Box className={classes.scrollContainer}>
          <Container maxWidth={false} className={classes.contentContainer}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {Object.keys(grcreport).length > 0 && grcreport.data && grcreport.data.length > 0 ? (
                  <Paper elevation={0} className={classes.tablePaper}>
                    <MUGRCRiskTeckReportTable 
                      colors={colors} 
                      header={grcreport.header} 
                      data={grcreport.data} 
                      name={grcreport.reportName && grcreport.reportName[0] ? grcreport.reportName[0] : "GRC Risk Tech Report"} 
                    />
                  </Paper>
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

export default GRCRiskTeccReport;
