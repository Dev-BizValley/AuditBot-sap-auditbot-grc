import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getDynamicFont } from '../../theme';
import { Card, CardContent, CardActions, Typography, Grid, IconButton, Box, MenuItem, Dialog, DialogContent, DialogTitle, Paper, Menu } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import Draggable from 'react-draggable';
import TocIcon from '@material-ui/icons/Toc';
import CloseIcon from '@material-ui/icons/Close';
import BarChartIcon from '@material-ui/icons/BarChart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PieChartIcon from '@material-ui/icons/PieChart';
import ModernCommonTable from '../ModernCommonTable'
import SwitchComponent from './SwitchComponent'
// import { MENU_FONT_FAMILY } from '../../theme';

const RADIAN = Math.PI / 180;

const AXIS_TICK_CONFIG = {
  fontSize: 12,
  fontWeight: 400,
  fill: '#000000de',
};

// const CONFIG = {
//   cardHeight: '41vh',
//   fontFamily: MENU_FONT_FAMILY,
//   cardRadius: 18,
//   cardShadow: 'rgba(0, 0, 0, 0.1) 0px 30px 40px -2px, rgba(0, 0, 0, 0.1) 0px 6px 10px -2px',
//   hoverShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
//   borderColor: 'rgb(173, 177, 184)',
//   titleFontSize: '0.85rem',
//   titleColor: '#1e293b',
//   axisFontSize: 12,
//   axisTickColor: '#000000de',
//   gridStroke: '#cbd5e1',
//   tooltipBgColor: 'rgba(15, 23, 42, 0.95)',
//   tooltipTextColor: '#ffffff',
//   tooltipShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
//   labelFontSize: '0.65rem',
//   valueFontSize: '0.85rem',
//   letterSpacing: '0.01rem',
//   wordSpacing: '0.02rem',
//   labelColor: '#475569',
//   pieLabelColor: 'white',
//   tooltipLabelFontSize: '1rem',
//   tooltipValueFontSize: '1rem',
//   pieCenterValueFontSize: '1.75rem',
//   pieCenterLabelFontSize: '0.75rem',
//   legendFontSize: '12px',
//   barLabelFontSize: 11,
//   tooltipBg: 'rgba(15, 23, 42, 0.95)',
//   tooltipColor: '#ffffff'
// };
// Diverse & Balanced (No Blue Dominance - Each color is from a different hue)
// const COLORS = ["#ef4444", "#10b981", "#f97316", "#8b5cf6", "#eab308", "#2563eb", "#ec4899", "#06b6d4"];

// Option 1: High Contrast Mix
// const COLORS = ["#f72585", "#4cc9f0", "#7209b7", "#4361ee", "#ffbe0b", "#fb5607", "#06d6a0", "#118ab2"];

// Option 2: Professional Earth & Tech
// const COLORS = ["#ea580c", "#059669", "#1d4ed8", "#dc2626", "#7c3aed", "#ca8a04", "#0891b2", "#be185d"];

// Option 3: Ultra Diverse (Rainbow spread)
const COLORS = ["#2563eb", "#f97316", "#10b981", "#ef4444", "#8b5cf6", "#eab308", "#06b6d4", "#f43f5e"];

// Highly distinct colors starting with Blue, Orange, Green, Red, Purple, Yellow, Teal, Pink
// const COLORS = ["#2563eb", "#f97316", "#10b981", "#ef4444", "#8b5cf6", "#eab308", "#06b6d4", "#f43f5e"];



const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: (props) => `${props.config.cardRadius}px !important`,
    boxShadow: (props) => `${props.config.cardShadow} !important`,
    border: (props) => `2px solid ${props.config.borderColor}`,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      backgroundColor: (props) => `${(props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb'}05`,
      boxShadow: (props) => `${props.config.hoverShadow} !important`,
      borderColor: (props) => (props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb',
    }
  },
  titleLabel: {
    fontSize: '0.875rem',
    fontWeight: 700,
    color: (props) => props.config.titleColor,
    fontFamily: (props) => props.dynamicFont,
    transition: 'color 0.3s ease',
  },
  dialoguewidth: {
    maxWidth: 'inherit'
  },
  resize: {
    fontSize: 15,
    padding: '12px 14px'
  }, icon: {
    right: 0,
    height: 20
  }
}));


function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title">
      <Paper {...props} />
    </Draggable>
  );
}




/* #0288D1 */



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
          fontFamily: dynamicFont
        }}
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

const LicenceGraphCard = (props) => {

  const getLabelConfig = (data, dataKey, isStacked, isHorizontal) => {
    return {
      position: isStacked ? "center" : (isHorizontal ? "right" : "top"),
      fill: isStacked ? "#ffffff" : "#000000de"
    };
  };

  const dynamicColors = props.color || [];
  // primaryColor available via dynamicColors[0] if needed
  const dynamicFont = getDynamicFont(dynamicColors);
  const SAP_COLORS = (dynamicColors.length >= 8) ? dynamicColors.slice(0, 16) : COLORS;

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

  const CONFIG = React.useMemo(() => ({
    cardHeight: '41vh',
    // fontFamily: MENU_FONT_FAMILY,
    fontFamily: dynamicFont,
    cardRadius: 18,
    cardShadow: 'rgba(0, 0, 0, 0.1) 0px 30px 40px -2px, rgba(0, 0, 0, 0.1) 0px 6px 10px -2px',
    hoverShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
    borderColor: 'rgb(173, 177, 184)',
    titleFontSize: '0.85rem',
    titleColor: '#1e293b',
    axisFontSize: 12,
    axisTickColor: '#000000de',
    gridStroke: '#cbd5e1',
    tooltipBgColor: 'rgba(15, 23, 42, 0.95)',
    tooltipTextColor: '#ffffff',
    tooltipShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    labelFontSize: '0.65rem',
    valueFontSize: '0.85rem',
    letterSpacing: '0.01rem',
    wordSpacing: '0.02rem',
    labelColor: '#475569',
    pieLabelColor: 'white',
    tooltipLabelFontSize: '11px',
    tooltipValueFontSize: '11px',
    pieCenterValueFontSize: '1.75rem',
    pieCenterLabelFontSize: '0.75rem',
    legendFontSize: '12px',
    barLabelFontSize: 11,
    tooltipBg: 'rgba(15, 23, 42, 0.95)',
    tooltipColor: '#ffffff'
  }), [dynamicFont]);

  const proesResultData = (data, key) => {
    if (data && data !== null && data.length > 0) {
      let filtereddata = data.filter(p => p.ZTYPE === key)

      let mappedData = [];
      filtereddata.forEach(v => {
        let temp = {};
        temp.name = v.GROUP_DESC1;
        temp.GROUP_DESC1 = v.GROUP_DESC1;
        temp.ZCOUNT1 = v.ZCOUNT1;
        temp.ZCOUNT2 = v.ZCOUNT2;
        temp.ZCOUNT3 = v.ZCOUNT3;
        temp.ZCOUNT = v.ZCOUNT;
        temp.ZTYPE = v.ZTYPE;
        temp.GROUPBY1 = v.GROUPBY1;
        // Preserve COL-based fields for stacked/cost-count charts
        temp.COL1 = v.COL1;
        temp.COL2 = v.COL2;
        temp.COL3 = v.COL3;
        temp.COL4 = v.COL4;
        temp.UTYPLONGTEXT = v.UTYPLONGTEXT;
        temp.LIC_TYPE = v.LIC_TYPE;
        temp.REC = v.REC;
        mappedData.push(temp);
      })
      return mappedData;
    }
    return [];
  };

  const legendText = (val) => {
    // Chart legend labels - fixed labels for stacked bar series
    const chartLegendLabels = { COL1: 'Purchased', COL2: 'Recommended', COL3: 'Additional/Excess', COL4: 'Unused', ZCOUNT: 'Count', ZCOUNT1: 'Count' };
    return chartLegendLabels[val] || val;
  };

  const legendTextForCostAndCount = (val) => {
    // Fixed labels for cost/count toggle charts (SEC333)
    const labels = { COL1: 'Count', COL2: 'Count (Percentage)', COL3: 'Cost', COL4: 'Cost (Percentage)' };
    return labels[val] || val;
  };

  const tooltipText = (value, name) => {
    return [value, legendText(name)];
  };

  const getChart = (data, value, color, chartId) => {
    switch (value) {
      case 1:
        if (props.chartId === 'SEC444') {
          return getRCVBarChartNoAction(data, color);
        }
        return getRCVBarChart(data, color);
      case 2:
        return getPiChart(data)
      case 3:
        if (props.chartId === 'SEC444') {
          return getPiCustomChartNoAction(data, color);
        }
        return getPiCustomChart(data)
      case 4:
        if (props.chartId === 'SEC444') {
          return getRCHBarChartNoAction(data, color);
        }
        return getRCHBarChart(data, color);
      case 5:
        if (props.chartId === 'SEC333') {
          return getCostCountRCVBarChart(data, color);
        }
        return getRCVBarChartTwoStack(data, color);
      case 6:
        if (props.chartId === 'SEC333') {
          return getCostCountRCBBarChart(data, color);
        }
        return getRCHBarChartTwoStack(data, color);
      case 7:
        if (props.chartId === 'SEC333') {
          return getCostCountRCHBarChart(data, color);
        }
        return getRCVBarChartThree(data, color);
      default:
        return getRCVBarChart(data, color)
    }
  }

  const getRCVBarChart = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%"
      layout={"horizontal"}
      data={data}

      margin={{
        top: 25, right: 30, left: 30, bottom: 20,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} stroke={CONFIG.gridStroke} strokeWidth={1} />
      <XAxis axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} dataKey="GROUP_DESC1" interval={0} tick={CustomizedAxisTick} />
      <YAxis width={80} axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} dataKey="ZCOUNT1" interval={0} tick={CustomizedYAxisTick} />
      <Tooltip offset={70} wrapperStyle={{ pointerEvents: 'none' }}
        cursor={{ fill: '#f8fafc' }}
        contentStyle={{
          borderRadius: '12px',
          border: 'none',
          boxShadow: CONFIG.tooltipShadow,
          fontFamily: dynamicFont,
          fontSize: CONFIG.tooltipValueFontSize,
          backgroundColor: CONFIG.tooltipBgColor
        }}
        labelStyle={{ fontSize: CONFIG.tooltipLabelFontSize, fontWeight: 700, color: '#000000de', marginBottom: '4px' }}
      />
      <Bar dataKey="ZCOUNT1" radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false} onClick={(data) => getData(data)} >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} />)
        }
        {(() => {
        const config = getLabelConfig(data || [], "ZCOUNT1", false, false);
        return <LabelList dataKey="ZCOUNT1" content={renderCustomLabel} position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
      </Bar>
    </BarChart></ResponsiveContainer>);
  }




  const getRCVBarChartNoAction = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%"
      layout={"horizontal"}
      data={data}

      margin={{
        top: 20, right: 30, left: 0, bottom: 17,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} stroke={CONFIG.gridStroke} strokeWidth={2} />
      <XAxis axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} dataKey="GROUP_DESC1" interval={0} stroke="#bdbdbd" tick={CustomizedAxisTick} />
      <YAxis width={70} axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} dataKey="ZCOUNT1" interval={0} stroke="#bdbdbd" tick={CustomizedYAxisTick} />
      <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: CONFIG.tooltipShadow, fontFamily: dynamicFont, fontSize: CONFIG.tooltipValueFontSize, backgroundColor: CONFIG.tooltipBgColor, color: CONFIG.tooltipTextColor, backdropFilter: 'blur(8px)' }} labelStyle={{ fontSize: CONFIG.tooltipLabelFontSize, fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }} />
      <Bar dataKey="ZCOUNT1" fill={'#00bcd4'} radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false} >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} />)
        }
        {(() => {
        const config = getLabelConfig(data || [], "ZCOUNT1", false, false);
        return <LabelList dataKey="ZCOUNT1" content={renderCustomLabel} position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
      </Bar>
    </BarChart></ResponsiveContainer>)
  }



  const CustomizedAxisTick = ({
    x, y, stroke, payload,
  }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={10} textAnchor="middle" fontSize={AXIS_TICK_CONFIG.fontSize} fill={AXIS_TICK_CONFIG.fill} fontWeight={AXIS_TICK_CONFIG.fontWeight} fontFamily={dynamicFont}>{payload.value}</text>
      </g>
    );
  }

  const CustomizedYAxisTick = ({
    x, y, stroke, payload,
  }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={0} dx={-10} textAnchor="end" fontSize={AXIS_TICK_CONFIG.fontSize} fill={AXIS_TICK_CONFIG.fill} fontWeight={AXIS_TICK_CONFIG.fontWeight} fontFamily={dynamicFont}>{payload.value}</text>
      </g>
    );
  }



  const getPiChart = (data) => {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx="42%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="85%"
            dataKey="ZCOUNT1"
            onClick={(data) => getData(data)}
          >
            {
              data.map((entry, index) => <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="#fff"
              strokeWidth={2}
            />)
            }

          </Pie>
          <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: CONFIG.tooltipShadow, fontFamily: dynamicFont, fontSize: CONFIG.tooltipValueFontSize, backgroundColor: CONFIG.tooltipBgColor, color: CONFIG.tooltipTextColor, backdropFilter: 'blur(8px)' }} labelStyle={{ fontSize: CONFIG.tooltipLabelFontSize, fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }} />
          <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={10} width={120} height={90} margin={{ top: 0, left: 20, right: 0, bottom: 0 }} wrapperStyle={{
            paddingLeft: "10px", fontFamily: dynamicFont, fontSize: '12px', lineHeight: '1em', color: 'black', textTransform: 'capitalize'
          }} />
        </PieChart>
      </ResponsiveContainer>)
  }
  const onPieEnter = (data, index) => {
    setActiveIndex(index)
  };

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill={CONFIG.pieLabelColor} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontFamily={dynamicFont} fontSize={CONFIG.labelFontSize}>
        {value}
      </text>
    );
  };

  const getPiCustomChart = (data) => {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart >
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="48%"
            outerRadius="85%"
            dataKey="ZCOUNT1"
            onMouseEnter={onPieEnter}
            onClick={(data) => getData(data)}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} stroke={'white'} />)
            }
          </Pie>
        </PieChart></ResponsiveContainer>)
  }


  const getPiCustomChartNoAction = (data) => {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart >
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="48%"
            outerRadius="85%"
            dataKey="ZCOUNT1"
            onMouseEnter={onPieEnter}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} stroke={'white'} />)
            }
          </Pie>
        </PieChart></ResponsiveContainer>)
  }


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
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{ fontSize: '16px', fontWeight: 400, fontFamily: dynamicFont }}>{payload.ZCOUNT1}</text>
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
        <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} angle={-45} fontSize={12} textAnchor={textAnchor} fill={fill} fontFamily={dynamicFont}>{`${payload.GROUP_DESC1}`}</text>
      </g>
    );
  };


  const getRCHBarChart = (data, color) => {

    return (<ResponsiveContainer width='100%' height='100%'>
      <BarChart barGap={4} barCategoryGap="5%"
        layout={"vertical"}
        data={data}

        margin={{
          top: 25, right: 30, left: 10, bottom: 20,
        }}
      >
        <CartesianGrid vertical={true} horizontal={false} stroke={CONFIG.gridStroke} strokeWidth={2} />
        <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />        <XAxis type='number' axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} dataKey="ZCOUNT1" stroke="#bdbdbd" interval={0} tick={CustomizedAxisTick} />
        <YAxis type="category" axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} dataKey="GROUP_DESC1" stroke="#bdbdbd" width={130} interval={0} tick={CustomizedYAxisTick} />
        <Bar dataKey="ZCOUNT1" fill={'#48C9B0'} radius={[0, 8, 8, 0]} maxBarSize={45} isAnimationActive={false} onClick={(data) => getData(data)}>
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} />)
          }
          {(() => {
        const config = getLabelConfig(data || [], "ZCOUNT1", false, true);
        return <LabelList dataKey="ZCOUNT1" position={config.position} fill={config.fill} style={{fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
        </Bar>
      </BarChart></ResponsiveContainer>)
  }



  const getRCHBarChartNoAction = (data, color) => {

    return (<ResponsiveContainer width='100%' height='100%'>
      <BarChart barGap={4} barCategoryGap="5%"
        layout={"vertical"}
        data={data}

        margin={{
          top: 25, right: 30, left: 10, bottom: 20,
        }}
      >
        <CartesianGrid vertical={true} horizontal={false} stroke="#e2e8f0" strokeWidth={2} />
        <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />        <XAxis type='number' axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} dataKey="ZCOUNT1" stroke="#bdbdbd" interval={0} tick={CustomizedAxisTick} />
        <YAxis type="category" axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} dataKey="GROUP_DESC1" stroke="#bdbdbd" width={130} interval={0} tick={CustomizedYAxisTick} />
        <Bar dataKey="ZCOUNT1" fill={'#48C9B0'} radius={[0, 8, 8, 0]} maxBarSize={45} isAnimationActive={false}>
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} />)
          }
          {(() => {
        const config = getLabelConfig(data || [], "ZCOUNT1", false, true);
        return <LabelList dataKey="ZCOUNT1" position={config.position} fill={config.fill} style={{fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
        </Bar>
      </BarChart></ResponsiveContainer>)
  }




  const getRCVBarChartTwoStack = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%"
      layout={"horizontal"}
      data={data}

      margin={{
        top: 25, right: 30, left: 10, bottom: 20,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} stroke="#e2e8f0" strokeWidth={2} />
      <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
      <Legend iconSize={12} align='center' layout='horizontal' verticalAlign='top' height={35} wrapperStyle={{ fontFamily: dynamicFont, fontSize: '12px', fontWeight: 400, color: '#000000de', textTransform: 'capitalize' }} formatter={(value) => legendText(value)} />
      <XAxis axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} dataKey="UTYPLONGTEXT" interval={0} stroke="#bdbdbd" tick={CustomizedAxisTick} />
      <YAxis width={70} axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} interval={0} stroke="#bdbdbd" tick={CustomizedYAxisTick} />
      <Bar dataKey="ZCOUNT" name={legendText("ZCOUNT")} fill={props.color ? props.color[0] : '#2563eb'} radius={[6, 6, 0, 0]} maxBarSize={45} isAnimationActive={false} onClick={(data) => getData(data)} >
        {(() => {
        const config = getLabelConfig(data || [], "ZCOUNT", false, false);
        return <LabelList dataKey="ZCOUNT" content={renderCustomLabel} position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
      </Bar>
      <Bar dataKey="COL2" name={legendText("COL2")} stackId="a" fill={colorState[1]} radius={[0, 0, 0, 0]} maxBarSize={45} isAnimationActive={false} onClick={(data) => getData(data)} >
        {(() => {
        const config = getLabelConfig(data || [], "COL2", true, false);
        return <LabelList dataKey="COL2" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
      </Bar>
    </BarChart></ResponsiveContainer>)
  }









  const getCostCountRCVBarChart = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%"
      layout={"horizontal"}
      data={data}

      margin={{
        top: 25, right: 30, left: 10, bottom: 20,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} stroke={CONFIG.gridStroke} strokeWidth={1} />
      <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
      <Legend iconSize={12} align='center' layout='horizontal' verticalAlign='top' height={35} wrapperStyle={{ fontFamily: dynamicFont, fontSize: '12px', fontWeight: 400, color: '#000000de', textTransform: 'capitalize' }} />
      <XAxis axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} dataKey="UTYPLONGTEXT" interval={0} stroke="#bdbdbd" tick={CustomizedAxisTick} />
      <YAxis width={80} axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} interval={0} stroke="#bdbdbd" tick={CustomizedYAxisTick} />
      {costOrCount === 2 ?
        <Bar dataKey="COL3" name={legendTextForCostAndCount("COL3")} fill={colorState[0]} radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false} >

          {(() => {
        const config = getLabelConfig(data || [], "COL3", false, false);
        return <LabelList dataKey="COL3" content={renderCustomLabel} position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
        </Bar> : null
      }

      {costOrCount === 2 ?
        <Bar dataKey="COL4" name={legendTextForCostAndCount("COL4")} fill={colorState[1]} radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false} >

          {(() => {
        const config = getLabelConfig(data || [], "COL4", false, false);
        return <LabelList dataKey="COL4" content={renderCustomLabel} position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
        </Bar> : null
      }
      {costOrCount === 1 ?
        <Bar dataKey="COL1" name={legendTextForCostAndCount("COL1")} fill={colorState[0]} radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false} >

          {(() => {
        const config = getLabelConfig(data || [], "COL1", false, false);
        return <LabelList dataKey="COL1" content={renderCustomLabel} position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
        </Bar> : null
      }
      {costOrCount === 1 ?
        <Bar dataKey="COL2" name={legendTextForCostAndCount("COL2")} fill={colorState[1]} radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false}  >

          {(() => {
        const config = getLabelConfig(data || [], "COL2", false, false);
        return <LabelList dataKey="COL2" content={renderCustomLabel} position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
        </Bar> : null}
    </BarChart></ResponsiveContainer>)
  }


  const getRCVBarChartThree = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%"
      layout={"horizontal"}
      data={data}

      margin={{
        top: 25, right: 30, left: 10, bottom: 20,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} stroke={CONFIG.gridStroke} strokeWidth={1} />
      <Legend iconSize={12} align='center' layout='horizontal' verticalAlign='top' height={35} wrapperStyle={{ fontFamily: dynamicFont, fontSize: '12px', fontWeight: 400, color: '#000000de', textTransform: 'capitalize' }} formatter={(value, entry, index) => legendText(value)} />
      <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
      <XAxis axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} dataKey="UTYPLONGTEXT" interval={0} stroke="#bdbdbd" tick={CustomizedAxisTick} />
      <YAxis width={80} axisLine={{ stroke: CONFIG.gridStroke, strokeWidth: 2 }} tickLine={false} interval={0} stroke="#bdbdbd" tick={CustomizedYAxisTick} />
      <Bar dataKey="ZCOUNT" name={legendText("ZCOUNT")} fill={props.color ? props.color[0] : '#2563eb'} radius={[0, 6, 6, 0]} maxBarSize={45} isAnimationActive={false} onClick={(data) => getData(data)} >
        {(() => {
        const config = getLabelConfig(data || [], "ZCOUNT", false, true);
        return <LabelList dataKey="ZCOUNT" position={config.position} fill={config.fill} style={{fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
      </Bar>
      <Bar dataKey="COL2" name={legendText("COL2")} fill={colorState[1]} radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false} onClick={(data) => getData(data)} >
        {(() => {
        const config = getLabelConfig(data || [], "COL2", true, false);
        return <LabelList dataKey="COL2" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
      </Bar>
      {/*<Bar dataKey="ZCOUNT3"  fill={colorState[2]} onClick={(data) => getData(data)} >
        {(() => {
        const config = getLabelConfig(data || [], "ZCOUNT3", true, false);
        return <LabelList dataKey="ZCOUNT3" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400,}} offset={8} />;
    })()}
      </Bar>
      <Bar dataKey="ZCOUNT1" stackId="a" fill={'#00bcd4'} onClick={(data) => getData(data)} >
                  {
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSFIRSTSTACK[index % COLORSFIRSTSTACK.length]} />)
                  }
              </Bar>
              <Bar dataKey="ZCOUNT2"  stackId="a" fill={'#00bcd4'} onClick={(data) => getData(data)} >
                  {
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSSECONDSTACK[index % COLORSSECONDSTACK.length]} />)
                  }
              </Bar>
              <Bar dataKey="ZCOUNT3" stackId="a" fill={'#00bcd4'} onClick={(data) => getData(data)} >
                  {
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSTHIRDSTACK[index % COLORSTHIRDSTACK.length]} />)
                  }
              </Bar> */}
    </BarChart></ResponsiveContainer>)
  }
  const getRCHBarChartTwoStack = (data, color) => {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart barGap={4} barCategoryGap="5%"
          layout={"vertical"}
          data={data}

          margin={{ top: 25, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid vertical={true} horizontal={false} stroke={CONFIG.gridStroke} strokeWidth={1} />
          <Legend iconSize={12} align='center' layout='horizontal' verticalAlign='top' height={35} wrapperStyle={{ fontFamily: dynamicFont, fontSize: '12px', fontWeight: 400, color: '#000000de', textTransform: 'capitalize' }} formatter={(value) => legendText(value)} />
          <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
          <XAxis type='number' axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} stroke="#bdbdbd" interval={0} tick={CustomizedAxisTick} />
          <YAxis width={130} dataKey="UTYPLONGTEXT" type="category" axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} stroke="#bdbdbd" interval={0} tick={CustomizedYAxisTick} />
          <Bar dataKey="COL1" name={legendText("COL1")} stackId="a" fill={colorState[0]} radius={[0, 0, 0, 0]} maxBarSize={45} isAnimationActive={false} onClick={(data) => getData(data)}>
            {(() => {
        const config = getLabelConfig(data || [], "COL1", true, false);
        return <LabelList dataKey="COL1" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
          </Bar>
          <Bar dataKey="COL2" name={legendText("COL2")} stackId="a" fill={colorState[1]} radius={[0, 8, 8, 0]} maxBarSize={45} isAnimationActive={false} onClick={(data) => getData(data)}>
            {(() => {
        const config = getLabelConfig(data || [], "COL2", true, false);
        return <LabelList dataKey="COL2" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  const getCostCountRCBBarChart = (data, color) => {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart barGap={4} barCategoryGap="5%"
          layout={"vertical"}
          data={data}

          margin={{ top: 25, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid vertical={true} horizontal={false} stroke={CONFIG.gridStroke} strokeWidth={1} />
          <Legend iconSize={12} align='center' layout='horizontal' verticalAlign='top' height={35} wrapperStyle={{ fontFamily: dynamicFont, fontSize: '12px', fontWeight: 400, color: '#000000de', textTransform: 'capitalize' }} />
          <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
          <XAxis type='number' axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} stroke="#bdbdbd" interval={0} tick={CustomizedAxisTick} />
          <YAxis width={130} dataKey="UTYPLONGTEXT" type="category" axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} stroke="#bdbdbd" interval={0} tick={CustomizedYAxisTick} />
          {costOrCount === 2 ? (
            <Bar dataKey="COL3" name={legendTextForCostAndCount("COL3")} stackId="a" fill={colorState[0]} radius={[0, 0, 0, 0]} maxBarSize={45} isAnimationActive={false}>
              {(() => {
        const config = getLabelConfig(data || [], "COL3", true, false);
        return <LabelList dataKey="COL3" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
            </Bar>
          ) : null}
          {costOrCount === 2 ? (
            <Bar dataKey="COL4" name={legendTextForCostAndCount("COL4")} stackId="a" fill={colorState[1]} radius={[0, 8, 8, 0]} maxBarSize={45} isAnimationActive={false}>
              {(() => {
        const config = getLabelConfig(data || [], "COL4", true, false);
        return <LabelList dataKey="COL4" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
            </Bar>
          ) : null}
          {costOrCount === 1 ? (
            <Bar dataKey="COL1" name={legendTextForCostAndCount("COL1")} stackId="a" fill={colorState[0]} radius={[0, 0, 0, 0]} maxBarSize={45} isAnimationActive={false}>
              {(() => {
        const config = getLabelConfig(data || [], "COL1", true, false);
        return <LabelList dataKey="COL1" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
            </Bar>
          ) : null}
          {costOrCount === 1 ? (
            <Bar dataKey="COL2" name={legendTextForCostAndCount("COL2")} stackId="a" fill={colorState[1]} radius={[0, 8, 8, 0]} maxBarSize={45} isAnimationActive={false}>
              {(() => {
        const config = getLabelConfig(data || [], "COL2", true, false);
        return <LabelList dataKey="COL2" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
            </Bar>
          ) : null}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  const getCostCountRCHBarChart = (data, color) => {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart barGap={4} barCategoryGap="5%"
          layout={"horizontal"}
          data={data}

          margin={{ top: 25, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid vertical={false} horizontal={true} stroke={CONFIG.gridStroke} strokeWidth={1} />
          <Legend iconSize={12} align='center' layout='horizontal' verticalAlign='top' height={35} wrapperStyle={{ fontFamily: dynamicFont, fontSize: '12px', fontWeight: 400, color: '#000000de', textTransform: 'capitalize' }} />
          <Tooltip offset={40} wrapperStyle={{ pointerEvents: 'none' }} content={<CustomTooltip dynamicFont={dynamicFont} />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
          <XAxis axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} dataKey="UTYPLONGTEXT" interval={0} type="category" stroke="#bdbdbd" tick={CustomizedAxisTick} />
          <YAxis width={80} axisLine={{ stroke: '#e2e8f0', strokeWidth: 2 }} tickLine={false} interval={0} stroke="#bdbdbd" tick={CustomizedYAxisTick} />
          {costOrCount === 2 ? (
            <Bar dataKey="COL3" name={legendTextForCostAndCount("COL3")} stackId="a" fill={colorState[0]} radius={[0, 0, 0, 0]} maxBarSize={45} isAnimationActive={false}>
              {(() => {
        const config = getLabelConfig(data || [], "COL3", true, false);
        return <LabelList dataKey="COL3" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
            </Bar>
          ) : null}
          {costOrCount === 2 ? (
            <Bar dataKey="COL4" name={legendTextForCostAndCount("COL4")} stackId="a" fill={colorState[1]} radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false}>
              {(() => {
        const config = getLabelConfig(data || [], "COL4", true, false);
        return <LabelList dataKey="COL4" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
            </Bar>
          ) : null}
          {costOrCount === 1 ? (
            <Bar dataKey="COL1" name={legendTextForCostAndCount("COL1")} stackId="a" fill={colorState[0]} radius={[0, 0, 0, 0]} maxBarSize={45} isAnimationActive={false}>
              {(() => {
        const config = getLabelConfig(data || [], "COL1", true, false);
        return <LabelList dataKey="COL1" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
            </Bar>
          ) : null}
          {costOrCount === 1 ? (
            <Bar dataKey="COL2" name={legendTextForCostAndCount("COL2")} stackId="a" fill={colorState[1]} radius={[8, 8, 0, 0]} maxBarSize={45} isAnimationActive={false}>
              {(() => {
        const config = getLabelConfig(data || [], "COL2", true, false);
        return <LabelList dataKey="COL2" position={config.position} fill={config.fill} style={{textAnchor: 'middle', fontSize: 11, fontWeight: 400, fontFamily: dynamicFont }} offset={8} />;
    })()}
            </Bar>
          ) : null}
        </BarChart>
      </ResponsiveContainer>
    );
  }



  const changecostcount = () => {

    if (costOrCount === 1) {
      setCostOrCount(2)
    } else {
      setCostOrCount(1)
    }
  }

  // Removed old legendTextForCostAndCount definition




  const getTableHeader = (data, key, stack, headerdata) => {
    if (data === undefined || data === null || data.length < 1) {
      return []
    }

    let filtereddata = data.filter(p => p.ZTYPE === key);
    if (filtereddata.length < 1) {
      return []
    }

    let header = headerdata ? headerdata.split(',') : [];

    let dataset2 = filtereddata.map(dt => {
      let tem = {};
      tem.COLUMN1 = dt.LIC_TYPE || dt.GROUPBY1 || dt.BNAME || "";
      tem.COLUMN2 = dt.UTYPLONGTEXT || dt.GROUP_DESC1 || dt.BNAME || dt.COL1 || "";
      tem.COUNT1 = dt.ZCOUNT1 !== undefined ? dt.ZCOUNT1 : dt.COL1;
      tem.COUNT2 = dt.ZCOUNT2 !== undefined ? dt.ZCOUNT2 : dt.COL2;
      tem.COUNT3 = dt.ZCOUNT3 !== undefined ? dt.ZCOUNT3 : dt.COL3;
      tem.COUNT4 = dt.ZCOUNT4 !== undefined ? dt.ZCOUNT4 : dt.COL4;
      return tem;
    });

    let keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2', 'COUNT3', 'COUNT4'];
    if (header.length === 2) keys = ['COLUMN1', 'COUNT1'];
    else if (header.length === 3) keys = ['COLUMN1', 'COLUMN2', 'COUNT1'];
    else if (header.length === 4) keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2'];
    else if (header.length === 5) keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2', 'COUNT3'];
    else if (header.length === 6) keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2', 'COUNT3', 'COUNT4'];

    return [header, keys, dataset2];
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let getData = (data) => {
    props.dialogueOpen(props.chartId, stack ? data.LIC_TYPE : data.GROUPBY1)
  }


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

  const classes = useStyles({ ...props, dynamicFont, config: CONFIG });
  const [chartState, setChartState] = useState(props.chartType);
  const [activeIndex, setActiveIndex] = useState(0);
  const [costOrCount, setCostOrCount] = useState(1);
  const [stack] = useState(props.stack ? props.stack : false);
  const [open, setOpen] = React.useState(false);
  const [colorState, setColorState] = useState([...COLORS]);
  let getchartDataResult1 = proesResultData(props.data, props.chart);
  let tableData = getTableHeader(props.data, props.chart, props.stack, props.chartHeader)
  let firctChart = getchartDataResult1.length > 0 ? getChart(getchartDataResult1, chartState, '#00bcd4', props.chartId) : <Typography variant="subtitle2" color="inherit">
    No Records found
  </Typography>
  useEffect(() => {
    // Dynamically update color state based on SAP response or fallback
    setColorState([...SAP_COLORS]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.color]);

  return (
    <div>
      <Card className={classes.root} elevation={0} style={{ height: CONFIG.cardHeight }}>
        <CardContent style={{ padding: '12px 12px 4px 12px', height: 'calc(100% - 44px)', display: 'flex', flexDirection: 'column' }}>
          <Box flex={1} width="100%" minHeight={0} display="flex" justifyContent="center" alignItems="center">
            {firctChart}
          </Box>
        </CardContent>
        {getchartDataResult1.length > 0 ?
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
                {chartState === 3 ? (
                  <PieChartIcon fontSize="small" style={{ color: (props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb' }} />
                ) : (
                  <BarChartIcon fontSize="small" style={{ color: (props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb' }} />
                )}
                <ArrowDropDownIcon fontSize="small" style={{ color: '#64748b', marginLeft: 4 }} />
              </Box>

              <Box flex={1} textAlign="center" px={1}>
                <Typography
                  className={classes.titleLabel}
                  style={{
                    cursor: 'default',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = (props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb'}
                  onMouseLeave={(e) => e.target.style.color = CONFIG.titleColor}
                >
                  {props.name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
                </Typography>
              </Box>

              {/* Cost/Count Toggle */}
              {(props.chartId === 'SEC333' || props.chartId === 'SEC33' || stack) && (
                <Box mr={1}>
                  <SwitchComponent
                    val={costOrCount === 2}
                    onToggle={changecostcount}
                    label1="Count"
                    label2="Cost"
                    colors={colorState}
                    style={{
                      transform: 'scale(0.8)',
                      transformOrigin: 'right center'
                    }}
                  />
                </Box>
              )}

              <IconButton size="small" onClick={handleClickOpen} style={{ color: '#64748b' }}>
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
                  marginTop: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  minWidth: '180px'
                }
              }}
            >
              {stack ? (
                props.chartId === 'SEC333' ? (
                  [
                    <MenuItem key="vbar" onClick={() => selectChartType(5)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 5 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                      Vertical Bar
                    </MenuItem>,
                    <MenuItem key="vstack" onClick={() => selectChartType(7)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 7 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                      Vertical Stacked Bar
                    </MenuItem>,
                    <MenuItem key="hstack" onClick={() => selectChartType(6)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 6 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                      Horizontal Stacked Bar
                    </MenuItem>
                  ]
                ) : (
                  [
                    <MenuItem key="vbar" onClick={() => selectChartType(1)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 1 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                      Vertical Bar
                    </MenuItem>,
                    <MenuItem key="vstack" onClick={() => selectChartType(5)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 5 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                      Vertical Stacked Bar
                    </MenuItem>,
                    <MenuItem key="hstack" onClick={() => selectChartType(6)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 6 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                      Horizontal Stacked Bar
                    </MenuItem>
                  ]
                )
              ) : (
                [
                  <MenuItem key="vbar" onClick={() => selectChartType(1)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 1 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                    Vertical Bar
                  </MenuItem>,
                  <MenuItem key="hbar" onClick={() => selectChartType(4)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 4 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                    Horizontal Bar
                  </MenuItem>,
                  <MenuItem key="donut" onClick={() => selectChartType(3)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: chartState === 3 ? ((props.color && props.color[0]) || (props.colors && props.colors[0]) || '#2563eb') : '#475569' }}>
                    Donut Chart
                  </MenuItem>
                ]
              )}
            </Menu>
          </CardActions>
          : null}

      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="lg"
        fullWidth={false}
        disableEnforceFocus
      >
        <DialogContent style={{ padding: '8px 24px !important', overflow: 'hidden' }}>
          <ModernCommonTable
            name={props.name}
            data={tableData[2]}
            header={tableData[0]}
            keys={tableData[1]}
            colors={dynamicColors}
            isTocGrid={true}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );

}

export default withRouter(LicenceGraphCard)
