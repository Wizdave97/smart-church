import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  postBranchStart:false,
  postBranchSuccess:false,
  postBranchFail:false,
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case actionTypes.POST_BRANCH_START: return updateObject(state,{postBranchStart:true,postBranchFail:false,postBranchSuccess:false})
    case actionTypes.POST_BRANCH_SUCCESS: return updateObject(state,{postBranchStart:false,postBranchSuccess:true,postBranchFail:false})
    case actionTypes.POST_BRANCH_FAIL: return updateObject(state,{postBranchFail:true,postBranchStart:false,postBranchSuccess:false})
    case actionTypes.RESET: return updateObject(state,{postBranchStart:false,postBranchFail:false,postBranchSuccess:false})
    default: return state
  }
}
export default reducer
