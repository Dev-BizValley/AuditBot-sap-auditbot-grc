import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const useStyles = makeStyles((theme) => ({
    root: {
  
  
      alignItems: "center",
      '& > * + *': {
        marginTop: theme.spacing(2),
      }
    },
    dialoguewidth:{
      maxWidth:'inherit'
    },
    media: {
      width: 300,
      height: 75,
      marginLeft: '5%'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    resize: {
      fontSize: 15,
      padding: '12px 14px'
    }, icon: {
      right: 0,
      height:20
    },
    rootSelect:{
      paddingLeft: '3px',
      paddingRight: '18px !important'
    }
  }));

const NivoVerticalBarGraph = (props) => {
    const classes = useStyles();
    return (
    <Card className={classes.root} elevation='5' style={{ height: "39vh"}}>
        <CardContent style={{padding: 5, marginRight: 5, height: '85%' }}>
    <ResponsiveBar
        data={props.data}
        keys={props.keys}
        layout={props.layout}
        groupMode={props.groupMode}
        indexBy={props.indexBy}
        margin={{ top: 20, right: 30, bottom: 40, left: 60 }}
        padding={0.3}
        colors={props.colors}
        colorBy={props.colorBy}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        // legends={[
        //     {
        //         dataFrom: 'keys',
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 120,
        //         translateY: 0,
        //         itemsSpacing: 2,
        //         itemWidth: 100,
        //         itemHeight: 20,
        //         itemDirection: 'left-to-right',
        //         itemOpacity: 0.85,
        //         symbolSize: 20,
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
    </CardContent>
    </Card>
    )
    }

export default NivoVerticalBarGraph