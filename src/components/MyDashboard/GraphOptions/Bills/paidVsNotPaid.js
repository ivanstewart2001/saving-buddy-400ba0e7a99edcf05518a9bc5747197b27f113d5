import React, {Component} from "react";
import Chart from "react-google-charts";
import { connect } from 'react-redux';

class PaidVsNotPaid extends Component {
  constructor(props){
    super(props)

    this.state = {
      totalPaidBills: 0,
      totalUnpaidBills: 0
    }
  }

  componentWillMount() {
    this.props.bills.map((bill) => {
      if (bill.paid === 'yes'){
        this.state.totalPaidBills += (bill.amount/100)
      } else if (bill.paid === 'no'){
        this.state.totalUnpaidBills += (bill.amount/100)
      }
    })
  }

  render(){
    return (
      this.props.bills.length === 0 ? 
        <div>No Bills to Show</div>
      :
        <div>
          <Chart
            width={'800px'}
            height={'400px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['BillType', 'BillTypeAmount'],
              ['Paid Bills', this.state.totalPaidBills],
              ['Unpaid Bills', this.state.totalUnpaidBills]
            ]}
            options={{
              title: 'Paid Bills VS Not Paid Bills'
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.bills
  }
}

export default connect(mapStateToProps)(PaidVsNotPaid);