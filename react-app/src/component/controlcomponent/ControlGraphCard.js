import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Typography, Grid, IconButton, Box, MenuItem, Menu, Select, Dialog, DialogContent, DialogTitle, Paper, Zoom } from '@material-ui/core';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList, PieChart, Pie, Sector, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { getDynamicFont } from '../../theme';
import { withRouter } from 'react-router-dom';
import Draggable from 'react-draggable';

// Icons
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import TocIcon from '@material-ui/icons/Toc';
import BarChartIcon from '@material-ui/icons/BarChart';
import CloseIcon from '@material-ui/icons/Close';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PieChartIcon from '@material-ui/icons/PieChart';

import ControlReportTable from './ControlReportTable';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title">
      <Paper {...props} />
    </Draggable>
  );
}

const COLORS = ["#2563eb", "#f97316", "#10b981", "#ef4444", "#8b5cf6", "#eab308", "#06b6d4", "#f43f5e"];
const RADIAN = Math.PI / 180;

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#ffffff',
    border: (props) => `2px solid ${props.config.borderColor}`,
    borderRadius: (props) => props.config.cardRadius,
    height: (props) => props.height || '55vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: (props) => props.config.cardShadow,
    '&:hover': {
      backgroundColor: (props) => `${props.config.primary}05`,
      boxShadow: (props) => props.config.hoverShadow,
      transform: 'translateY(-4px)',
      borderColor: (props) => props.config.primary,
      '& $title': {
        color: (props) => props.config.primary,
      }
    }
  },
  content: {
    flex: 1,
    padding: '24px 20px 10px 20px !important',
    minHeight: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    padding: '12px 16px',
    backgroundColor: 'transparent',
    borderTop: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: 700,
    color: '#0f172a',
    fontFamily: (props) => props.dynamicFont,
    transition: 'color 0.3s ease',
    textAlign: 'center',
  },
  select: {
    fontSize: '0.8rem',
    backgroundColor: '#f8fafc',
    padding: '4px 12px',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
    '& svg': { color: '#64748b' }
  },
  customTooltip: {
    backgroundColor: 'rgba(15, 23, 42, 0.98)',
    backdropFilter: 'blur(8px)',
    border: 'none',
    borderRadius: 12,
    padding: '12px 16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    '& .label': {
      fontSize: '0.75rem',
      fontWeight: 600,
      marginBottom: 4,
      color: '#94a3b8',
    },
    '& .value': {
      fontSize: '1rem',
      fontWeight: 800,
    }
  }
}));

const CustomTooltip = ({ active, payload, label, dynamicFont }) => {
  if (active && payload && payload.length > 1) {
    return (
      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.98)', color: '#fff', padding: '12px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', fontFamily: dynamicFont }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#94a3b8', fontWeight: 600, fontFamily: dynamicFont }}>{payload[0].payload.GROUP_DESC1 || label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ margin: '4px 0', fontSize: '11px', fontWeight: 800, color: entry.color, fontFamily: dynamicFont }}>
            {entry.name || 'Count'} : {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ControlGraphCard = (props) => {
  const dynamicColors = useSelector(state => state.control.colors) || [];
  const primaryColor = dynamicColors[0] || '#2563eb';
  const dynamicFont = getDynamicFont(dynamicColors);

  const CONFIG = useMemo(() => ({
    primary: primaryColor,
    cardRadius: 18,
    cardShadow: 'rgba(0, 0, 0, 0.1) 0px 30px 40px -2px, rgba(0, 0, 0, 0.1) 0px 6px 10px -2px',
    hoverShadow: `0 45px 55px -5px ${primaryColor}25, 0 12px 16px -6px ${primaryColor}25`,
    borderColor: 'rgb(173, 177, 184)',
    actionBgColor: '#fcfdfe',
    actionBorderColor: '#f1f5f9',
  }), [primaryColor]);

  const classes = useStyles({ dynamicFont, config: CONFIG, height: props.height });

  const [chartState, setChartState] = useState(props.chartType || 1);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const selectChartType = (type) => {
    setChartState(type);
    handleMenuClose();
  };

  const processedData = useMemo(() => {
    if (!props.data || props.data.length === 0) return [];
    return props.data.filter(p => p.ZTYPE === props.chart);
  }, [props.data, props.chart]);

  const tableData = useMemo(() => {
    if (!processedData || processedData.length === 0) return [];
    let header = props.chartHeader ? props.chartHeader.split(',') : [];
    let dataset = processedData.map(dt => ({
      COLUMN1: dt.GROUPBY1,
      COLUMN2: dt.GROUP_DESC1,
      COUNT1: dt.ZCOUNT1,
      COUNT2: dt.ZCOUNT2,
      COUNT3: dt.ZCOUNT3,
    }));
    return [header, null, dataset];
  }, [processedData, props.chartHeader]);

  const hasMultipleBars = useMemo(() => {
    if (!processedData || processedData.length === 0) return false;
    const hasZ2 = processedData.some(item => item.ZCOUNT2 !== undefined && item.ZCOUNT2 !== null && String(item.ZCOUNT2).trim() !== '' && Number(item.ZCOUNT2) > 0);
    const hasZ3 = processedData.some(item => item.ZCOUNT3 !== undefined && item.ZCOUNT3 !== null && String(item.ZCOUNT3).trim() !== '' && Number(item.ZCOUNT3) > 0);
    return hasZ2 || hasZ3;
  }, [processedData]);

  const handleChartChange = (event) => setChartState(event.target.value);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onPieEnter = (_, index) => setActiveIndex(index);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 11;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{ fontSize: '16px', fontWeight: 400, fontFamily: dynamicFont }}>
          {payload.ZCOUNT1}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke={fill} />
        <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} dy={4} textAnchor={textAnchor} fill={fill} style={{ fontSize: '11px', fontWeight: 400, fontFamily: dynamicFont, textTransform: 'uppercase' }}>
          {payload.GROUP_DESC1 || payload.GROUPBY1}
        </text>
      </g>
    );
  };

  const renderChart = () => {
    if (processedData.length === 0) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Typography color="textSecondary" style={{ fontFamily: dynamicFont }}>No records found</Typography>
        </Box>
      );
    }

    const barColors = (dynamicColors.length >= 6) ? dynamicColors : COLORS;
    const isHorizontal = chartState === 4 || chartState === 6;
    const isStacked = chartState === 5 || chartState === 6;
    const isThree = chartState === 7 || chartState === 5 || chartState === 6;
    const isNegative = props.chartId === 'SEC333';

    const renderCustomLabel = (props) => {
      const { x, y, width, height, value } = props;
      if (value === undefined || value === null || value === '') {
        return null;
      }

      if (isHorizontal) {
        // Horizontal bar: width is the bar length, height is the bar thickness
        const barWidth = Math.abs(width);
        const isTooShort = barWidth < 35;
        const isNegative = Number(value) < 0;
        const labelColor = isTooShort ? "#000000de" : "#ffffff";
        
        let textX;
        let textAnchor;
        if (isTooShort) {
          if (isNegative) {
            textX = x + width - 8;
            textAnchor = "end";
          } else {
            textX = x + width + 8;
            textAnchor = "start";
          }
        } else {
          textX = x + width / 2;
          textAnchor = "middle";
        }

        return (
          <text
            x={textX}
            y={y + height / 2}
            fill={labelColor}
            textAnchor={textAnchor}
            dominantBaseline="central"
            style={{
              fontSize: '11px',
              fontWeight: 400,
              fontFamily: dynamicFont
            }}
          >
            {value}
          </text>
        );
      } else {
        // Vertical bar: height is the bar length, width is the bar thickness
        const barHeight = Math.abs(height);
        const isTooShort = barHeight < 20;
        const isNegative = Number(value) < 0;
        const labelColor = isTooShort ? "#000000de" : "#ffffff";
        
        let textY;
        if (isTooShort) {
          if (isNegative) {
            textY = y + height + 6;
          } else {
            textY = y - 6;
          }
        } else {
          textY = y + height / 2;
        }

        return (
          <text
            x={x + width / 2}
            y={textY}
            fill={labelColor}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: '11px',
              fontWeight: 400,
              fontFamily: dynamicFont
            }}
          >
            {value}
          </text>
        );
      }
    };

    if (chartState === 2 || chartState === 3) {
      const pieData = processedData.map(item => ({
        ...item,
        ZCOUNT1_ABS: Math.abs(Number(item.ZCOUNT1) || 0)
      }));

      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieData}
              innerRadius="48%"
              outerRadius="85%"
              paddingAngle={0}
              dataKey="ZCOUNT1_ABS"
              onMouseEnter={onPieEnter}
              onClick={(d) => props.dialogueOpen(props.chartId, d.GROUPBY1)}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip dynamicFont={dynamicFont} />} />
          </PieChart>
        </ResponsiveContainer>
      );
    }


    const hasNegativeData = processedData && processedData.some(d => Number(d.ZCOUNT1) < 0 || Number(d.ZCOUNT2) < 0 || Number(d.ZCOUNT3) < 0);
    const hasLargeData = processedData && processedData.some(d => String(d.ZCOUNT1).length > 4 || (d.ZCOUNT2 && String(d.ZCOUNT2).length > 4) || (d.ZCOUNT3 && String(d.ZCOUNT3).length > 4));
    const labelInside = true;

    const getLabelPosition = () => {
      return "center";
    };

    const labelColor = labelInside ? "#ffffff" : "#000000de";

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart barGap={4} barCategoryGap="20%" 
          layout={isHorizontal ? "vertical" : "horizontal"}
          data={processedData}
          margin={{ top: 20, right: 30, left: isHorizontal ? 80 : 55, bottom: 20 }}
          
          barSize={40}
        >
          <CartesianGrid vertical={isHorizontal} horizontal={!isHorizontal} stroke="#e2e8f0" strokeWidth={1} />
          <XAxis
            type={isHorizontal ? "number" : "category"}
            dataKey={isHorizontal ? undefined : "GROUP_DESC1"}
            axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }}
            tickLine={false}
            tick={{ fill: '#000000de', fontSize: 12, fontWeight: 400, fontFamily: dynamicFont }}
            interval={isHorizontal ? undefined : 0}
            reversed={isNegative}
          />
          <YAxis
            type={isHorizontal ? "category" : "number"}
            dataKey={isHorizontal ? "GROUP_DESC1" : undefined}
            axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }}
            tickLine={false}
            tick={{ fill: '#000000de', fontSize: 12, fontWeight: 400, fontFamily: dynamicFont }}
            width={isHorizontal ? 100 : 40}
            interval={isHorizontal ? 0 : undefined}
            reversed={isNegative && !isHorizontal}
          />
          <Tooltip content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: '#f8fafc' }} />
          {hasMultipleBars && (
            <Legend 
              iconSize={10} 
              align='center' 
              layout='horizontal' 
              verticalAlign='top' 
              height={30} 
              wrapperStyle={{ fontSize: '10px', fontWeight: 400, fontFamily: dynamicFont, color: '#000000de' }} 
              payload={
                isThree 
                  ? [
                      { value: props.chartHeader ? props.chartHeader.split(',')[2] : 'Count 1', type: 'square', id: 'ID01', color: barColors[0] },
                      { value: props.chartHeader ? props.chartHeader.split(',')[3] : 'Count 2', type: 'square', id: 'ID02', color: barColors[1] },
                      { value: props.chartHeader ? props.chartHeader.split(',')[4] : 'Count 3', type: 'square', id: 'ID03', color: barColors[2] }
                    ]
                  : processedData.map((entry, index) => ({
                      value: entry.GROUP_DESC1 || entry.GROUPBY1,
                      type: 'square',
                      id: entry.GROUPBY1,
                      color: processedData.length === 1 ? primaryColor : barColors[index % barColors.length]
                    }))
              }
            />
          )}

          <Bar
            dataKey="ZCOUNT1"
            name={props.chartHeader ? props.chartHeader.split(',')[2] : 'Count'}
            stackId={isStacked ? "a" : undefined}
            fill={isStacked || isThree ? barColors[0] : (processedData.length === 1 ? primaryColor : undefined)}
            radius={isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}
            onClick={(d) => props.dialogueOpen(props.chartId, d.GROUPBY1)}
          >
            {!isStacked && processedData.length > 1 && processedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
            <LabelList dataKey="ZCOUNT1" content={renderCustomLabel} />
          </Bar>

          {isThree && (
            <Bar dataKey="ZCOUNT2" name={props.chartHeader ? props.chartHeader.split(',')[3] : 'Count 2'} stackId={isStacked ? "a" : undefined} fill={barColors[1]} radius={isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]} onClick={(d) => props.dialogueOpen(props.chartId, d.GROUPBY1)}>
              <LabelList dataKey="ZCOUNT2" content={renderCustomLabel} />
            </Bar>
          )}
          {isThree && (
            <Bar dataKey="ZCOUNT3" name={props.chartHeader ? props.chartHeader.split(',')[4] : 'Count 3'} stackId={isStacked ? "a" : undefined} fill={barColors[2]} radius={isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]} onClick={(d) => props.dialogueOpen(props.chartId, d.GROUPBY1)}>
              <LabelList dataKey="ZCOUNT3" content={renderCustomLabel} />
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <>
      <Zoom in={true}>
        <Card className={classes.card} elevation={0} style={{ height: '42vh' }}>
          <CardContent className={classes.content} style={{ padding: '8px 12px 4px 12px', height: 'calc(100% - 40px)' }}>
            <Box flex={1} minHeight={0}>
              {renderChart()}
            </Box>
          </CardContent>

          {processedData.length > 0 && (
            <CardActions className={classes.actions} style={{ padding: '12px 16px', backgroundColor: 'transparent', borderTop: 'none' }}>
              <Box display="flex" alignItems="center" width="100%">
                <Box
                  onClick={handleMenuClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 4px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff',
                    minWidth: '50px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    fontFamily: dynamicFont,
                    fontSize: '12px'
                  }}
                >
                  {chartState === 2 || chartState === 3 ? (
                    <PieChartIcon fontSize="small" style={{ color: '#f43f5e' }} />
                  ) : (
                    <BarChartIcon fontSize="small" style={{ color: '#f43f5e' }} />
                  )}
                  <ArrowDropDownIcon fontSize="small" style={{ color: '#64748b', marginLeft: 4 }} />
                </Box>

                <Box flex={1} textAlign="center" px={1}>
                  <Typography className={classes.title}>
                    {props.name ? props.name.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase()) : ''}
                  </Typography>
                </Box>

                <IconButton size="small" onClick={handleClickOpen} style={{ color: '#64748b' }}>
                  <TocIcon fontSize="small" />
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{
                  style: {
                    borderRadius: '12px',
                    marginTop: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    minWidth: '180px'
                  }
                }}
              >
                <MenuItem onClick={() => selectChartType(1)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 1 ? primaryColor : '#475569' }}>Vertical Bar</MenuItem>
                {hasMultipleBars ? [
                  <MenuItem key="5" onClick={() => selectChartType(5)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 5 ? primaryColor : '#475569' }}>Stacked Vertical</MenuItem>,
                  <MenuItem key="6" onClick={() => selectChartType(6)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 6 ? primaryColor : '#475569' }}>Stacked Horizontal</MenuItem>
                ] : [
                  <MenuItem key="4" onClick={() => selectChartType(4)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 4 ? primaryColor : '#475569' }}>Horizontal Bar</MenuItem>,
                  <MenuItem key="3" onClick={() => selectChartType(3)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 3 ? primaryColor : '#475569' }}>Donut Chart</MenuItem>
                ]}
              </Menu>
            </CardActions>
          )}
        </Card>
      </Zoom>

      <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} maxWidth="lg" fullWidth={false} classes={{ paper: classes.dialogPaper }} disableEnforceFocus>
        <DialogContent style={{ padding: '8px 24px !important', overflow: 'hidden' }}>
          {tableData.length > 0 && (
            <ControlReportTable
              name={props.name}
              header={tableData[0]}
              data={tableData[2]}
              colors={dynamicColors.length > 0 ? dynamicColors : COLORS}
              isTocGrid={true}
              onClose={handleClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withRouter(ControlGraphCard);