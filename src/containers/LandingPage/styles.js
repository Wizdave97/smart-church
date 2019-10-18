import SmartChurch from '../../assets/smartchurch.png';
import SC from '../../assets/SC.png';


const styles = theme =>({
  toolbar:{
    background:'transparent',
    alignItems:'center'
  },
  title:{
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    flex:1
  },
  logoContainer:{
    alignSelf:'center',
    display:'flex',
    width:'100%',
    justifyContent:'center'
  },
  logo:{
    width:'40px',
    height:'40px',
    backgroundSize:'cover',
    backgroundImage:`url(${SC})`,
    marginRight:'auto',
    alignSelf:'center',
  },
  main:{
    minHeight:'calc(100% - 90px)',
    width:'100%',
    display:'flex',
    flexWrap:'wrap',
    marginTop:'58px',
    [theme.breakpoints.up('sm')]:{
      marginTop:'66px'
    }
  },
  paper:{
    width:'100%',
    padding:0,
    position:'relative',
    display:'flex',
    overflow:'hidden',
    boxShadow:'4px 4px 15px rgba(0,0,0,0.1),-4px -4px 15px rgba(0,0,0,0.1)',
    borderRadius:'25px',
    boxSizing:'border-box',
    border:'8px solid rgba(0,0,0,0.1)',
    '& img':{
      width:'100%'
    }
  },
  getStarted:{
    position:'absolute',
    top:'calc((100% - 42px) / 2)',
    left:'calc((100% - 147px) / 2)',
    zIndex:200
  },
  item:{
    padding:16,
    boxSizing:'border-box',
    display:'flex',
    flexWrap:'wrap'
  },
  overlay:{
    position:'absolute',
    opacity:0.3,
    zIndex:100,
    backgroundColor:'rgba(0,0,0,0.9)',
    width:'100%',
    height:'100%',
    top:0,
    left:0
  },
  divider:{
    alignSelf:'center',
    width:'100%',
    height:2
  }
})
export default styles
