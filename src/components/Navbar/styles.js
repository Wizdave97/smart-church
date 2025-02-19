import { fade } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import SmartChurch from '../../assets/smartchurch.png';
import SC from '../../assets/SC.png';
const query1={
  '@media screen and (max-width:489px)':{
    display:'none'
  }
}
const hover={
  '&:hover':{
    color:'#ff7c5f'
  }
}
const styles= theme =>(
  {
  navbar:{
    display:'flex',
    flexWrap:'nowrap',
    width:'100%',
    padding:0,
    margin:0,
    boxSizing:'border-box',
    background:'transparent'
  },
  toolbar:{
    background:'transparent'
  },
  appbar:{
    backgroundColor:theme.palette.type==='dark'?'#303030':theme.palette.primary.main
  },
  popup:{
    '& a':{
      textDecoration:'none',
      color:'inherit'
    }
  },
  one:{
    width:'33.33%',
    padding:'10px 0',
    display:'flex',
    justifyContent:'space-between',
    boxSizing:'border-box'
  },
  menuIcon:{
    width:'5%',
    alignSelf:'center',
    marginLeft:theme.spacing(2),
    marginRight:theme.spacing(2),
    boxSizing:'border-box',
    cursor:'pointer',
    [theme.breakpoints.up('md')]:{
      display:'none'
    },
    ...hover
  },
  churchName:{
    width:'30%',
    alignSelf:'center',
    marginLeft:theme.spacing(2),
    marginRight:theme.spacing(2),
    boxSizing:'border-box',
    cursor:'pointer',
    [theme.breakpoints.down('sm')]:{
      width:'45%'
    },
    ...query1,
    ...hover
  },
  navText:{
    fontSize:'1.2rem',
    [theme.breakpoints.down('sm')]:{
      fontSize:'1rem'
    },
    [theme.breakpoints.down('xs')]:{
      fontSize:'0.7rem'
    }
  },
  searchBar:{
    width:'65%',
    display:'block',
    alignSelf:'center',
    transition:'2s all ease',
    marginLeft:theme.spacing.unit,
    marginRight:theme.spacing.unit,
    boxSizing:'border-box',
    '@media screen and (max-width:959px)':{
      display:'none'
    }
  },
  two:{
    width:'33.33%',
    display:'flex',
    padding:'10px 0',
    justifyContent:'center',
    boxSizing:'border-box'
  },
  logoContainer:{
    alignSelf:'center',
    display:'flex',
    justifyContent:'center'
  },
  logo:{
    width:'60px',
    height:'60px',
    backgroundSize:'cover',
    backgroundImage:`url(${SC})`,
    alignSelf:'center',
    '& img':{
      width:'100%'
    },
    [theme.breakpoints.up('sm')]:{
      width:'140px',
      height:'40px',
      backgroundImage:`url(${SmartChurch})`
    }
  },
  three:{
    width:'33.33%',
    display:'flex',
    padding:'10px 0',
    justifyContent:'flex-end',
    boxSizing:'border-box'
  },
  iconContainer:{
    width:'100%',
    display:'flex',
    flexWrap:'nowrap',
    justifyContent:'space-between',
    [theme.breakpoints.up('md')]:{
      width:'90%'
    },
    [theme.breakpoints.up('lg')]:{
      width:'75%'
    },
    [theme.breakpoints.down('xs')]:{
      justifyContent:'flex-end'
    }
  },
  icons:{
    flex:1,
    padding:'10px',
    alignSelf:'center',
    boxSizing:'border-box',
    cursor:'pointer',
    [theme.breakpoints.down('xs')]:{
      flex:0
    },
    ...hover
  },
  hide:{
    [theme.breakpoints.down('xs')]:{
      display:'none'
    }
  },
  profileName:{
    flex:2,
    padding:'10px',
    alignSelf:'center',
    boxSizing:'border-box',
    transition:'2s display ease-out',
    [theme.breakpoints.down('sm')]:{
      display:'none',
    },
    '& p':{
      fontSize:'0.7rem',
    }
  },
  search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius*10,
      backgroundColor: fade(theme.palette.common.black, 0.3),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
  },
  searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...hover
  },
  inputRoot: {
      color: 'inherit',
      fontSize:'0.9rem',
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.7rem'
      },
      [theme.breakpoints.down('xs')]:{
        fontSize:'0.5rem'
      }
  },
  inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
  },
  searchButton:{
    width:'30%',
    padding:'20px',
    display:'flex',
    justifyContent:'center',
    boxSizing:'border-box',
    alignSelf:'center',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
      '& svg':{
        color:fade(purple.A200, 0.5)
      }
    },
    transition:'2s all ease',
    [theme.breakpoints.up('md')]:{
      display:'none'
    },

  },
  iconSearch:{
    alignSelf:'center'
  }
  }
)

export default styles
