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
    width:'140px',
    height:'40px',
    backgroundSize:'cover',
    backgroundImage:`url(${SmartChurch})`,
    marginRight:'auto',
    alignSelf:'center',
    [theme.breakpoints.down('sm')]:{
      backgroundImage:`url(${SC})`,
      width:'40px',
    }
  },
  main:{
    minHeight:'calc(100% - 90px)',
    width:'100%',
    display:'flex',
    flexWrap:'wrap',
    maginTop:'58px',
    [theme.breakpoints.up('sm')]:{
      marginTop:'66px'
    }
  },
})
export default styles
