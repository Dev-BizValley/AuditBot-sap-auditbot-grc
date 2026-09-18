import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as action from '../Store/actions/index'
import ApplicationAppBar from '../component/ApplicationAppBar'
import { withRouter } from 'react-router-dom';
class HeaderContainer extends Component {

    componentDidMount() {
        this.props.authorization(this.props.token)
    }

    render() {
        console.log(this.props.pathname)
        return (
            <ApplicationAppBar isAuthenticated={this.props.isAuthenticated} username={this.props.username}
                pathname={this.props.pathname} onLogout={() => {
                    this.props.onLogout();
                    window.location.href = '/login';
                }}
                userauthorization={this.props.userauthorization}
            />

        )

    }

}

const mapStateToProps = state => {

    return {
        token: state.login.token,
        isAuthenticated: state.login.token !== null,
        username: state.login.username,
        pathname: state.sidebar.pathname,
        userauthorization: state.sidebar.userauthorization
    };
};

const mapDispatchTpProps = dispatch => {

    return {
        onLogout: () => dispatch(action.onLogout()),
        authorization: (token) => dispatch(action.authorization(token))
    };
}
export default connect(mapStateToProps, mapDispatchTpProps)(withRouter(HeaderContainer));

