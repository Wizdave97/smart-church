
import Red from '../../assets/red.jpg';
import Purple from '../../assets/purple.jpg';
import Blue from '../../assets/blue.jpg';
const styles= theme =>({
    chart:{
      width:'100%',
      padding:'10px',
      display:'flex',
      flexWrap:'wrap',
      boxSizing:'border-box'
    },
    chartTitle:{
      width:'100%',
      display:'flex',
      flexWrap:'nowrap'
    },
    chartContainer:{
      width:'100%',
      margin:'8px',
      backgroundColor:'inherit'
    },
    divider:{
      height:'100%',
      width:'2px',
      marginLeft:theme.spacing.unit,
      marginRight:theme.spacing.unit
    },
    text:{
      width:'100%',
      alignSelf:'center',
      fontSize:'1rem',
      fontWeight:100,
      color:'rgb(255,255,255,0.8)',
      paddingBottom:'4px',
      margin:0
    },
    imageContainer:{
      width:'20%',
      minHeight:'64px',
      display:'flex',
      backgroundColor:'#fff',
      padding:'0px',
      margin:'0px',
      '& svg':{
        alignSelf:'center',
        marginLeft:'auto',
        marginRight:'auto'
      },
      [theme.breakpoints.up('sm')]:{
        width:'45%'
      },
      [theme.breakpoints.up('md')]:{
        width:'35%'
      }
    },
    card:{
      width:'100%',
      display:'flex',
      flexWrap:'wrap',
      padding:'10px 20px',
      boxSizing:'border-box',
      '& p':{
        textAlign:'right'
      },
      minHeight:'120px',
      [theme.breakpoints.down('sm')]:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2)
      }
    },
    card1:{
      backgroundImage:`url(${Purple})`
    },
    card2:{
      backgroundImage:`url(${Blue})`
    },
    card3:{
      backgroundImage:`url(${Red})`
    },
    cards:{
      width:'100%',
      display:'flex',
      flexWrap:'wrap',
      padding:'30px',
      boxSizing:'border-box',
      justifyContent:'space-between'
    }
})

export default styles
