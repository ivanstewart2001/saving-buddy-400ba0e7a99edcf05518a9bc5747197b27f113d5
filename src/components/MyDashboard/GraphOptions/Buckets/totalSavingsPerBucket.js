import React, {Component} from "react";
import Chart from "react-google-charts";
import { connect } from 'react-redux';

class TotalSavingsPerBucket extends Component {
  render(){
    return (
      this.props.buckets.length === 0 ? 
        <div>No Buckets to Show</div>
      :
        this.props.buckets.map((bucket) => {
          const totalSavedAmount = bucket.savedAmount
          const totalAmountLeftToSave = (bucket.goalAmount - bucket.savedAmount)
          return (
              <div>
                <Chart
                  width={'800px'}
                  height={'400px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['TotalBucket', 'TotalAmount'],
                    ['Total Savings Buckets', totalSavedAmount],
                    ['Amount Left to Save', totalAmountLeftToSave],
                  ]}
                  options={{
                    title: `${bucket.title}`
                  }}
                  rootProps={{ 'data-testid': '7' }}
                />
              </div>        
          )
        })
    )
  }
}

const mapStateToProps = (state) => {
  return {
    buckets: state.buckets
  }
}

export default connect(mapStateToProps)(TotalSavingsPerBucket);