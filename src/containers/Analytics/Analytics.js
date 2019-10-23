import React, { Component, Fragment } from 'react';
import { Grid }  from '@material-ui/core';
import { connect } from 'react-redux';
import * as actionTypes  from '../../store/actions/actionTypes';
import { reportSync, fetchReportAsync } from '../../store/actions/reportActions';
import FinanceAnalytics from '../../components/FinanceAnalytics/FinanceAnalytics';
import AttendanceAnalytics from '../../components/AttendanceAnalytics/AttendanceAnalytics';
import { financeSync, fetchFinanceAsync } from '../../store/actions/financeActions';



class Analytics extends Component {
    state={

    }
    render(){
      return(
       <Fragment>
         <Grid item xs={12}>
           <AttendanceAnalytics
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
            <FinanceAnalytics
              token={this.props.token}
              next={this.props.next}
              first={this.props.first}
              prev={this.props.prev}
              onFetchFinance={this.props.onFetchFinance}
              onUnmount={this.props.onFinanceUnmount}
              current_page={this.props.current_page}
              total={this.props.total}
              branchId={this.props.branchId}
              data={this.props.financeReports}
              fetchFinanceSuccess={this.props.fetchFinanceSuccess}
              fetchFinanceFail={this.props.fetchFinanceFail}
              fetchFinanceStart={this.props.fetchFinanceStart}
              />
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
  prevReport:state.report.prev,
  token:state.auth.token,
  fetchFinanceStart:state.finance.fetchFinanceStart,
  fetchFinanceSuccess:state.finance.fetchFinanceSuccess,
  fetchFinanceFail:state.finance.fetchFinanceFail,
  total:state.finance.total,
  financeReports:state.finance.reports,
  first:state.finance.first,
  next:state.finance.next,
  prev:state.finance.prev,
  current_page:state.finance.current_page
})

const mapDispatchToProps= dispatch=>({
  onFetchReport:(branchId,url,day,month,year)=> dispatch(fetchReportAsync(branchId,url,day,month,year)),
  onUnmount:()=> dispatch(reportSync(actionTypes.RESET)),
  onFetchFinance:(branchId,url,type,category,month,year)=> dispatch(fetchFinanceAsync(branchId,url,type,category,month,year)),
  onFinanceUnmount:()=> dispatch(financeSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(Analytics);
