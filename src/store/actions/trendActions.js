import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
export const trendSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}
export const fetchTrendReportAsync=(branchId,from,to,year=null)=>{
  if(!year) {
    year=new Date().getFullYear();
  }
  from=months.indexOf(from)+1;
  to=months.indexOf(to)+1;
  return (dispatch,getState)=>{
    dispatch(trendSync(actionTypes.FETCH_TREND_REPORTS_START))
    if(!branchId){
      branchId=getState().auth.branchId
    }
    let url=baseUrl+`/reports?branchid=${branchId}&from=${year}-${from}-01&to=${year}-${to}-30&all=1`
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
        dispatch(trendSync(actionTypes.FETCH_TREND_REPORTS_SUCCESS, res.data))
    }).catch(err=>{
      dispatch(trendSync(actionTypes.FETCH_TREND_REPORTS_FAIL))
    })
  }
}


export const fetchTrendFinanceAsync =(branchId,type,category,from,to,year=null)=>{
if(!year) {
  year=new Date().getFullYear();
}
from=months.indexOf(from)+1;
to=months.indexOf(to)+1;
return (dispatch,getState)=>{
  dispatch(trendSync(actionTypes.FETCH_TREND_FINANCE_START))
  if(!branchId){
    branchId=getState().auth.branchId
  }
  let url=baseUrl+`/incomes?branchid=${branchId}&from=${year}-${from}-01&to=${year}-${to}-30&all=1`
  if(type.toLowerCase()==='expenditure') url=baseUrl+`/expenditures?branchid=${branchId}&category=${category}&from=${year}-${from}-01&to=${year}-${to}-30&all=1`
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
      dispatch(trendSync(actionTypes.FETCH_TREND_FINANCE_SUCCESS, res.data))
  }).catch(err=>{
    dispatch(trendSync(actionTypes.FETCH_TREND_FINANCE_FAIL))
  })
}

}
