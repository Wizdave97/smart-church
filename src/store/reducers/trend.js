import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  reports:null,
  finances:null,
  fetchTrendReportsStart:false,
  fetchTrendReportsSuccess:false,
  fetchTrendReportsFail:false,
  fetchTrendFinanceStart:false,
  fetchTrendFinanceSuccess:false,
  fetchTrendFinanceFail:false,
}
const reducer= (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.FETCH_TREND_REPORTS_START:
      return updateObject(state,{fetchTrendReportsStart:true,fetchTrendReportsSuccess:false,fetchTrendReportsFail:false})
    case actionTypes.FETCH_TREND_REPORTS_SUCCESS:
      return updateObject(state,{fetchTrendReportsStart:false,fetchTrendReportsSuccess:true,fetchTrendReportsFail:false,reports:action.payload})
    case actionTypes.FETCH_TREND_REPORTS_FAIL:
      return updateObject(state,{fetchTrendReportsStart:false,fetchTrendReportsSuccess:false,fetchTrendReportsFail:true})
    case actionTypes.FETCH_TREND_FINANCE_START:
      return updateObject(state,{fetchTrendFinanceStart:true,fetchTrendFinanceSuccess:false,fetchTrendFinanceFail:false})
    case actionTypes.FETCH_TREND_FINANCE_SUCCESS:
      return updateObject(state,{fetchTrendFinanceStart:false,fetchTrendFinanceSuccess:true,fetchTrendFinanceFail:false,finances:action.payload})
    case actionTypes.FETCH_TREND_FINANCE_FAIL:
      return updateObject(state,{fetchTrendFinanceStart:false,fetchTrendFinanceSuccess:false,fetchTrendFinanceFail:true})
    case actionTypes.RESET:
      return updateObject(state, {fetchTrendFinanceFail:false, fetchTrendFinanceStart:false, fetchTrendFinanceSuccess:false,fetchTrendReportsStart:false,fetchTrendReportsSuccess:false,fetchTrendReportsFail:false,}  )
    default:return state
  }
}

export default reducer
