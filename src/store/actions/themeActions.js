export const toggleTheme  = (mode) =>{
  console.log(mode)
  return {
    type:mode?'DARK_MODE':'LIGHT_MODE'
  }
}
