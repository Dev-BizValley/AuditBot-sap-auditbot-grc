import React, { useState, useEffect, useMemo } from 'react';
import { Card, Box, CardContent, Typography, CardActions, Grid, MenuItem, IconButton, Dialog, DialogContent, Paper, Menu } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getDynamicFont } from '../../theme';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend, PieChart, Pie, Cell, Sector
} from 'recharts';
import TocIcon from '@material-ui/icons/Toc';
import Draggable from 'react-draggable';
import CloseIcon from '@material-ui/icons/Close';
import BarChartIcon from '@material-ui/icons/BarChart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PieChartIcon from '@material-ui/icons/PieChart';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import ModernCommonTable from '../ModernCommonTable';
import { withRouter } from 'react-router-dom';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title">
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: (props) => `${props.config.cardRadius}px !important`,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 30px 40px -2px, rgba(0, 0, 0, 0.1) 0px 6px 10px -2px !important',
    border: (props) => `2px solid ${props.config.borderColor}`,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: (props) => `${props.config.primary}05`,
      boxShadow: (props) => `0 20px 25px -5px ${props.config.primary}15, 0 8px 10px -6px ${props.config.primary}15 !important`,
      borderColor: (props) => props.config.primary,
      '& $title': {
        color: (props) => props.config.primary,
      }
    }
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: 700,
    fontFamily: (props) => props.dynamicFont,
    color: (props) => props.config.titleColor,
    letterSpacing: '-0.01em'
  },
  dialoguewidth: {
    maxWidth: 'inherit'
  }
}));

const CustomTooltip = ({ active, payload, label, dynamicFont }) => {
  if (active && payload && payload.length > 1) {
    return (
      <Box
        style={{
          backgroundColor: '#ffffff',
          backdropFilter: 'blur(8px)',
          padding: '8px 12px',
          borderRadius: '12px',
          border: 'none',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          color: '#000000de',
          fontFamily: dynamicFont}}
      >
        <Typography variant="subtitle2" style={{ fontWeight: 400, marginBottom: 4, color: '#000000de', fontSize: '11px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 4, fontFamily: dynamicFont }}>
          {payload[0].payload.GROUP_DESC1 || payload[0].payload.UTYPLONGTEXT || label}
        </Typography>
        {payload.map((entry, index) => (
          <Typography key={index} variant="body2" style={{ color: entry.color, fontSize: '11px', fontWeight: 400, marginTop: 4, fontFamily: dynamicFont }}>
            {entry.name ? `${entry.name} : ${entry.value}` : `Count : ${entry.value}`}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const LicenceStackGraphCard = (props) => {
  const dynamicColors = useSelector(state => state.licensefilter.colors) || [];
  const primaryColor = dynamicColors[0] || '#2563eb';
  const dynamicFont = getDynamicFont(dynamicColors);
  const COLORS = (dynamicColors.length >= 8) ? dynamicColors.slice(0, 16) : ["#2563eb", "#7c3aed", "#0891b2", "#059669", "#ca8a04", "#dc2626", "#4b5563", "#d946ef"];

  const CONFIG = useMemo(() => ({
    cardHeight: '38vh',
    cardRadius: 18,
    borderColor: 'rgb(173, 177, 184)',
    titleColor: '#0f172a',
    primary: primaryColor,
    gridStroke: '#cbd5e1', // Darker, more visible grid lines
    axisTickColor: '#000000de',
    tooltipBg: 'rgba(15, 23, 42, 0.95)',
    tooltipColor: '#ffffff',
    labelColor: '#000000de',
    stackLabelColor: '#ffffff',
  }), [primaryColor]);

  const classes = useStyles({ dynamicFont, config: CONFIG });
  const [chartState, setChartState] = useState(props.chartType || 1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const selectChartType = (value) => {
    setChartState(value);
    handleMenuClose();
  };

  const [open, setOpen] = useState(false);

  const legendText = (val) => {
    // We must use hardcoded labels because the backend sends full ALV table headers 
    // (e.g. "License,License Desc,Purch Lic,Purch Cost...") which do not map 1:1 to COL1, COL2, COL3
    const chartLegendLabels = {
      COL1: 'Purchased',
      COL2: 'Recommended',
      COL3: props.chartId === 'SEC111' || (props.name && props.name.toLowerCase().includes('savings')) ? 'Additional/Excess (Percentage)' : 'Additional/Excess',
      COL4: 'Unused'
    };

    return chartLegendLabels[val] || val;
  };

  const CustomizedAxisTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fontSize={12} fill={CONFIG.axisTickColor} fontWeight={400} fontFamily={dynamicFont}>{payload.value}</text>
    </g>
  );

  const CustomizedYAxisTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dx={-10} dy={4} textAnchor="end" fontSize={12} fill={CONFIG.axisTickColor} fontWeight={400} fontFamily={dynamicFont}>{payload.value}</text>
    </g>
  );

  const renderTooltip = () => (
    <Tooltip offset={70} wrapperStyle={{ pointerEvents: 'none' , marginTop: '-20px' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
  );

  const renderLegend = () => (
    <Legend
      iconSize={10}
      align='center'
      layout='horizontal'
      verticalAlign='top'
      height={40}
      wrapperStyle={{
        fontFamily: dynamicFont,
        fontSize: '12px',
        fontWeight: 400, color: '#000000de', paddingBottom: 4, marginTop: '0px' }}
      formatter={(value) => chartState === 4 ? value : legendText(value)}
    />
  );

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent: _percent, value: _value, name: _name
    } = props;
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
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{ fontSize: '0.875rem', fontWeight: 400, fontFamily: dynamicFont}}>{payload.value}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke={fill} />
        <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} angle={-45} fontSize='0.875rem' textAnchor={textAnchor} fill={fill} style={{ fontFamily: dynamicFont}}>{`${payload.name || ''}`}</text>
      </g>
    );
  };

  const renderCustomLabel = (props) => {
    const { x, y, width, height, value } = props;
    if (value === null || value === undefined) return null;

    const isNegative = value < 0;
    const barHeight = Math.abs(height);
    const topY = height < 0 ? y + height : y;
    const bottomY = height < 0 ? y : y + height;

    let textY;
    let textFill;

    if (isNegative) {
      if (barHeight > 20) {
        textY = bottomY - 6; // Inside the bar at the bottom
        textFill = "#ffffff";
      } else {
        textY = bottomY + 14; // Below the bar
        textFill = "#000000de";
      }
    } else {
      textY = topY - 6; // Above the bar
      textFill = "#000000de";
    }

    return (
      <text
        x={x + width / 2}
        y={textY}
        fill={textFill}
        textAnchor="middle"
        style={{
          fontSize: 11,
          fontWeight: 400,
          fontFamily: dynamicFont
        }}
      >
        {value}
      </text>
    );
  };

  const renderChart = () => {
    const isVertical = chartState === 2;
    const isHorizontal = chartState === 1;
    const isComparison = chartState === 3;
    const isDonut = chartState === 4;
    const data = (props.data || []).filter(p => p.ZTYPE === props.chart);

    if (isDonut) {
      const pieData = [
        { name: 'Purchased', value: data.reduce((acc, curr) => acc + (curr.COL1 || 0), 0) },
        { name: 'Recommended', value: data.reduce((acc, curr) => acc + (curr.COL2 || 0), 0) },
        { name: 'Additional', value: data.reduce((acc, curr) => acc + (curr.COL3 || 0), 0) },
        ...(parseInt(props.stack) >= 4 ? [{ name: 'Unused', value: data.reduce((acc, curr) => acc + (curr.COL4 || 0), 0) }] : [])
      ];

      return (
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="75%"
              paddingAngle={0}
              dataKey="value"
              maxBarSize={45} isAnimationActive={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='none' />
              ))}
            </Pie>

          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart barGap={4} barCategoryGap="5%"
          layout={isHorizontal ? "vertical" : "horizontal"}
          data={data}


          margin={{ top: 10, right: 30, left: isHorizontal ? 10 : 45, bottom: 10 }}
        >
          <CartesianGrid vertical={isHorizontal} horizontal={!isHorizontal} stroke={CONFIG.gridStroke} strokeDasharray="0" strokeWidth={1} />
          {renderTooltip()}
          {renderLegend()}

          <XAxis
            type={isHorizontal ? "number" : "category"}
            dataKey={isHorizontal ? undefined : "UTYPLONGTEXT"}
            axisLine={false}
            tickLine={false}
            tick={CustomizedAxisTick}
          />
          <YAxis
            type={isHorizontal ? "category" : "number"}
            dataKey={isHorizontal ? "UTYPLONGTEXT" : undefined}
            axisLine={false}
            tickLine={false}
            width={isHorizontal ? 85 : 50}
            tick={CustomizedYAxisTick}
          />

          {[1, 2, 3, 4].map((num) => {
            const key = `COL${num}`;
            const isLast = props.stack === num.toString();
            if (num > parseInt(props.stack)) return null;

            return (
              <Bar
                key={key}
                dataKey={key}
                name={legendText(key)}
                stackId={!isComparison ? "a" : undefined}
                fill={COLORS[num - 1]}
                radius={!isComparison ? (isLast ? (isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]) : [0, 0, 0, 0]) : [6, 6, 0, 0]}
                maxBarSize={45} isAnimationActive={false}
                onClick={(d) => props.dialogueOpen(props.chartId, d.LIC_TYPE)}
              >
                <LabelList
                  dataKey={key}
                  content={!isComparison || isHorizontal ? undefined : renderCustomLabel}
                  position={!isComparison ? "center" : (isHorizontal ? "right" : "top")}
                  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''}
                  fill={!isComparison ? '#ffffff' : '#000000de'}
                  offset={8}
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    fontFamily: dynamicFont}}
                />
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const tableDataResult = useMemo(() => {
    if (!props.data || !props.chartHeader) return null;
    const filtered = props.data.filter(p => p.ZTYPE === props.chart);
    const header = props.chartHeader ? props.chartHeader.split(',') : [];

    const dataset = filtered.map(dt => {
      let tem = {};
      tem.COLUMN1 = dt.LIC_TYPE || dt.GROUPBY1 || dt.BNAME || "";
      tem.COLUMN2 = dt.UTYPLONGTEXT || dt.GROUP_DESC1 || dt.BNAME || dt.COL1 || "";
      tem.COUNT1 = dt.COL1 !== undefined ? dt.COL1 : dt.ZCOUNT1;
      tem.COUNT2 = dt.COL2 !== undefined ? dt.COL2 : dt.ZCOUNT2;
      tem.COUNT3 = dt.COL3 !== undefined ? dt.COL3 : dt.ZCOUNT3;
      tem.COUNT4 = dt.COL4 !== undefined ? dt.COL4 : dt.ZCOUNT4;
      return tem;
    });

    let keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2', 'COUNT3', 'COUNT4'];
    if (header.length === 2) keys = ['COLUMN1', 'COUNT1'];
    else if (header.length === 3) keys = ['COLUMN1', 'COLUMN2', 'COUNT1'];
    else if (header.length === 4) keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2'];
    else if (header.length === 5) keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2', 'COUNT3'];
    else if (header.length === 6) keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2', 'COUNT3', 'COUNT4'];

    return { header, keys, dataset };
  }, [props.data, props.chart, props.chartHeader, props.stack]);

  return (
    <div>
      <Card className={classes.root} elevation={0} style={{ height: '41vh' }}>
        <CardContent style={{ padding: '12px 12px 4px 12px', height: 'calc(100% - 44px)', display: 'flex', flexDirection: 'column' }}>
          <Box flex={1} width="100%" minHeight={0} display="flex" justifyContent="center" alignItems="center">
            {renderChart()}
          </Box>
        </CardContent>
        <CardActions style={{ height: '32px', minHeight: '32px', padding: '4px 12px', backgroundColor: 'transparent', borderTop: 'none' }}>
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
              {Number(chartState) === 1 ? (
                <ViewStreamIcon fontSize="small" style={{ color: '#f43f5e' }} />
              ) : (
                <BarChartIcon fontSize="small" style={{ color: '#f43f5e' }} />
              )}
              <ArrowDropDownIcon fontSize="small" style={{ color: '#64748b', marginLeft: 4 }} />
            </Box>

            <Box flex={1} textAlign="center" px={1}>
              <Typography
                className={classes.title}
                style={{
                  cursor: 'default',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = primaryColor}
                onMouseLeave={(e) => e.target.style.color = CONFIG.titleColor}
              >
                {props.name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
              </Typography>
            </Box>

            <IconButton size="small" onClick={() => setOpen(true)} style={{ color: '#64748b' }}>
              <TocIcon fontSize="small" />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              style: {
                borderRadius: '12px',
                marginTop: '-20px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                minWidth: '180px'
              }
            }}
          >
            <MenuItem onClick={() => selectChartType(3)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 3 ? '#2563eb' : '#000000de' }}>
              Vertical Bar
            </MenuItem>
            <MenuItem onClick={() => selectChartType(2)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 2 ? '#2563eb' : '#000000de' }}>
              Vertical Stacked Bar
            </MenuItem>
            <MenuItem onClick={() => selectChartType(1)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 1 ? '#2563eb' : '#000000de' }}>
              Horizontal Stacked Bar
            </MenuItem>
          </Menu>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        fullWidth={false}
        disableEnforceFocus
      >
        <DialogContent style={{ padding: '8px 24px !important', overflow: 'hidden' }}>
          {tableDataResult && (
            <ModernCommonTable
              name={props.name}
              data={tableDataResult.dataset}
              header={tableDataResult.header}
              keys={tableDataResult.keys}
              colors={dynamicColors}
              isTocGrid={true}
              onClose={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withRouter(LicenceStackGraphCard);



