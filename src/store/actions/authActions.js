import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

export const authSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}
export const changeBranchId= (id)=>{
  return {
    type:actionTypes.CHANGE_BRANCH_ID,
    payload:id
  }
}
const storeAuthInfo= (data) =>{
  if(!localStorage.smartchurch){
    localStorage.smartchurch='';
  }
  const expiresIn= new Date( new Date().getTime() + new Date(Number(3600)*1000).getTime()).getTime()
  const authData={token:data.token,expiresIn:expiresIn}
  localStorage.smartchurch=JSON.stringify(authData);
}
export const authAsync= (isSignUp,authData)=>{
  return dispatch=>{
    dispatch(authSync(actionTypes.AUTH_START))
    if(!isSignUp){
      let url=baseUrl+'/login'
      //let url='http://127.0.0.1:80/login'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(authData),
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res=>{
        if(res.status!==200){
          return null
      }
      return res.json()}).then(res=>{
        if(res.error){
          console.log(res.error)
          dispatch(authSync(actionTypes.AUTH_FAIL))
          return
        }
        dispatch(authSync(actionTypes.AUTH_SUCCESS,res.token))
        storeAuthInfo(res)
        authCheckTimeout(3600)

      }).catch(err=>{
        dispatch(authSync(actionTypes.AUTH_FAIL))
        console.log(err)
      })
    }
    else {
      let url=baseUrl+'/churches';
      //let url='http://127.0.0.1:80/churches'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(authData),
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res=>{
        if(res.status!==200){
          return null
      }
      return res.json()}).then(res=>{
        if(res.error){
          console.log(res.error)
          dispatch(authSync(actionTypes.AUTH_FAIL))
          return
        }
        dispatch(authSync(actionTypes.AUTH_SUCCESS,res.token))
        storeAuthInfo(res)
        authCheckTimeout(3600)

      }).catch(err=>{
        dispatch(authSync(actionTypes.AUTH_FAIL))
      })
    }


  }

}

export const authLogout = () =>{
  localStorage.smartchurch=''
  return {
    type:actionTypes.AUTH_LOGOUT
  }
}
export const authCheckTimeout = (expiresIn) =>{
  return dispatch => {
    setTimeout(()=>{
      dispatch(authLogout())
    },Number(expiresIn*1000))
  }
}
export const autoSignIn = () =>{
  return (dispatch,getState) =>{
    if(localStorage.smartchurch){
      const authData=JSON.parse(localStorage.smartchurch);
      const tokenValidity=new Date().getTime() < Number(authData.expiresIn);
      if (tokenValidity) {
        dispatch(authSync(actionTypes.AUTH_SUCCESS,authData.token))
      }
      else dispatch(authSync(actionTypes.AUTH_FAIL,null))
    }
  }
}
