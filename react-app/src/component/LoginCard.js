import React, { useState, useEffect } from 'react';
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
import SingleSelectDropDown from './SingleSelectDropDown'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import logo_icon from '../resources/auditbotlogo.PNG'
import Grid from '@material-ui/core/Grid';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const height = 100
const labelOffset = -6
const focused = 3

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        padding: 20,
        alignItems: "center",
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
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
    }
}));



const LoginCard = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(props.error);

    useEffect(() => {
        setOpen(props.error);
    }, [props])

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        console.log("closed")
    };

    return (
        <Card className={classes.root} elevation={5}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={logo_icon}
                    title="hello"
                />
            </CardActionArea>
            <CardActions style={{}}>
                <Grid container style={{ marginTop: 0, marginLeft: 20, marginRight: 20 }} spacing={0}>
                    <Grid item md={6} >
                        <SingleSelectDropDown values={props.systemValues} preSelected={props.systemPreSelected} changeEventCallBack={props.systemEventCallBack} label="System" />
                    </Grid>
                    <Grid item md={6} >
                        <SingleSelectDropDown values={props.clientValues} preSelected={props.clientPreSelected} changeEventCallBack={props.clientEventCallBack} label="Client" />
                    </Grid>
                </Grid>
            </CardActions>
            <CardActions style={{}}>
                <Grid container style={{ marginTop: 0, marginLeft: 20, marginRight: 20 }} spacing={0}>
                    <Grid item md={12} >
                        <TextField
                            id="outlined-password-input"
                            label="Username"
                            autoComplete="current-password"
                            variant="outlined"
                            InputProps={{ classes: { input: classes.resize } }}
                            style={{ width: '100%' }}
                            InputLabelProps={{
                                style: {
                                    height,
                                    ...(!focused && { top: `${labelOffset}px` }),
                                },
                            }}
                            onChange={(event) => props.onChangeUsername(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </CardActions>

            <CardActions style={{}}>
                <Grid container style={{ marginTop: 0, marginLeft: 20, marginRight: 20 }} spacing={0}>
                    <Grid item md={12} >
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            InputProps={{ classes: { input: classes.resize } }}
                            style={{ width: '100%' }}
                            onChange={(event) => props.onChangeOfPassword(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </CardActions>

            <CardActions style={{}}>
                <Grid container style={{ marginTop: 0, marginLeft: 20, marginRight: 20 }} spacing={0}>
                    <Button variant="contained" color="primary" style={{ marginLeft: '35%', backgroundColor: '#0098CF' }} onClick={() => { props.onLogin() }}>Login</Button>

                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            Sorry,Login failed Please check your credential
                        </Alert>
                    </Snackbar>

                </Grid>
            </CardActions>



        </Card>
    );

}

export default withRouter(LoginCard)