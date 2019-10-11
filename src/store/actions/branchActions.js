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

      let url=baseUrl+'/branches?all=1'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(branchData),
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        console.log(res)
        if(!res.ok){
            throw new Error()
        }
        return res.json()
      }).then(res=>{
        dispatch(branchSync(actionTypes.POST_BRANCH_SUCCESS))

      }).catch(err=>{
        dispatch(branchSync(actionTypes.POST_BRANCH_FAIL))

      })


  }

}
export const updateBranchAsync= (branchData)=>{
  return (dispatch,getState)=>{
    dispatch(branchSync(actionTypes.POST_BRANCH_START))

      let url=baseUrl+'/branches'
      fetch(url,{
        method:'PATCH',
        mode:'cors',
        body:JSON.stringify(branchData),
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        if(!res.ok){
            throw new Error()
        }
        return res.json()
      }).then(res=>{
        dispatch(branchSync(actionTypes.POST_BRANCH_SUCCESS))

      }).catch(err=>{
        dispatch(branchSync(actionTypes.POST_BRANCH_FAIL))

      })


  }

}

export const deleteBranchAsync= (data)=>{
  return (dispatch,getState)=>{
    dispatch(branchSync(actionTypes.DELETE_BRANCH_START))

      let url=baseUrl+'/branches'
      fetch(url,{
        method:'PATCH',
        mode:'cors',
        body:JSON.stringify({...data,status:'DELETED'}),
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        if(!res.ok){
            throw new Error()
        }
        return res.json()
      }).then(res=>{
        dispatch(branchSync(actionTypes.DELETE_BRANCH_SUCCESS))

      }).catch(err=>{
        dispatch(branchSync(actionTypes.DELETE_BRANCH_FAIL))

      })


  }

}
export const fetchBranchAsync=(url=null)=>{
  return (dispatch,getState)=>{
    dispatch(branchSync(actionTypes.FETCH_BRANCHES_START))
      if(!url){
        url=baseUrl+'/branches'
      }
      fetch(url,{
        method:'GET',
        mode:'cors',
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        if(!res.ok){
            throw new Error()
        }
        return res.json()
      }).then(res=>{
        dispatch(branchSync(actionTypes.FETCH_BRANCHES_SUCCESS,res))

      }).catch(err=>{
        dispatch(branchSync(actionTypes.FETCH_BRANCHES_FAIL))

      })


  }
}
