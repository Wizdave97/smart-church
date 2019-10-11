import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
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
        if(!res.ok){
            throw new Error()
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
export const updateReportAsync= (reportData)=>{
  return (dispatch,getState)=>{
    dispatch(reportSync(actionTypes.POST_REPORT_START))

      let url=baseUrl+'/reports'
      fetch(url,{
        method:'PATCH',
        mode:'cors',
        body:JSON.stringify(reportData),
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
        dispatch(reportSync(actionTypes.POST_REPORT_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(reportSync(actionTypes.POST_REPORT_FAIL))
        console.log(err)
      })


  }

}
export const fetchReportAsync=(branchId,url=null,day=null,month=null,year=null)=>{
  if(!year) year=new Date().getFullYear();
  if(!month) month=months[new Date().getMonth()]
  return (dispatch,getState)=>{
    dispatch(reportSync(actionTypes.FETCH_SERVICE_REPORTS_START))
    if(!branchId){
      branchId=getState().auth.branchId
    }
    if(url==null){
      url=baseUrl+`/reports?branchid=${branchId}`
      if(day){
        url=url+`&day=${day}`
      }
    }
    else{
      url=url+`&branchid=${branchId}`
      if(day){
        url=url+`&day=${day}`
      }
    }
    if(month && year ){
      month=months.indexOf(month)+1
      url=url+`&month=${month}-${year}`
    }
    fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Authorization:'Bearer'+getState().auth.token
      }
    }).then(res=>{
      if(!res.ok){
          throw new Error()
      }
      return res.json()
      }
      ).then(res=>{
        dispatch(reportSync(actionTypes.FETCH_SERVICE_REPORTS_SUCCESS, res))
    }).catch(err=>{
      dispatch(reportSync(actionTypes.FETCH_SERVICE_REPORTS_FAIL))
    })
  }
}
