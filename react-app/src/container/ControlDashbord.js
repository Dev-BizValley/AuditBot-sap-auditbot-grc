import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, Grid, Typography, Paper, ThemeProvider, CssBaseline, useScrollTrigger, createMuiTheme, makeStyles } from '@material-ui/core';

import * as action from '../Store/actions/index';
import * as actionType from '../Store/actions/actionsType';
import baseTheme, { getDynamicFont, FALLBACK_FONT_FAMILY } from '../theme';

// Original Components
import ControlFilter from '../component/controlcomponent/ControlFilter';
import ControlFirstSection from '../component/controlcomponent/ControlFirstSection';
import ControlFourthSection from '../component/controlcomponent/ControlFourthSection';
import ControlFifthSection from '../component/controlcomponent/ControlFifthSection';
import ControlThirdSection from '../component/controlcomponent/ControlThirdSection';
import ControlDataCard from '../component/controlcomponent/ControlDataCard';
import Loader from '../component/Loader';
import ControlsDraggableDialog from './ControlDragableDialogue';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: '#f8fafc',
    height: 'calc(100vh - 48px)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  headerPaper: {
    zIndex: 1100,
    flexShrink: 0,
    backgroundColor: '#FFFFFF',
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    padding: '0px 0',
    width: '100%',
    overflow: 'visible'
  },
  scrollContainer: {
    flex: '1 1 0%', 
    overflow: 'hidden auto', 
    width: '100%', 
    padding: '8px 8px 32px'
  },
  sectionMargin: {
    marginBottom: '4px'
  },
  sectionsWrapper: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '4px'
  }
}));

const ControlDashbord = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const [dialogue, setDialogue] = useState(false);
  const [groupby, setGroupby] = useState('');
  const [chart, setChart] = useState('');

  const token = useSelector(state => state.login.token);
  const result = useSelector(state => state.control.controlresult);
  const sapSystem = useSelector(state => state.control.sapSystem);
  const loader = useSelector(state => state.control.loader);
  const colors = useSelector(state => state.control.colors);

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
            overflow: result ? 'auto' : 'hidden',
          },
        },
      },
    },
  }), [primaryColor, dynamicFont, result]);

  useEffect(() => {
    dispatch(action.updatePathname(location.pathname));
    dispatch({ type: 'CLEAR_CONTROL_RESULT' });
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
      <Box className={classes.pageContainer}>
        {/* Fixed Header / Filter Bar */}
        <Paper
          elevation={0}
          className={classes.headerPaper}
        >
          <Box px={0} width="100%">
            <Box display="flex" alignItems="center" width="100%">
              <ControlFilter type='Dashbord' />
            </Box>
          </Box>
        </Paper>

        <Container maxWidth={false} disableGutters className={classes.scrollContainer}>

          <Box className={classes.sectionsWrapper}>
            {result && (
              <>
                <ControlFirstSection dialogueOpen={openDialogue} />

                {result.E_RESULT_02 && result.E_RESULT_02.data && (
                  <Box className={classes.sectionMargin}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={3}> <ControlDataCard result={result.E_RESULT_02.data[0]} index={0} /></Grid>
                      <Grid item xs={12} sm={6} md={3}> <ControlDataCard result={result.E_RESULT_02.data[1]} index={1} /></Grid>
                      <Grid item xs={12} sm={6} md={3}> <ControlDataCard result={result.E_RESULT_02.data[2]} index={2} /></Grid>
                      <Grid item xs={12} sm={6} md={3}> <ControlDataCard result={result.E_RESULT_02.data[3]} index={3} /></Grid>
                    </Grid>
                  </Box>
                )}

                <ControlFourthSection dialogueOpen={openDialogue} />

                {result.E_RESULT_02 && result.E_RESULT_02.data && (
                  <Box className={classes.sectionMargin}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4} md={2}> <ControlDataCard result={result.E_RESULT_02.data[0]} index={4} /></Grid>
                      <Grid item xs={12} sm={8} md={3}> <ControlDataCard result={result.E_RESULT_02.data[1]} index={5} /></Grid>
                      <Grid item xs={12} sm={4} md={2}> <ControlDataCard result={result.E_RESULT_02.data[6] || result.E_RESULT_02.data[2]} index={6} /></Grid>
                      <Grid item xs={12} sm={8} md={3}> <ControlDataCard result={result.E_RESULT_02.data[7] || result.E_RESULT_02.data[3]} index={7} /></Grid>
                      <Grid item xs={12} sm={12} md={2}> <ControlDataCard result={result.E_RESULT_02.data[8] || result.E_RESULT_02.data[2]} index={8} /></Grid>
                    </Grid>
                  </Box>
                )}

                <ControlThirdSection dialogueOpen={openDialogue} />

                {result.E_RESULT_02 && result.E_RESULT_02.data && (
                  <Box className={classes.sectionMargin}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={3}> <ControlDataCard result={result.E_RESULT_02.data[9] || result.E_RESULT_02.data[3]} index={9} /></Grid>
                      <Grid item xs={12} sm={6} md={3}> <ControlDataCard result={result.E_RESULT_02.data[10] || result.E_RESULT_02.data[0]} index={10} /></Grid>
                      <Grid item xs={12} sm={6} md={3}> <ControlDataCard result={result.E_RESULT_02.data[11] || result.E_RESULT_02.data[1]} index={11} /></Grid>
                      <Grid item xs={12} sm={6} md={3}> <ControlDataCard result={result.E_RESULT_02.data[12] || result.E_RESULT_02.data[2]} index={12} /></Grid>
                    </Grid>
                  </Box>
                )}

                <ControlFifthSection dialogueOpen={openDialogue} />
              </>
            )}
          </Box>


          {dialogue && (
            <ControlsDraggableDialog
              type="Dashbord"
              dialogueState={dialogue}
              groupby={groupby}
              chart={chart}
              closeDialogue={closeDialogue}
            />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ControlDashbord;
