import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  postReportStart:false,
  postReportSuccess:false,
  postReportFail:false,
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_REPORT_START: return updateObject(state,{postReportStart:true,postReportFail:false,postReportSuccess:false})
    case actionTypes.POST_REPORT_SUCCESS: return updateObject(state,{postReportStart:false,postReportSuccess:true,postReportFail:false})
    case actionTypes.POST_REPORT_FAIL: return updateObject(state,{postReportFail:true,postReportStart:false,postReportSuccess:false})
    case actionTypes.RESET: return updateObject(state,{postReportStart:false,postReportFail:false,postReportSuccess:false})
    default: return state
  }
}
export default reducer
