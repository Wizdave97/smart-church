import React, { Component, Fragment } from 'react';
import {Paper, Grid, }  from '@material-ui/core';
import { connect } from 'react-redux';
import * as actionTypes  from '../../store/actions/actionTypes';
import { reportSync, fetchReportAsync } from '../../store/actions/reportActions';
import ReportsAnalytics from '../../components/ReportsAnalytics/ReportsAnalytics';



class Analytics extends Component {
    state={

    }
    render(){
      return(
       <Fragment>
          <Grid item xs={12}>
            <ReportsAnalytics
              next={this.props.nextReport}
              first={this.props.firstReport}
              prev={this.props.prevReport}
              onFetchReport={this.props.onFetchReport}
              onUnmount={this.props.onUnmount}
              current_page={this.props.current_page_report}
              total={this.props.totalReport}
              branchId={this.props.branchId}
              reports={this.props.reports}
              fetchReportSuccess={this.props.fetchReportSuccess}
              fetchReportFail={this.props.fetchReportFail}
              fetchReportStart={this.props.fetchReportStart}
              />
          </Grid>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>

          </Grid>
        </Fragment>
      )
    }
}
const mapStateToProps= state=>({
  branchId:state.auth.branchId,
  fetchReportStart:state.report.fetchReportStart,
  fetchReportSuccess:state.report.fetchReportSuccess,
  fetchReportFail:state.report.fetchReportFail,
  totalReport:state.report.total,
  reports:state.report.reports,
  firstReport:state.report.first,
  current_page_report:state.report.current_page,
  nextReport:state.report.next,
  prevReport:state.report.prev
})

const mapDispatchToProps= dispatch=>({
  onFetchReport:(branchId,url=null,day='sunday',month=null,year='2019')=> dispatch(fetchReportAsync(branchId,url,day,month,year)),
  onUnmount:()=> dispatch(reportSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(Analytics);
