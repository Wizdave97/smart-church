export const toggleTheme  = (mode) =>{
  return {
    type:mode?'DARK_MODE':'LIGHT_MODE'
  }
}
