
const styles = theme =>({
    root:{
      minHeight:'calc(100% - 90px)',
      width:'100%',
      display:'flex',
      flexWrap:'wrap',
      paddingTop:'90px',
      position:'absolute',
      left:0,
      [theme.breakpoints.up('md')]:{
        width:'75%',
        left:'25%'
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
        width:'10%',
        padding:'2px',
        boxSizing:'border-box',
        alignSelf:'center',
        display:'inline-block',
        [theme.breakpoints.up('md')]:{
          width:'8%',
          padding:'10px',
        },
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
})

export default styles
