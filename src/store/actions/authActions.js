import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

const authSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const authAsync= (isSignUp,authData)=>{
  return dispatch=>{
    dispatch(authSync(actionTypes.AUTH_START))
    if(!isSignUp){
      let url=baseUrl+'/login'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(authData)
      }).then(res=>{
        dispatch(authSync(actionTypes.AUTH_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(authSync(actionTypes.AUTH_FAIL))
        console.log(err)
      })
    }
    else {
      let url=baseUrl+'/churches';
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(authData)
      }).then(res=>{
        dispatch(authSync(actionTypes.AUTH_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(authSync(actionTypes.AUTH_FAIL))
        console.log(err)
      })
    }


  }

}

export const authLogout=()=>{

}

export const autoSignIn =()=>{

}
