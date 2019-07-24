 const setValue = (input,setState,e)=>{
  setState({[input]:e.target.value})
  return e
}
export const submitHandler=(references,setState) => (event) =>{
  event.preventDefault();
  let validity=references.every(element=>{
    let check=element.checkValidity()
    return check
  })
  references.map(element=>{
    let check=element.checkValidity()
    if(!check){
      setState({
        ['error'+element.name[0].toUpperCase()+element.name.slice(1)]:true
      })
    }
  })
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
