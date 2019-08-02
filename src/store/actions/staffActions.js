import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

const staffSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const staffAsync= (staffData)=>{
  return dispatch=>{
    dispatch(authSync(actionTypes.POST_STAFF_START))

      let url=baseUrl+'/login'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(staffData),
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        dispatch(authSync(actionTypes.POST_STAFF_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(authSync(actionTypes.POST_STAFF_FAIL))
        console.log(err)
      })


  }

}
