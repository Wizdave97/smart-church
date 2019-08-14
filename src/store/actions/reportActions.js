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

export const fetchReportAsync=(branchId,url=null,day='sunday',month=null,year='2019')=>{

  return (dispatch,getState)=>{
    dispatch(reportSync(actionTypes.FETCH_SERVICE_REPORTS_START))
    if(url==null){
      url=baseUrl+`/reports?branchid=${branchId}&day=${day}`
    }
    else{
      url=url+`&branchid=${branchId}&day=${day}`
      if(month){
        const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
        month=months.indexOf(month)+1
        url=url+`&month=${year}-${month}`
      }
    }
    fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Authorization:'Bearer'+getState().auth.token
      }
    }).then(res=>{
      if(res.status!==200) return
      return res.json()
      }
      ).then(res=>{
        dispatch(reportSync(actionTypes.FETCH_SERVICE_REPORTS_SUCCESS, res))
    }).catch(err=>{
      dispatch(reportSync(actionTypes.FETCH_SERVICE_REPORTS_FAIL))
    })
  }
}
