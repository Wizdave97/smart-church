import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

export const fetchSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const fetchAttendanceAsync=(branchId,url=null)=>{
 let year=new Date().getFullYear()
 let month=new Date().getMonth()-1
  return (dispatch,getState)=>{
    dispatch(fetchSync(actionTypes.FETCH_ATTENDANCE_START))
    if(url==null){
      url=baseUrl+`/reports?branchid=${branchId}`
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
        dispatch(fetchSync(actionTypes.FETCH_ATTENDANCE_SUCCESS, res))
    }).catch(err=>{
      dispatch(fetchSync(actionTypes.FETCH_ATTENDANCE_FAIL))
    })
  }
}

export const fetchFinanceAsync =(branchId,url,type)=>{
  let year=new Date().getFullYear()
  let month=new Date().getMonth()-1
  return (dispatch,getState)=>{
    type=type.toLowerCase()
    if(type==='income'){
      dispatch(fetchSync(actionTypes.FETCH_INCOME_START))
    }
    else{
      dispatch(fetchSync(actionTypes.FETCH_EXPENDITURE_START))
    }
        switch(type){
          case 'income': url=`${baseUrl}/incomes?branchid=${branchId}&month=${month}-${year}`
          break;
          case 'expenditure': url=`${baseUrl}/expenditures?branchid=${branchId}&month=${month}-${year}`
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
        if(!res.ok){
            throw new Error()
        }
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
