import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  postStaffStart:false,
  postStaffSuccess:false,
  postStaffFail:false,
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_STAFF_START: return updateObject(state,{postStaffStart:true,postStaffFail:false,postStaffSuccess:false})
    case actionTypes.POST_STAFF_SUCCESS: return updateObject(state,{postStaffStart:false,postStaffSuccess:true,postStaffFail:false})
    case actionTypes.POST_STAFF_FAIL: return updateObject(state,{postStaffFail:true,postStaffStart:false,postStaffSuccess:false})
    case actionTypes.RESET: return updateObject(state,{postStaffStart:false,postStaffFail:false,postStaffSuccess:false})
    default: return state
  }
}
export default reducer
