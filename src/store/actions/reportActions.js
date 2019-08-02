import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

const reportSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const reportAsync= (reportData)=>{
  return dispatch=>{
    dispatch(authSync(actionTypes.POST_REPORT_START))

      let url=baseUrl+'/login'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(reportData),
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        dispatch(authSync(actionTypes.POST_REPORT_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(authSync(actionTypes.POST_REPORT_FAIL))
        console.log(err)
      })


  }

}
