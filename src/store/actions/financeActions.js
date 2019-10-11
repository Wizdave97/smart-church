import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
export const financeSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const financeAsync= (type,financeData)=>{
  return (dispatch,getState)=>{
    dispatch(financeSync(actionTypes.POST_FINANCE_START))

      let url=baseUrl
      switch(type){
        case 'Income':
          url+='/incomes';
          break;
        case 'Expenditure':
          url+='/expenditures';
          break;
        default: break;
      }
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(financeData),
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
        dispatch(financeSync(actionTypes.POST_FINANCE_SUCCESS))

      }).catch(err=>{
        dispatch(financeSync(actionTypes.POST_FINANCE_FAIL))

      })


  }

}
export const updateFinanceAsync= (type,financeData)=>{
  return (dispatch,getState)=>{
    dispatch(financeSync(actionTypes.POST_FINANCE_START))

      let url=baseUrl
      switch(type){
        case 'Income':
          url+='/incomes';
          break;
        case 'Expenditure':
          url+='/expenditures';
          break;
        default: break;
      }
      fetch(url,{
        method:'PATCH',
        mode:'cors',
        body:JSON.stringify(financeData),
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
        dispatch(financeSync(actionTypes.POST_FINANCE_SUCCESS))

      }).catch(err=>{
        dispatch(financeSync(actionTypes.POST_FINANCE_FAIL))

      })


  }

}
export const fetchFinanceAsync =(branchId,url,type='Income',category='offering',month=null,year=null)=>{

  if(!year) year=new Date().getFullYear()
  if(!month) month=months[new Date().getMonth()]
  return (dispatch,getState)=>{
    dispatch(financeSync(actionTypes.FETCH_FINANCE_REPORTS_START))
    if(!branchId){
      branchId=getState().auth.branchId
    }
      type=type.toLowerCase()
      if(!url){
        if(type=='expenditure'){
          url=baseUrl+`/expenditures?branchid=${branchId}`
        }
        else{
          url=baseUrl+`/incomes?branchid=${branchId}`
        }
      }
      else{
        switch(type){
          case 'income':
          url=url.replace(/expenditures/gi,'incomes')
          url=url+`&branchid=${branchId}`
          break;
          case 'expenditure': url=url+`&branchid=${branchId}`
          url=url.replace(/incomes/gi,'expenditures')
          console.log(url)
          break;
          default: break;
        }
      }

      if(category) url=url+`&category=${category}`
      if(month && year){
        month=months.indexOf(month)+1
        url=url+`&month=${month}-${year}`
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
        dispatch(financeSync(actionTypes.FETCH_FINANCE_REPORTS_SUCCESS, res))
      }).catch(err=>{
        dispatch(financeSync(actionTypes.FETCH_FINANCE_REPORTS_FAIL))
      })
  }

}
