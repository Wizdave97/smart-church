import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

export const fetchSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const fetchAttendanceAsync=(branchId,url=null,day='sunday',month=null,year='2019')=>{

  return (dispatch,getState)=>{
    dispatch(fetchSync(actionTypes.FETCH_ATTENDANCE_START))
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
        dispatch(fetchSync(actionTypes.FETCH_ATTENDANCE_SUCCESS, res))
    }).catch(err=>{
      dispatch(fetchSync(actionTypes.FETCH_ATTENDANCE_FAIL))
    })
  }
}

export const fetchFinanceAsync =(branchId,url,type,category=null,month=null,year=null)=>{
  return (dispatch,getState)=>{
    type=type.toLowerCase()
    if(type==='income'){
      dispatch(fetchSync(actionTypes.FETCH_INCOME_START))
    }
    else{
      dispatch(fetchSync(actionTypes.FETCH_EXPENDITURE_START))
    }
        switch(type){
          case 'income': url=baseUrl+'/incomes'+`?branchid=${branchId}`
          break;
          case 'expenditure': url=baseUrl+'/expenditures'+`?branchid=${branchId}`
          break;
          default: break;
        }
      fetch(url,{
        method:'GET',
        mode:'cors',
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        if(res.status!==200) return
        return res.json()
      }).then(res=>{
        if(type==='income'){
          dispatch(fetchSync(actionTypes.FETCH_INCOME_SUCCESS, res))
        }
        else {
          dispatch(fetchSync(actionTypes.FETCH_EXPENDITURE_SUCCESS, res))
        }
      }).catch(err=>{
        if(type==='income'){
          dispatch(fetchSync(actionTypes.FETCH_INCOME_FAIL))
        }
        else {
          dispatch(fetchSync(actionTypes.FETCH_EXPENDITURE_FAIL))
        }
      })
  }

}
