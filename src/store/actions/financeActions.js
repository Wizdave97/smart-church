import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

const financeSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const financeAsync= (financeData)=>{
  return dispatch=>{
    dispatch(authSync(actionTypes.POST_FINANCE_START))

      let url=baseUrl+'/login'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(financeData),
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        dispatch(authSync(actionTypes.POST_FINANCE_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(authSync(actionTypes.POST_FINANCE_FAIL))
        console.log(err)
      })


  }

}
