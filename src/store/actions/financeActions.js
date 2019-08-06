import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

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
        case 'income':
          url+='/incomes';
          break;
        case 'expenditure':
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
        if(res.status!==200){
          return null
        }
        return res.json()
      }).then(res=>{
        dispatch(financeSync(actionTypes.POST_FINANCE_SUCCESS))
        console.log(res)
      }).catch(err=>{
        dispatch(financeSync(actionTypes.POST_FINANCE_FAIL))
        console.log(err)
      })


  }

}
