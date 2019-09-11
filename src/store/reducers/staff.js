import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  staffs:null,
  total:null,
  current_page:null,
  first:null,
  prev:null,
  next:null,
  postStaffStart:false,
  postStaffSuccess:false,
  postStaffFail:false,
  fetchStaffsStart:false,
  fetchStaffsSuccess:false,
  fetchStaffsFail:false,
  deleteStaffStart:false,
  deleteStaffFail:false,
  deleteStaffSuccess:false,
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_STAFF_START: return updateObject(state,{postStaffStart:true,postStaffFail:false,postStaffSuccess:false})
    case actionTypes.POST_STAFF_SUCCESS: return updateObject(state,{postStaffStart:false,postStaffSuccess:true,postStaffFail:false})
    case actionTypes.POST_STAFF_FAIL: return updateObject(state,{postStaffFail:true,postStaffStart:false,postStaffSuccess:false})
    case actionTypes.FETCH_STAFFS_START: return updateObject(state, {fetchStaffsFail: false, fetchStaffsStart:true, fetchStaffsSuccess:false})
    case actionTypes.FETCH_STAFFS_SUCCESS: return updateObject(state, {fetchStaffsFail: false, fetchStaffsStart:false, fetchStaffsSuccess:true,staffs:action.payload.data,first:action.payload.links.first,next:action.payload.links.next,prev:action.payload.links.prev,total:action.payload.meta.last_page,current_page:action.payload.meta.current_page})
    case actionTypes.FETCH_STAFFS_FAIL: return updateObject(state, {fetchStaffsFail:true, fetchStaffsStart:false, fetchStaffsSuccess:false})
    case actionTypes.DELETE_STAFF_START: return updateObject(state,{deleteStaffStart:true,deleteStaffFail:false,deleteStaffSuccess:false,})
    case actionTypes.DELETE_STAFF_SUCCESS: return updateObject(state,{deleteStaffStart:false,deleteStaffFail:false,deleteStaffSuccess:true,})
    case actionTypes.DELETE_STAFF_FAIL: return updateObject(state,{deleteStaffStart:false,deleteStaffFail:true,deleteStaffSuccess:false,})
    case actionTypes.RESET: return updateObject(state,{postStaffStart:false,postStaffFail:false,postStaffSuccess:false,fetchStaffsFail:false,fetchStaffsSuccess:false,fetchStaffsStart:false,deleteStaffStart:false,deleteStaffFail:false,deleteStaffSuccess:false,})
    default: return state
  }
}
export default reducer
