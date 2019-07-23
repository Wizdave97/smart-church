import { updateObject } from '../utility';
import { red,purple } from '@material-ui/core/colors'
const initialState={
  overrides:{
      MuiTypography:{
          'body1':{
              fontFamily:'"Open Sans",  sans-serif',
              fontSize:'11.5px'
          } ,
          'h1':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'22px'
          },
          'h2':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'20px'
          },
          'h3':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'18px'
          },
          'h4':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'16px'
          },
          'h5':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'14px'
          },
          'h6':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'12px'
          }
      }
  },
  typography:{useNextVariants:true},
  palette:{
      type:'light',
      primary:{
          main:'#1565c0'
      },
      secondary:{
          main:purple[500]
      },
      error:{
        main:red[500],
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      background:{
        paper:'#fff',
        default:'#f1f1f1'
      }
  }
}

const reducer = (state=initialState,action) =>{
  switch(action.type){
    case 'DARK_MODE': return updateObject(state,{palette:{...state.palette,type:'dark',background:{...state.palette.background,paper:"#424242",default:"#303030"}}})
    case 'LIGHT_MODE': return updateObject(state,{palette:{...state.palette,type:'light',background:{...state.palette.background,paper:'#fff',default:'#f1f1f1'}}})
    default: return state
  }
}

export default reducer;
