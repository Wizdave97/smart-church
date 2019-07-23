import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chart from 'react-google-charts';
import { Grid,Paper,Typography, Fab,Divider} from '@material-ui/core';
import { ShowChart, Money, Payment} from '@material-ui/icons';
import styles from './styles';

class Dashboard extends Component{

  render(){
    const { classes } = this.props
    return (
      <Fragment>
          <Grid
           item
           xs={12}>
              <Paper square={true} elevation={4} className={classes.cards}>
                  <Typography className={classes.chartTitle}  variant="h3" gutterBottom>Recents</Typography>
                  <Grid item
                        xs={12}
                        sm={3}>
                        <Paper square={true} elevation={4} className={classes.card}>
                          <div className={[classes.imageContainer,classes.card1].join(' ')}>
                            <ShowChart color="primary" />
                          </div>
                          <Divider className={classes.divider}/>
                          <Typography className={classes.text} variant="body1">Attendance</Typography>
                        </Paper>
                  </Grid>
                  <Grid item
                        xs={12}
                        sm={3}>
                        <Paper square={true} elevation={4} className={classes.card}>
                          <div className={[classes.imageContainer,classes.card2].join(' ')}>
                            <Money color="primary" />
                          </div>
                          <Divider className={classes.divider}/>
                          <Typography className={classes.text} variant="body1">Income</Typography>
                        </Paper>
                  </Grid>
                  <Grid item
                        xs={12}
                        sm={3}>
                        <Paper square={true} elevation={4} className={classes.card}>
                          <div className={[classes.imageContainer,classes.card3].join(' ')}>
                            <Payment color="primary"/>
                          </div>
                          <Divider className={classes.divider}/>
                          <Typography className={classes.text} variant="body1">Expenditure</Typography>
                        </Paper>
                  </Grid>
              </Paper>
           </Grid>
          <Grid
          item
          xs={12}
          md={6}
          xl={4}>
            <Paper square={true} elevation={3} className={classes.chart}>
                <div className={classes.chartTitle}>
                    <Typography variant='h3' style={{flex:1}} >Attendance</Typography>
                    <Fab variant="extended" size="small" color="secondary"><Typography variant="body1">Expand</Typography></Fab>
                </div>
                <div className={classes.chartContainer} id='attendance'>
                    <Chart
                    width={'100%'}
                    height={340}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['City', '2010 Population', '2000 Population'],
                      ['New York City, NY', 8175000, 8008000],
                      ['Los Angeles, CA', 3792000, 3694000],
                      ['Chicago, IL', 2695000, 2896000],
                      ['Houston, TX', 2099000, 1953000],
                      ['Philadelphia, PA', 1526000, 1517000],
                    ]}
                    options={{

                      backgroundColor:'inherit',
                      chart: {
                         title: 'Population of Largest U.S. Cities',
                      },
                      hAxis: {
                         title: 'Total Population',
                         minValue: 0,
                       },
                       vAxis: {
                         title: 'City',
                       },
                       bars: 'horizontal',
                       axes: {
                         y: {
                           0: { side: 'right' },
                         },
                    }}}
                    legendToggle
                    />
                </div>
            </Paper>
          </Grid>
          <Grid
          item
          xs={12}
          md={6}
          xl={4}>
            <Paper square={true} elevation={3} className={classes.chart}>
                <div className={classes.chartTitle}>
                    <Typography variant='h3' style={{flex:1}} >Income</Typography>
                    <Fab variant="extended" size="small" color="secondary"><Typography variant="body1">Expand</Typography></Fab>
                </div>
                <div className={classes.chartContainer} id='attendance'>
                    <Chart
                    width={'100%'}
                    height={340}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      [
                        { type: 'number', label: 'x' },
                        { type: 'number', label: 'values' },
                        { id: 'i0', type: 'number', role: 'interval' },
                        { id: 'i1', type: 'number', role: 'interval' },
                        { id: 'i2', type: 'number', role: 'interval' },
                        { id: 'i2', type: 'number', role: 'interval' },
                        { id: 'i2', type: 'number', role: 'interval' },
                        { id: 'i2', type: 'number', role: 'interval' },
                      ],
                      [1, 100, 90, 110, 85, 96, 104, 120],
                      [2, 120, 95, 130, 90, 113, 124, 140],
                      [3, 130, 105, 140, 100, 117, 133, 139],
                      [4, 90, 85, 95, 85, 88, 92, 95],
                      [5, 70, 74, 63, 67, 69, 70, 72],
                      [6, 30, 39, 22, 21, 28, 34, 40],
                      [7, 80, 77, 83, 70, 77, 85, 90],
                      [8, 100, 90, 110, 85, 95, 102, 110],
                    ]}
                    options={{
                      intervals: { style: 'sticks' },
                      legend: 'none',
                    }}
                    />
                </div>
            </Paper>
          </Grid>
          <Grid
          item
          xs={12}
          md={6}
          xl={4}>
            <Paper square={true} elevation={3} className={classes.chart}>
                <div className={classes.chartTitle}>
                    <Typography variant='h3' style={{flex:1}} >Expenditure</Typography>
                    <Fab variant="extended" size="small" color="secondary"><Typography variant="body1">Expand</Typography></Fab>
                </div>
                <div className={classes.chartContainer} id='attendance'>
                    <Chart
                      width={'100%'}
                      height={'340px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Task', 'Hours per Day'],
                        ['Work', 11],
                        ['Eat', 2],
                        ['Commute', 2],
                        ['Watch TV', 2],
                        ['Sleep', 7],
                      ]}
                      options={{
                        title: 'My Daily Activities',
                      }}
                      rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </Paper>
          </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Dashboard);
