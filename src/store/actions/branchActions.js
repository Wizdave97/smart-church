import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

export const branchSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const branchAsync= (branchData)=>{
  return (dispatch,getState)=>{
    dispatch(branchSync(actionTypes.POST_BRANCH_START))

      let url=baseUrl+'/branches'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(branchData),
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        if(res.status!=='200'){
            return
        }
        return res.json()
      }).then(res=>{
        dispatch(branchSync(actionTypes.POST_BRANCH_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(branchSync(actionTypes.POST_BRANCH_FAIL))
        console.log(err)
      })


  }

}
