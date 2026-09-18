import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, Grid, Typography, Paper, ThemeProvider, CssBaseline, createMuiTheme, makeStyles } from '@material-ui/core';

import * as action from '../Store/actions/index';
import baseTheme, { getDynamicFont, FALLBACK_FONT_FAMILY } from '../theme';

// Components
import CrossSystemRolesFilter from '../component/auditorcomponent/CrossSystemRolesFilter';
import MUGRCReportTable from '../component/licensecomponent/MUGRCReportTable';
import Loader from '../component/Loader';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: '#f8fafc',
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
    borderBottom: '1px solid #e2e8f0',
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

const CrossSystemRolesReport = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const crossSystemRolesReport = useSelector(state => state.auditor?.crossSystemRolesReport) || {};
  const loader = useSelector(state => state.auditor?.loader);
  
  // Separate unconditional hook calls
  const licenseColors = useSelector(state => state.licensefilter?.colors);
  const filterColors = useSelector(state => state.filter?.colors);
  const colors = licenseColors || filterColors || [];

  // Dynamic UI settings from Redux
  const primaryColor = (colors && colors.length > 0) ? colors[0] : '#2563eb';
  const dynamicFont = getDynamicFont(colors);

  // Create dynamic theme
  const theme = useMemo(() => createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: { main: primaryColor },
    },
    typography: {
      ...baseTheme.typography,
      fontFamily: [dynamicFont, FALLBACK_FONT_FAMILY].join(','),
    },
  }), [primaryColor, dynamicFont]);

  useEffect(() => {
    dispatch(action.updatePathname(location.pathname));
    dispatch(action.clearCrossSystemRolesReport());
  }, [dispatch, location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.pageContainer}>
        {/* Fixed Header / Filter Bar */}
        <Paper elevation={0} className={classes.headerPaper}>
          <Box px={2} width="100%">
            <Box display="flex" alignItems="center" width="100%">
              <CrossSystemRolesFilter />
            </Box>
          </Box>
        </Paper>

        <Box className={classes.scrollContainer}>
          <Container maxWidth={false} disableGutters className={classes.contentContainer}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {loader && <Loader />}
                {Object.keys(crossSystemRolesReport).length > 0 && crossSystemRolesReport.data && crossSystemRolesReport.data.length > 0 ? (
                  <Fade in={true} timeout={600}>
                    <Paper elevation={0} className={classes.tablePaper}>
                      <MUGRCReportTable
                        colors={colors}
                        header={crossSystemRolesReport.header}
                        data={crossSystemRolesReport.data}
                        name={crossSystemRolesReport.reportName && crossSystemRolesReport.reportName[0] ? crossSystemRolesReport.reportName[0] : "Cross System Roles Details"}
                        options={{ tableBodyMaxHeight: 'calc(100vh - 250px)' }}
                      />
                    </Paper>
                  </Fade>
                ) : (
                  !loader && Object.keys(crossSystemRolesReport).length > 0 && (
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

// Simple Fade component
const Fade = ({ children, in: inProp, timeout }) => (
  <div style={{
    opacity: inProp ? 1 : 0,
    transition: `opacity ${timeout}ms ease-in-out`
  }}>
    {children}
  </div>
);

export default CrossSystemRolesReport;
