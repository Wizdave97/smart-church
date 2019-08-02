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
      //let url='http://127.0.0.1:80/login'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(authData),
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res=>res.json()).then(res=>{
        dispatch(authSync(actionTypes.AUTH_SUCCESS,res.token))
        console.log(res)
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
        if(res.status!=='200'){
          return
      }
      return res.json()}).then(res=>{
        dispatch(authSync(actionTypes.AUTH_SUCCESS,res.token))
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
