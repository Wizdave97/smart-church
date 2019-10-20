import { updateObject } from '../utility';
import { red,purple } from '@material-ui/core/colors'
const initialState={
  overrides:{
      'MuiTableCell-root':{
        padding:'10px 15px'
      },
      MuiTypography:{
          'body1':{
              fontFamily:'"Open Sans",  sans-serif',
              fontSize:'11.5px'
          } ,
          'h1':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'22px',
            fontWeight:'bolder'
          },
          'h2':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'20px',
            fontWeight:'bolder'
          },
          'h3':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'18px',
            fontWeight:'bolder'
          },
          'h4':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'16px',
            fontWeight:'bolder'
          },
          'h5':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'14px',
            fontWeight:'bolder'
          },
          'h6':{
            fontFamily:'"Roboto", sans-serif',
            fontSize:'12px',
            fontWeight:'bolder'
          }
      }
  },
  typography:{useNextVariants:true},
  palette:{
      type:'light',
      primary:{
          main:'#3b5998',
      },
      secondary:{
          main:'#602f6b'
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
    case 'DARK_MODE': return updateObject(state,{palette:{...state.palette,type:'dark',secondary:{...state.palette.secondary,main:'#bf94e4'},background:{...state.palette.background,paper:"#424242",default:"#303030"}}})
    case 'LIGHT_MODE': return updateObject(state,{palette:{...state.palette,type:'light',secondary:{...state.palette.secondary,main:'#602f6b'},background:{...state.palette.background,paper:'#fff',default:'#f1f1f1'}}})
    default: return state
  }
}

export default reducer;
