import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  reports:null,
  first:null,
  prev:null,
  next:null,
  total:null,
  current_page:null,
  fetchFinanceStart:false,
  fetchFinanceSuccess:false,
  fetchFinanceFail:false,
  postFinanceStart:false,
  postFinanceSuccess:false,
  postFinanceFail:false,
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_FINANCE_START: return updateObject(state,{postFinanceStart:true,postFinanceFail:false,postFinanceSuccess:false})
    case actionTypes.POST_FINANCE_SUCCESS: return updateObject(state,{postFinanceStart:false,postFinanceSuccess:true,postFinanceFail:false})
    case actionTypes.POST_FINANCE_FAIL: return updateObject(state,{postFinanceFail:true,postFinanceStart:false,postFinanceSuccess:false})
    case actionTypes.RESET: return updateObject(state,{postFinanceStart:false,postFinanceFail:false,postFinanceSuccess:false,fetchFinanceSuccess:false,fetchFinanceFail:false,fetchFinanceStart:false})
    case actionTypes.FETCH_FINANCE_REPORTS_START: return updateObject(state,{fetchFinanceStart:true,fetchFinanceSuccess:false,fetchFinanceFail:false})
    case actionTypes.FETCH_FINANCE_REPORTS_SUCCESS: return updateObject(state,{fetchFinanceStart:false,fetchFinanceSuccess:true,fetchFinanceFail:false,reports:action.payload.data,first:action.payload.links.first,next:action.payload.links.next,prev:action.payload.links.prev,total:action.payload.meta.total,current_page:action.payload.meta.current_page})
    case actionTypes.FETCH_FINANCE_REPORTS_FAIL: return updateObject(state,{fetchFinanceStart:false,fetchFinanceSuccess:false,fetchFinanceFail:true,})
    default: return state
  }
}
export default reducer
