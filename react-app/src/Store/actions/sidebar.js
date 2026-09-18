import * as actionType from './actionsType';
import * as action from './index'
import axios from 'axios';




export const authorization = (token) => {
    return dispatch => {
        dispatch({ type: actionType.CHANGE_SIDEBARLOADER_STATUS, data: true })
        axios.get('/token/authorization', { headers: { 'Authorisation': token } })
            .then(response => {
                dispatch({ type: actionType.CHANGE_SIDEBARLOADER_STATUS, data: false })
                dispatch({ type: actionType.AUTHORIZATION, value: response.data })
              
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_SIDEBARLOADER_STATUS, data: false })
                console.log(error);
            });
    }
}


export const updatePathname=(value)=>{
    return dispatch=>{
    dispatch({type:actionType.UPDATEPATHNAME,value:value})
}
}

