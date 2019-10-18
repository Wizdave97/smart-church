
const styles = theme =>({
    root:{
      minHeight:'calc(100% - 64px)',
      width:'100%',
      display:'flex',
      flexWrap:'wrap',
      marginTop:'56px',
      position:'absolute',
      left:0,
      transition: theme.transitions.create(['left'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]:{
        width:`calc(100% - ${theme.spacing(9) + 1}px)`,
        left:theme.spacing(9) + 1,
        marginTop:'66px'
      },
    },
    rootElement:{
      padding:'0'
    },
    main:{
        width:'100%',
        minHeight:'100%',
        display:'flex',
        flexWrap:'wrap'
    },
    pageInfo:{
      display:'block',
      width:'100%',
      //height:'100px',
      paddingTop:'10px',
      boxSizing:'border-box',
    },
    title:{
      width:'100%',
      display:'flex',
      flexWrap:'nowrap',
      padding:'2px 8px',
      boxSizing:'border-box',
      '& h2':{
        alignSelf:'center'
      },
      '& div':{
        width:'64px',
        height:'64px',
        padding:'2px',
        boxSizing:'border-box',
        alignSelf:'center',
        display:'inline-block',
        '& img':{
          width:'100%',
          height:'auto'
        }
      }
    },
    titleText:{
      fontSize:'1rem',
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.8rem'
      }
    },
    gradient:{
      position:'fixed',
      width:'100%',
      height:'10px',
      left:0,
      top:0,
      zIndex:1500,
      backgroundImage:'linear-gradient(to right,rgb(195,226,121),rgb(247,254,200),rgb(255,208,105),rgb(242,118,105),rgb(220,156,190),rgb(197,154,224),rgb(150,157,204))'
    },
    fab: {
      margin: theme.spacing(1),
      position:'fixed',
      right:'50px',
      bottom:'50px',
      zIndex:'1000'
   },
   menuNav:{
     width:'100%',
     postion:'fixed',
     display:'flex',
     justifyContent:'space-between',
     bottom:0,
     left:0
   },
   list: {
   width: 250,
 }
})

export default styles
