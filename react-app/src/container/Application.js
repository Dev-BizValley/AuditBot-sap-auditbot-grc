import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as action from '../Store/actions/index'
import Login from './Login'
import Home from './Home'
import SideBar from './SideBar'
import Loader from '../component/Loader'

// New UI Imports


class Application extends Component {
  state = {
    isAuthenticated: false
  }
  constructor(props) {
    super(props);
    this.props.onTryAutoSignup();

  }

  componentDidMount() {


  }

  render() {


    let routes = (
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/*' component={Home} />
      </Switch>
    )



    // if ( ) {
    //   routes = (
    //     <Switch>
    //     <Route path='*' exact render={(props) =>  <Login/>}/>
    //     </Switch>
    //     )
    // }


    return (
      <Fragment>
        {(this.props.sidebarLoader || this.props.loginLoader || this.props.grcLoader || this.props.licenseLoader || this.props.controlLoader) ? <Loader /> : null}
        {routes}
      </Fragment>
    )

  }

}

const mapStateToProps = state => {

  return {
    token: state.login.token,
    isUserLogedIn: state.login.isUserLogedIn,
    error: state.login.error,
    systemConfig: state.login.systemConfig,
    isAuthenticated: state.login.token !== null,
    pathname: state.sidebar.pathname,
    sidebarLoader: state.sidebar.loader,
    loginLoader: state.login.loader,
    grcLoader: state.filter.loader,
    licenseLoader: state.licensefilter.loader,
    controlLoader: state.control.loader
  };
};

const mapDispatchTpProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState()),
  };
}
export default connect(mapStateToProps, mapDispatchTpProps)(Application);

