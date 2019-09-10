import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  postBranchStart:false,
  postBranchSuccess:false,
  postBranchFail:false,
  fetchBranchesStart:false,
  fetchBranchesSuccess:false,
  fetchBranchesFail:false,
  total:null,
  current_page:null,
  first:null,
  prev:null,
  next:null,
  branches:null,
  deleteBranchStart:false,
  deleteBranchFail:false,
  deleteBranchSuccess:false,
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_BRANCH_START: return updateObject(state,{postBranchStart:true,postBranchFail:false,postBranchSuccess:false})
    case actionTypes.POST_BRANCH_SUCCESS: return updateObject(state,{postBranchStart:false,postBranchSuccess:true,postBranchFail:false})
    case actionTypes.POST_BRANCH_FAIL: return updateObject(state,{postBranchFail:true,postBranchStart:false,postBranchSuccess:false})
    case actionTypes.FETCH_BRANCHES_START: return updateObject(state, {fetchBranchesFail: false, fetchBranchesStart:true, fetchBranchesSuccess:false})
    case actionTypes.FETCH_BRANCHES_SUCCESS: return updateObject(state, {fetchBranchesFail: false, fetchBranchesStart:false, fetchBranchesSuccess:true,branches:action.payload.data,first:action.payload.links.first,next:action.payload.links.next,prev:action.payload.links.prev,total:action.payload.meta.last_page,current_page:action.payload.meta.current_page})
    case actionTypes.FETCH_BRANCHES_FAIL: return updateObject(state, {fetchBranchesFail:true, fetchBranchesStart:false, fetchBranchesSuccess:false})
    case actionTypes.DELETE_BRANCH_START: return updateObject(state,{deleteBranchStart:true,deleteBranchFail:false,deleteBranchSuccess:false,})
    case actionTypes.DELETE_BRANCH_SUCCESS: return updateObject(state,{deleteBranchStart:false,deleteBranchFail:false,deleteBranchSuccess:true,})
    case actionTypes.DELETE_BRANCH_FAIL: return updateObject(state,{deleteBranchStart:false,deleteBranchFail:true,deleteBranchSuccess:false,})
    case actionTypes.RESET: return updateObject(state,{postBranchStart:false,postBranchFail:false,postBranchSuccess:false,fetchBranchesStart:false,fetchBranchesSuccess:false,fetchBranchesFail:false,deleteBranchStart:false,deleteBranchFail:false,deleteBranchSuccess:false,})

    default: return state
  }
}
export default reducer
