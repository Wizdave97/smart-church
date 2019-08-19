import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState={
  reports:null,
  income:null,
  expenditure:null,
  fetchAttendanceStart:false,
  fetchAttendanceSuccess:false,
  fetchAttendanceFail:false,
  fetchIncomeStart:false,
  fetchIncomeSuccess:false,
  fetchIncomeFail:false,
  fetchExpenditureStart:false,
  fetchExpenditureSuccess:false,
  fetchExpenditureFail:false
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.FETCH_ATTENDANCE_START: return updateObject(state,{  fetchAttendanceStart:true,fetchAttendanceSuccess:false,fetchAttendanceFail:false,})
    case actionTypes.FETCH_ATTENDANCE_SUCCESS: return updateObject(state,{  fetchAttendanceStart:false,fetchAttendanceSuccess:true,fetchAttendanceFail:false,reports:action.payload.data})
    case actionTypes.FETCH_ATTENDANCE_FAIL: return updateObject(state,{  fetchAttendanceStart:false,fetchAttendanceSuccess:false,fetchAttendanceFail:true,})
    case actionTypes.FETCH_INCOME_START: return updateObject(state, {fetchIncomeStart:true,fetchIncomeSuccess:false,fetchIncomeFail:false,})
    case actionTypes.FETCH_INCOME_SUCCESS: return updateObject(state, {fetchIncomeStart:false,fetchIncomeSuccess:true,fetchIncomeFail:false,income:action.payload.data})
    case actionTypes.FETCH_INCOME_FAIL: return updateObject(state, {fetchIncomeStart:false,fetchIncomeSuccess:false,fetchIncomeFail:true,})
    case actionTypes.FETCH_EXPENDITURE_START: return updateObject(state, {fetchExpenditureStart:true,fetchExpenditureSuccess:false,fetchExpenditureFail:false})
    case actionTypes.FETCH_EXPENDITURE_SUCCESS: return updateObject(state, {fetchExpenditureStart:false,fetchExpenditureSuccess:true,fetchExpenditureFail:false,expenditure:action.payload.data})
    case actionTypes.FETCH_EXPENDITURE_FAIL: return updateObject(state, {fetchExpenditureStart:false,fetchExpenditureSuccess:false,fetchExpenditureFail:true})
    default: return state
  }
}

export default reducer
