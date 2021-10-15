import React, {Component} from "react";
import Chart from "react-google-charts";
import { connect } from 'react-redux';

class TotalSavingsAllBuckets extends Component {
  constructor(props){
    super(props)

    this.state = {
      totalSavedAmount: 0,
      totalNotSavedAmount: 0,
      totalGoalAmount: 0
    }
  }

  componentWillMount() {
    this.props.buckets.map((bucket) => {
      this.state.totalSavedAmount += (bucket.savedAmount/100)
      this.state.totalGoalAmount += (bucket.goalAmount/100)
    })

    this.state.totalNotSavedAmount += (this.state.totalGoalAmount - this.state.totalSavedAmount)
  }

  render(){
    return (
      this.props.buckets.length === 0 ? 
        <div>No Buckets to Show</div>
      :
        <div>
          <Chart
            width={'800px'}
            height={'400px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['TotalBucket', 'TotalAmount'],
              ['Total Savings For All Buckets', this.state.totalSavedAmount],
              ['Amount Left to Save', this.state.totalNotSavedAmount],
            ]}
            options={{
              title: 'Total Savings For All Buckets'
            }}
            rootProps={{ 'data-testid': '2' }}
          />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    buckets: state.buckets
  }
}

export default connect(mapStateToProps)(TotalSavingsAllBuckets);