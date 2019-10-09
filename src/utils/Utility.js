 const setValue = (input,setState,e)=>{
  if(e.target.type=='checkbox'){
    setState({[input]:e.target.checked})
    return e
  }
  setState({[input]:e.target.value})
  return e
}
export const submitHandler=(references,setState) => {
  try{
    let validity=references.every(element=>{
      if(element){
        let check=element.checkValidity()
        return check
      }
    })
    if(validity) return validity
    references.map(element=>{
      if(element){
        let check=element.checkValidity()
        if(!check){
          setState({
            ['error'+element.name[0].toUpperCase()+element.name.slice(1)]:true
          })
        }
      }
    })
  }
  catch(e){
    console.log(e)
  }


}
export const handleChange = async (e,setState) =>{
  e.persist()
  await setValue(e.target.name,setState,e)
  let element= e.target
  let errorKey='error'+element.name[0].toUpperCase()+element.name.slice(1)
  errorKey.trim();
  if(!element.checkValidity()){
    setState({
      [errorKey]:true
    })
  }
  else{
    setState({
      [errorKey]:false
    })
  }
}
