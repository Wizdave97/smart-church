import Auth from '../../assets/bg_1.jpg'
import BG_3 from '../../assets/bg_3.jpg';
const boxSizing={
  boxSizing:'border-box'
}

const styles = theme =>({
  root:{
    width:'100%',
    minHeight:'100%',
    padding:'0 20px',
    paddingBottom:'60px',
    margin:0,
    backgroundImage:`url(${Auth})`,
    backgroundSize:'cover'
  },
  contain:{
    width:'100%',
    display:'flex',
    flexWrap:'wrap',
    padding:0,
    margin:0,
    ...boxSizing
  },
  toolbar:{
    background:'transparent'
  },
  container:{
    marginTop:'90px',
    minHeight:'calc(100% - 90px )'
  },
  gridItem:{
    alignSelf:'center'
  },
  title:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flex:1
  },
  form:{
    marginTop:'8px',
    display:'flex',
    width:'100%',
    padding:'20px',
    flexWrap:'wrap',
    ...boxSizing
  },
  entry:{
    width:'100%',
    padding:'6px',
    boxSizing:'border-box',
  },
  paper:{
    width:'100%',
    padding:0,
    borderRadius:'5px',
    position:'relative'
  },
  gradient:{
    position:'absolute',
    width:'100%',
    height:'8px',
    left:0,
    top:0,
    borderTopLeftRadius:'4px',
    borderTopRightRadius:'4px',
    backgroundImage:'linear-gradient(to right,rgb(195,226,121),rgb(247,254,200),rgb(255,208,105),rgb(242,118,105),rgb(220,156,190),rgb(197,154,224),rgb(150,157,204))'
  },
  button:{
    fontSize:'14px'
  },
  span:{
    color:theme.palette.secondary.main,
    cursor:'pointer'
  }
})

export default styles
