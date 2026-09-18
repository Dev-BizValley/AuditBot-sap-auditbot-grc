//this is the middleware between react component and reducer using redux-thunk
//each function will dispatch to reducer by doing some work

import * as actionType from './actionsType';
import axios from 'axios';

export const login = (token, username) => {
  let inTime = new Date();
  let time = inTime.getDate() + '-' + inTime.getMonth() + '-' + inTime.getFullYear() + " " + inTime.getHours() + ':' + inTime.getMinutes() + ':' + inTime.getSeconds()
  return {
    type: actionType.LOGIN,
    isUserLogedIn: true,
    username: username,
    token: token,
    client: null,
    language: null,
    appserver: null,
    instnumber: null,
    intime: time
  };
}

export const loginerror = () => {
  return {
    type: actionType.LOGINERROR
  };
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  return {
    type: actionType.LOGOUT,
  };

}

export const defaultData = (data) => {
  let keys = Object.keys(data);
  let selectedClientdata = data[keys[0]][0]
  let systemConf = { systemConf: data, selectedIP: selectedClientdata.ipAddress, selectedClient: selectedClientdata.client, selectedSys: selectedClientdata.sysId, selectedinstanse: selectedClientdata.instanse }

  return {
    type: actionType.SETDEFAULTDATA, systemConfig: systemConf
  };
}



export const onLogin = ({ username, password, system, client, ip, instanse, loginCallBack }) => {

  return dispatch => {
    dispatch({ type: actionType.CHANGE_LOGIN_LOADER, data: true });
    axios.post('/token', {
      userName: username,
      password: password,
      system: system, 
      client: client,
      host: ip,
      instance: instanse
    }, { 'Access-Control-Allow-Origin': '*' }) 
      .then(async response => {
        dispatch({ type: actionType.CHANGE_LOGIN_LOADER, data: false });
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.userName)
        dispatch(login(response.data.token, response.data.userName));
        console.log('Before Route');
        loginCallBack(true)
      })
      .catch(error => {
        dispatch({ type: actionType.CHANGE_LOGIN_LOADER, data: false });
        console.log(error)
        dispatch(loginerror());
        loginCallBack(false)
      });
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const username = localStorage.getItem('username');
      dispatch(login(token, username));
    }
  }
};

export const onLogout = () => {
  return dispatch => {
    dispatch(logout())
    dispatch({ type: actionType.CLEAR_RESULT })
  }
}

export const fetchDefaultData = () => {
  return dispatch => {
    axios.get('/token')
      .then(response => {
        dispatch(defaultData(response.data));
      })
      .catch(error => {
        dispatch(loginerror());
      });
  }
}


export const onchangeSystem = (value, data) => {
  let clientData = data.systemConf[value][0]

  return dispatch => {
    dispatch({ type: actionType.CHANGESYSTEM, system: value, client: clientData.client, ip: clientData.ipAddress, instanse: clientData.instanse })
  }
}

export const onchangeClient = (client, ip, instanse) => {
  return dispatch => {
    dispatch({ type: actionType.CHANGECLIENT, client: client, ip: ip, instanse: instanse })
  }
}

export const onchangeUserName = (value) => {
  return dispatch => {
    dispatch({ type: actionType.CHANGEUSERNAME, value: value })
  }
}


export const onchangePassword = (value) => {
  return dispatch => {
    dispatch({ type: actionType.CHANGEPASSWORD, value: value })
  }
}