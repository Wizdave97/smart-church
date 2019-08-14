import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  reports:null,
  first:null,
  last:null,
  prev:null,
  next:null,
  total:null,
  current_page:null,
  fetchReportStart:false,
  fetchReportSuccess:false,
  fetchReportFail:false,
  postReportStart:false,
  postReportSuccess:false,
  postReportFail:false,
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_REPORT_START: return updateObject(state,{postReportStart:true,postReportFail:false,postReportSuccess:false})
    case actionTypes.POST_REPORT_SUCCESS: return updateObject(state,{postReportStart:false,postReportSuccess:true,postReportFail:false})
    case actionTypes.POST_REPORT_FAIL: return updateObject(state,{postReportFail:true,postReportStart:false,postReportSuccess:false})
    case actionTypes.RESET: return updateObject(state,{postReportStart:false,postReportFail:false,postReportSuccess:false,fetchReportStart:false,fetchReportSuccess:false,fetchReportFail:false})
    case actionTypes.FETCH_SERVICE_REPORTS_START: return updateObject(state,{fetchReportStart:true,fetchReportSuccess:false,fetchReportFail:false,})
    case actionTypes.FETCH_SERVICE_REPORTS_SUCCESS: return updateObject(state,{fetchReportStart:false,fetchReportSuccess:true,fetchReportFail:false,reports:action.payload.data,first:action.payload.links.first,last:action.payload.links.first,next:action.payload.links.next,prev:action.payload.links.prev,total:action.payload.meta.total,current_page:action.payload.meta.current_page})
    case actionTypes.FETCH_SERVICE_REPORTS_FAIL: return updateObject(state,{fetchReportStart:false,fetchReportSuccess:false,fetchReportFail:true,})
    default: return state
  }
}
export default reducer
