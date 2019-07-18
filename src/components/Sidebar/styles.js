import { fade } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
const styles= theme =>({
  sideBar:{
    width:'100%',
    minHeight:'100%',
  },
  aside:{
    width:'40%',
    height:'100%',
    position:'fixed',
    zIndex:900,
    boxShadow:'0px 2px 6px -1px rgba(0,0,0,0.2), 0px 4px 8px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.up('sm')]:{
      width:'30%'
    },
    [theme.breakpoints.up('md')]:{
      width:'20%'
    }
  },
  list:{
    width:'100%',
    paddingTop:'90px',
    '& a':{
      color:'inherit',
      display:'flex',
      width:'100%',
      textDecoration:'none',
      '&:hover':{
        '& svg,div>span':{
          color:fade(purple.A200, 0.5)
        },
      },
    }
  },
  divider:{
    width:'100%',
    height:'1px'
  },
  links:{
    '& span':{
      marginLeft:theme.spacing(2),
      textAlign:'center',
      fontSize:'11px',
      color:theme.palette.secondary.main,
      '@media screen and (min-width:706px)':{
        fontSize:'13px'
      }
    }
  }
})

export default styles
