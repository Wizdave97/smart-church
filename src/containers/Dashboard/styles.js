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
      maxHeight:'450px',
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
      alignSelf:'flex-start',
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
      flexWrap:'nowrap',
      padding:'0px 30px 0px 0px',
      boxSizing:'border-box',
      '& p':{
        textAlign:'left'
      },
      [theme.breakpoints.down('sm')]:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2)
      }
    },
    card1:{
      backgroundImage:'linear-gradient(to right, rgba(255,94,58,0.6),rgba(255,94,58,1))'
    },
    card2:{
      backgroundImage:'linear-gradient(to right, rgba(255,149,0,0.6),rgba(255,149,0,1))'
    },
    card3:{
      backgroundImage:'linear-gradient(to right, rgba(118,200,14,0.6),rgba(118,200,14,1))'
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
