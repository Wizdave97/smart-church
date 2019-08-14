import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  postSettingsIncomeStart:false,
  postSettingsIncomeSuccess:false,
  postSettingsIncomeFail:false,
  postSettingsExpenditureStart:false,
  postSettingsExpenditureSuccess:false,
  postSettingsExpenditureFail:false,
  postSettingsTypesStart:false,
  postSettingsTypesSuccess:false,
  postSettingsTypesFail:false
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_SETTINGS_INCOME_START: return updateObject(state,{postSettingsIncomeStart:true,postSettingsIncomeSuccess:false,postSettingsIncomeFail:false})
    case actionTypes.POST_SETTINGS_EXPENDITURE_START:return updateObject(state,{postSettingsExpenditureStart:true,postSettingsExpenditureSuccess:false,postSettingsExpenditureFail:false})
    case actionTypes.POST_SETTINGS_TYPES_START: return updateObject(state,{postSettingsTypesStart:true,postSettingsTypesSuccess:false,postSettingsTypesFail:false})
    case actionTypes.POST_SETTINGS_INCOME_SUCCESS: return updateObject(state,{postSettingsIncomeStart:false,postSettingsIncomeSuccess:true,postSettingsIncomeFail:false})
    case actionTypes.POST_SETTINGS_INCOME_FAIL: return updateObject(state,{postSettingsIncomeStart:false,postSettingsIncomeSuccess:false,postSettingsIncomeFail:true})
    case actionTypes.POST_SETTINGS_EXPENDITURE_SUCCESS: return updateObject(state,{postSettingsExpenditureStart:false,postSettingsExpenditureSuccess:true,postSettingsExpenditureFail:false})
    case actionTypes.POST_SETTINGS_EXPENDITURE_FAIL: return updateObject(state,{postSettingsExpenditureStart:false,postSettingsExpenditureSuccess:false,postSettingsExpenditureFail:true})
    case actionTypes.POST_SETTINGS_TYPES_SUCCESS: return updateObject(state, {postSettingsTypesStart:false,postSettingsTypesSuccess:true,postSettingsTypesFail:false})
    case actionTypes.POST_SETTINGS_TYPES_FAIL: return updateObject(state, {postSettingsTypesStart:false,postSettingsTypesSuccess:false,postSettingsTypesFail:true})
    case actionTypes.RESET: return updateObject(state,{  postSettingsIncomeStart:false,postSettingsIncomeSuccess:false,postSettingsIncomeFail:false,postSettingsExpenditureStart:false,postSettingsExpenditureSuccess:false,postSettingsExpenditureFail:false,postSettingsTypesStart:false,postSettingsTypesSuccess:false,postSettingsTypesFail:false})
    default: return state
  }
}
export default reducer
