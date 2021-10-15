import React, {Component} from "react";
import Chart from "react-google-charts";
import { connect } from 'react-redux';
import moment from 'moment'

class ExpensesPerMonth extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentYear: moment().format('YYYY'),
      januaryTotal: 0,
      februaryTotal: 0,
      marchTotal: 0,
      aprilTotal: 0,
      mayTotal: 0,
      juneTotal: 0,
      julyTotal: 0,
      augustTotal: 0,
      septemberTotal: 0,
      octoberTotal: 0,
      novemberTotal: 0,
      decemberTotal: 0
    }
  }

  componentWillMount() {
    this.getYearTotals()
  }

  formatDate(date){
    return moment(date).format().slice(0,10)
  }

  getYearTotals = () => {
    this.props.expenses.map((expense) => {
      const formatDate = this.formatDate(expense.date).slice(0,7)
      console.log(formatDate)
      if (formatDate === `${this.state.currentYear}-01`){
        this.state.januaryTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-02`){
        this.state.februaryTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-03`){
        this.state.marchTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-04`){
        this.state.aprilTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-05`){
        this.state.mayTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-06`){
        this.state.juneTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-07`){
        this.state.julyTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-08`){
        this.state.augustTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-09`){
        this.state.septemberTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-10`){
        this.state.octoberTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-11`){
        this.state.novemberTotal += (expense.amount/100)
      } else if (formatDate === `${this.state.currentYear}-12`){
        this.state.decemberTotal += (expense.amount/100)
      }
    })
  }

  render(){
    return (
      this.props.expenses.length === 0 ? 
        <div>No Expenses to Show</div>
      :
        <Chart
          width={'1500px'}
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
            ['January', this.state.januaryTotal, '#4287f5', null],
            ['February', this.state.februaryTotal, '#73c421', null],
            ['March', this.state.marchTotal, '#e6560e', null],
            ['April', this.state.aprilTotal, '#b82525', null],
            ['May', this.state.mayTotal, '#19bce0', null],
            ['June', this.state.juneTotal, '#9719e0', null],
            ['July', this.state.julyTotal, '#e019a4', null],
            ['August', this.state.augustTotal, '#e0195b', null],
            ['September', this.state.septemberTotal, '#43789c', null],
            ['October', this.state.octoberTotal, '#68cc90', null],
            ['November', this.state.novemberTotal, '#bde6a8', null],
            ['December', this.state.decemberTotal, '#80824e', null]
          ]}
          options={{
            title: 'Total Expenses By Month',
            width: 1400,
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

export default connect(mapStateToProps)(ExpensesPerMonth);