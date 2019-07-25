import { fade } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
const hover={
    color:'#ff7c5f'
}
const styles= theme =>({
  sideBar:{
    width:'100%',
    minHeight:'100%',
    backgroundImage:'linear-gradient(to bottom,#222c3c,#222c3c)'
  },
  space:{
    width:'100%',
    marginTop:'95px'
  },
  section:{
    width:'100%',
    display:'flex',
    flexWrap:'wrap'
  },
  title:{
    width:'100%',
    padding:'8px'
  },
  titleText:{
    color:fade(theme.palette.primary.main,0.7)
  },
  icons:{
    color:fade(theme.palette.primary.main,0.7),
  },
  aside:{
    width:'60%',
    height:'100%',
    position:'fixed',
    overflowY:'scroll',
    overflowX:'hidden',
    zIndex:900,
    backgroundImage:'linear-gradient(to bottom,#222c3c,#222c3c)',
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
    paddingLeft:'10%',
    '& a':{
      color:'inherit',
      display:'flex',
      width:'100%',
      textDecoration:'none',
      '&:hover':{
        backgroundColor:'#313d4f'
      },
      '&:hover>li>svg':{
          ...hover
      },
      '&:hover>li>div>span':{
        ...hover
      }
    },
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
      color:theme.palette.primary.main,
      '@media screen and (min-width:706px)':{
        fontSize:'13px'
      },
    }
  }
})

export default styles
