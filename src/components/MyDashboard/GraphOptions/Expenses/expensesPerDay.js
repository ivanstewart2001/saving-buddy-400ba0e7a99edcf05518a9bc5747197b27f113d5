import React, {Component} from "react";
import Chart from "react-google-charts";
import { connect } from 'react-redux';
import moment from 'moment'

class ExpensesPerDay extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentWeekStart: moment().isoWeekday(1).startOf('week'),
      sundayTotal: 0,
      mondayTotal: 0,
      tuesdayTotal: 0,
      wednesdayTotal: 0,
      thursdayTotal: 0,
      fridayTotal: 0,
      saturdayTotal: 0
    }
  }

  componentWillMount() {
    this.getDayTotals()
  }

  formatDate(date){
    return moment(date).format().slice(0,10)
  }

  getDayTotals = () => {
    const sundayDate = this.formatDate(this.state.currentWeekStart)

    const mondayDate = this.formatDate(this.state.currentWeekStart.add(1, 'days'))
    this.state.currentWeekStart = this.state.currentWeekStart.subtract(1, 'days')

    const tuesdayDate = this.formatDate(this.state.currentWeekStart.add(2, 'days'))
    this.state.currentWeekStart = this.state.currentWeekStart.subtract(2, 'days')

    const wednesdayDate = this.formatDate(this.state.currentWeekStart.add(3, 'days'))
    this.state.currentWeekStart = this.state.currentWeekStart.subtract(3, 'days')

    const thursdayDate = this.formatDate(this.state.currentWeekStart.add(4, 'days'))
    this.state.currentWeekStart = this.state.currentWeekStart.subtract(4, 'days')

    const fridayDate = this.formatDate(this.state.currentWeekStart.add(5, 'days'))
    this.state.currentWeekStart = this.state.currentWeekStart.subtract(5, 'days')

    const saturdayDate = this.formatDate(this.state.currentWeekStart.add(6, 'days'))
    this.state.currentWeekStart = this.state.currentWeekStart.subtract(6, 'days')

    this.props.expenses.map((expense) => {
      const formatDate = this.formatDate(expense.date)
      if (formatDate === sundayDate){
        this.state.sundayTotal += (expense.amount/100)
      } else if (formatDate === mondayDate){
        this.state.mondayTotal += (expense.amount/100)
      } else if (formatDate === tuesdayDate){
        this.state.tuesdayTotal += (expense.amount/100)
      } else if (formatDate === wednesdayDate){
        this.state.wednesdayTotal += (expense.amount/100)
      } else if (formatDate === thursdayDate){
        this.state.thursdayTotal += (expense.amount/100)
      } else if (formatDate === fridayDate){
        this.state.fridayTotal += (expense.amount/100)
      } else if (formatDate === saturdayDate){
        this.state.saturdayTotal += (expense.amount/100)
      }
    })
    

  }

  render(){
    return (
      this.props.expenses.length === 0 ? 
        <div>No Expenses to Show</div>
      :
        <Chart
          width={'1000px'}
          height={'300px'}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            [
              'Day',
              'Amount Spent',
              { role: 'style' },
              {
                sourceColumn: 0,
                role: 'annotation',
                type: 'string',
                calc: 'stringify',
              },
            ],
            ['Sunday', this.state.sundayTotal, 'red', null],
            ['Monday', this.state.mondayTotal, 'blue', null],
            ['Tuesday', this.state.tuesdayTotal, 'orange', null],
            ['Wednesday', this.state.wednesdayTotal, 'purple', null],
            ['Thursday', this.state.thursdayTotal, 'black', null],
            ['Friday', this.state.fridayTotal, 'yellow', null],
            ['Saturday', this.state.saturdayTotal, 'green', null]
          ]}
          options={{
            title: 'Total Expenses By Day',
            width: 1000,
            height: 400,
            bar: { groupWidth: '95%' },
            legend: { position: 'none' },
            hAxis: {title:'Days'},
            vAxis: {title:'Amount'}
          }}
          // For tests
          rootProps={{ 'data-testid': '6' }}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  }
}

export default connect(mapStateToProps)(ExpensesPerDay);