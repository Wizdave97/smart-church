import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

export const staffSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const staffAsync= (staffData)=>{
  return (dispatch,getState)=>{
    dispatch(staffSync(actionTypes.POST_STAFF_START))

      let url=baseUrl+'/staffs'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(staffData),
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        if(res.status!==200){
          return null
        }
        return res.json()
      }).then(res=>{
        dispatch(staffSync(actionTypes.POST_STAFF_SUCCESS))

      }).catch(err=>{
        dispatch(staffSync(actionTypes.POST_STAFF_FAIL))

      })


  }

}
