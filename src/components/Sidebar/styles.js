import { fade } from '@material-ui/core/styles';
const hover={
    color:'#e57373'
}
const drawerWidth = 260;
const styles= theme =>({
  list:{
    width:'100%',
    '& a:hover>div>svg':{
      ...hover
    },
    '& a:hover>div>span':{
      ...hover
    },
    '& a':{
      color:'inherit',
      display:'flex',
      width:'100%',
      textDecoration:'none',
      '&:hover':{
        backgroundColor:'#616161'
      },
    },
  },

  links:{
    '& span':{
      textAlign:'center',
      fontSize:'11px',
      //color:theme.palette.primary.main,
      '@media screen and (min-width:706px)':{
        fontSize:'13px'
      },
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    position:'fixed',
    left:0,
    zIndex:1300,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    paddingTop:'30px',
    width:0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
})

export default styles
