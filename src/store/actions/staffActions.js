import * as actionTypes from './actionTypes';
import baseUrl from '../base_url';

export const staffSync = (type,payload=null)=>{
  return{
    type:type,
    payload:payload
  }
}

export const staffAsync= (staffData)=>{
  return (dispatch,getState)=>{
    dispatch(staffSync(actionTypes.POST_STAFF_START))

      let url=baseUrl+'/staffs'
      fetch(url,{
        method:'POST',
        mode:'cors',
        body:JSON.stringify(staffData),
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
        dispatch(staffSync(actionTypes.POST_STAFF_SUCCESS))

      }).catch(err=>{
        dispatch(staffSync(actionTypes.POST_STAFF_FAIL))

      })


  }

}

export const fetchStaffsAsync=(url=null)=>{
  return (dispatch,getState)=>{
    dispatch(staffSync(actionTypes.FETCH_STAFFS_START))
      if(!url){
        url=baseUrl+'/staffs'
      }
      fetch(url,{
        method:'GET',
        mode:'cors',
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  getState().auth.token
        }
      }).then(res=>{
        console.log(res)
        if(res.status!==200){
            return null
        }
        return res.json()
      }).then(res=>{
        console.log('success')
        dispatch(staffSync(actionTypes.FETCH_STAFFS_SUCCESS,res))

      }).catch(err=>{
        console.log('failure')
        dispatch(staffSync(actionTypes.FETCH_STAFFS_FAIL))
      })


  }
}
