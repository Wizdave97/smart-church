import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState={
  token:null,
  userId:null,
  userName:null,
  authStart:false,
  authSuccess:false,
  authFail:false,
  error:false
}
const reducer =(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.AUTH_START: return updateObject(state,{authStart:true,authSuccess:false,authFail:false,error:false})
    case actionTypes.AUTH_SUCCESS:return updateObject(state,{authStart:false,authSuccess:true,authFail:false,error:false})
    case actionTypes.AUTH_FAIL:return updateObject(state,{authStart:false,authSuccess:false,authFail:true,error:true})
    default: return state
  }
  return state
}

export default reducer
