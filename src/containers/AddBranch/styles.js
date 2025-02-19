import { fade } from '@material-ui/core/styles';
const boxSizing={
  boxSizing:'border-box'
}

const styles = theme =>({
    form:{
      display:'flex',
      width:'100%',
      padding:'20px',
      flexWrap:'wrap',
      ...boxSizing
    },
    paper:{
      borderRadius:'4px',
      border:`1px solid ${fade(theme.palette.common.black,0.325)}`
    },
    title:{
      width:'100%',
      padding:'10px',
      ...boxSizing
    },
    divider:{
      width:'100%',
      height:'1px',
    },
    general:{
      width:'100%',
      display:'flex',
      flexWrap:'wrap',
      padding:'10px',
      ...boxSizing,
    },
    entries:{
      width:'100%',
      display:'flex',
      flexWrap:'wrap',
      ...boxSizing
    },
    entry:{
      width:'100%',
      display:'block',
      padding:'4px',
      ...boxSizing,
    },
    textField:{
      marginTop:theme.spacing(1),
      marginBottom:theme.spacing(1)
    },
    button:{
      width:'100%',
      padding:'8px',
      ...boxSizing
    },
  menu: {
    width:'40%',
  },

})

export default styles;
