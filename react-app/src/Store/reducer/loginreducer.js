import * as actionType from '../actions/actionsType'
import {updateObject} from '../utility'

const initialState={
    isUserLogedIn:false,
    token:null,
    username:'',
    password:'',
    error:false,
    client:null,
    systemConfig:{} ,
    intime:null,
    loader: false
}

const loginreducer=(state=initialState,action)=>{
    switch(action.type){
        case actionType.LOGIN:
           return updateObject(state,{
               isUserLogedIn:action.isUserLogedIn,
               token:action.token,
               username:action.username,
               error:false,
               intime:action.intime
           });
        case actionType.LOGINERROR:
            return updateObject(state,{
               isUserLogedIn:false,
               error:true
            }); 
        case actionType.LOGOUT:
            return updateObject(state,{
                isUserLogedIn: false,
                error: false,
                token:null,
                username:null
            }); 
        case actionType.CHANGESYSTEM:
            return {...state,systemConfig:{...state.systemConfig,selectedSys:action.system,selectedClient:action.client,selectedIP:action.ip,selectedinstanse:action.instanse}}  
        case actionType.CHANGECLIENT:
            return {...state,systemConfig:{...state.systemConfig,selectedClient:action.client,selectedIP:action.ip,selectedinstanse:action.instanse}}         
        case actionType.SETDEFAULTDATA:
           return {...state,systemConfig:action.systemConfig}
        case actionType.CHANGEUSERNAME:
            return {...state,username:action.value}
        case actionType.CHANGEPASSWORD:
            return {...state,password:action.value}   
        case actionType.CHANGE_LOGIN_LOADER:
            return { ...state, loader: action.data }
    }
    
    return state;

}

export default loginreducer;