import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState={
  token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9hcGkuc21hcnRjaHVyY2guY29tLm5nL2FwaS9sb2dpbiIsImlhdCI6MTU2NDc0ODcwMSwiZXhwIjoxNTY0Nzk5MTAxLCJuYmYiOjE1NjQ3NDg3MDEsImp0aSI6Ikp4amx4VHE2M0tpVU9HcTcifQ.XiLAUn0OOuydBUtUL_LaYdal6q41tElmHnxFk271gEY",
  branchId:null,
  userName:null,
  authStart:false,
  authSuccess:false,
  authFail:false,
  error:false
}
const reducer =(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.AUTH_START: return updateObject(state,{authStart:true,authSuccess:false,authFail:false,error:false})
    case actionTypes.AUTH_SUCCESS:return updateObject(state,{authStart:false,authSuccess:true,authFail:false,error:false,token:action.payload})
    case actionTypes.AUTH_FAIL:return updateObject(state,{authStart:false,authSuccess:false,authFail:true,error:true})
    default: return state
  }
}

export default reducer
