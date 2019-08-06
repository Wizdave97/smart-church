import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  postFinanceStart:false,
  postFinanceSuccess:false,
  postFinanceFail:false,
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_FINANCE_START: return updateObject(state,{postFinanceStart:true,postFinanceFail:false,postFinanceSuccess:false})
    case actionTypes.POST_FINANCE_SUCCESS: return updateObject(state,{postFinanceStart:false,postFinanceSuccess:true,postFinanceFail:false})
    case actionTypes.POST_FINANCE_FAIL: return updateObject(state,{postFinanceFail:true,postFinanceStart:false,postFinanceSuccess:false})
    case actionTypes.RESET: return updateObject(state,{postFinanceStart:false,postFinanceFail:false,postFinanceSuccess:false})
    default: return state
  }
}
export default reducer
