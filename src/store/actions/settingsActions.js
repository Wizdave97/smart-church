import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

export const settingsSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const settingsAsync= (type,data)=>{
  return (dispatch,getState)=>{
      let url;
      switch(type){
        case 'income':
          dispatch(settingsSync(actionTypes.POST_SETTINGS_INCOME_START))
          url=baseUrl+'/inmedium'
          let incomeStreams={category:data}
          if(data.length>0){
            fetch(url,{
              method:'POST',
              mode:'cors',
              body:JSON.stringify(incomeStreams),
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
              dispatch(settingsSync(actionTypes.POST_SETTINGS_INCOME_SUCCESS))
            }).catch(err=>{
              dispatch(settingsSync(actionTypes.POST_SETTINGS_INCOME_FAIL))
            })

          }
          else return
          break;
        case 'expenditure':
          dispatch(settingsSync(actionTypes.POST_SETTINGS_EXPENDITURE_START))
           url=baseUrl+'/expenses';
          let expenditureStreams={category:data};
          if (data.length>0){

            fetch(url,{
              method:'POST',
              mode:'cors',
              body:JSON.stringify(expenditureStreams),
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

              dispatch(settingsSync(actionTypes.POST_SETTINGS_EXPENDITURE_SUCCESS))
            }).catch(err=>{
              dispatch(settingsSync(actionTypes.POST_SETTINGS_EXPENDITURE_FAIL))
            })
          }
          else return
          break;
        case 'type':
          dispatch(settingsSync(actionTypes.POST_SETTINGS_TYPES_START))
          url=baseUrl+'/types'
          let staffTypes={name:data}
          if(data.length>0){

            fetch(url,{
              method:'POST',
              mode:'cors',
              body:JSON.stringify(staffTypes),
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
              dispatch(settingsSync(actionTypes.POST_SETTINGS_TYPES_SUCCESS))
            }).catch(err=>{
              dispatch(settingsSync(actionTypes.POST_SETTINGS_TYPES_FAIL))
            })
          }
          else return
          break;
          default: break;
      }
  }
}
