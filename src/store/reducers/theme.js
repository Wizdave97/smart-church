import { updateObject } from '../utility';
import { red } from '@material-ui/core/colors'
const initialState={
  overrides:{
      MuiTypography:{
          'body1':{
              fontFamily:'"PT Sans", "Roboto", sans-serif'
          } ,
          'h1':{
            fontFamily:'"Roboto", sans-serif'
          },
          'h2':{
            fontFamily:'"Roboto", sans-serif'
          },
          'h3':{
            fontFamily:'"Sofia", "Roboto", sans-serif'
          },
          'h4':{
            fontFamily:'"Sofia", "Roboto", sans-serif'
          },
          'h5':{
            fontFamily:'"Sofia", "Roboto", sans-serif'
          },
          'h6':{
            fontFamily:'"Sofia", "Roboto", sans-serif'
          }
      }
  },
  typography:{useNextVariants:true},
  palette:{
      type:'light',
      primary:{
          main:'#fafafa'
      },
      secondary:{
          main:'#1565c0'
      },
      error:{
        main:red[500],
      },
      contrastThreshold: 3,
      tonalOffset: 0.2

  }
}

const reducer = (state=initialState,action) =>{
  switch(action.type){
    case 'DARK_MODE': return updateObject(state,{palette:{...state.palette,type:'dark'}})
    case 'LIGHT_MODE': return updateObject(state,{palette:{...state.palette,type:'light'}})
    default: return state
  }
}

export default reducer;
