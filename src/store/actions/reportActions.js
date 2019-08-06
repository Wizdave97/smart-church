import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

export const reportSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const reportAsync= (reportData)=>{
  return (dispatch,getState)=>{
    dispatch(reportSync(actionTypes.POST_REPORT_START))

      let url=baseUrl+'/reports'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(reportData),
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
        dispatch(reportSync(actionTypes.POST_REPORT_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(reportSync(actionTypes.POST_REPORT_FAIL))
        console.log(err)
      })


  }

}
