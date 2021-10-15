import React, {Component} from "react";
import Chart from "react-google-charts";
import { connect } from 'react-redux';
import moment from 'moment'
import { extendMoment } from 'moment-range';

const calendar = {
  '01': ['1/1 - 1/7', '1/8 - 1/15', '1/16 - 1/23', '1/24 - 1/31'],
  '02': ['2/1 - 2/7', '2/8 - 2/15', '2/16 - 2/23', '2/24 - 2/28'],
  '03': ['3/1 - 3/7', '3/8 - 3/15', '3/16 - 3/23', '3/24 - 3/31'],
  '04': ['4/1 - 4/7', '4/8 - 4/15', '4/16 - 4/23', '4/24 - 4/30'],
  '05': ['5/1 - 5/7', '5/8 - 5/15', '5/16 - 5/23', '5/24 - 5/31'],
  '06': ['6/1 - 6/7', '6/8 - 6/15', '6/16 - 6/23', '6/24 - 6/30'],
  '07': ['7/1 - 7/7', '7/8 - 7/15', '7/16 - 7/23', '7/24 - 7/31'],
  '08': ['8/1 - 8/7', '8/8 - 8/15', '8/16 - 8/23', '8/24 - 8/31'],
  '09': ['9/1 - 9/7', '9/8 - 9/15', '9/16 - 9/23', '9/24 - 9/30'],
  '10': ['10/1 - 10/7', '10/8 - 10/15', '10/16 - 10/23', '10/24 - 10/31'],
  '11': ['11/1 - 11/7', '11/8 - 11/15', '11/16 - 11/23', '11/24 - 11/30'],
  '12': ['12/1 - 12/7', '12/8 - 12/15', '12/16 - 12/23', '12/24 - 12/31']
}

class ExpensesPerWeek extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentMonth: moment().format('MM'),
      weekOneTotal: 0,
      weekTwoTotal: 0,
      weekThreeTotal: 0,
      weekFourTotal: 0
    }
  }

  componentWillMount() {
    this.getWeekTotals()
  }

  formatDate(date){
    return moment(date).format().slice(0,10)
  }

  formatCalendar = (currentMonth, index) => {
    const curr = calendar[currentMonth][index]
    const currentYear = moment().format('YYYY')
    const splitWeek = curr.split(' - ')
    let daysArr = []
    splitWeek.map((days) => {
      if (Number(days.split('/')[1]) < 10){
        daysArr.push(`0${days.split('/')[1]}`)
      } else {
        daysArr.push(days.split('/')[1])
      }
    })
    return [`${currentYear}-${currentMonth}-${daysArr[0]}`, `${currentYear}-${currentMonth}-${daysArr[1]}`]
  }

  formatRange = (currentMonth, index) => {
    const moments = extendMoment(moment)
    return moments.range(this.formatCalendar(currentMonth, index)[0], this.formatCalendar(currentMonth, index)[1])    
  }

  getWeekTotals = () => {
    this.props.expenses.map((expense) => {
      const currentExpenseMonth = this.formatDate(expense.date).slice(5,7)
      const formatCurrentExpense = this.formatDate(expense.date)
      if (this.state.currentMonth === currentExpenseMonth){
        if (this.formatRange(currentExpenseMonth, 0).contains(moment(formatCurrentExpense))){
          this.state.weekOneTotal += (expense.amount/100)
        } else if (this.formatRange(currentExpenseMonth, 1).contains(moment(formatCurrentExpense))){
          this.state.weekTwoTotal += (expense.amount/100)
        } else if (this.formatRange(currentExpenseMonth, 2).contains(moment(formatCurrentExpense))){
          this.state.weekThreeTotal += (expense.amount/100)
        } else if (this.formatRange(currentExpenseMonth, 3).contains(moment(formatCurrentExpense))){
          this.state.weekFourTotal += (expense.amount/100)
        }
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
            [calendar[`${this.state.currentMonth}`][0], this.state.weekOneTotal, 'yellow', null],
            [calendar[`${this.state.currentMonth}`][1], this.state.weekTwoTotal, 'blue', null],
            [calendar[`${this.state.currentMonth}`][2], this.state.weekThreeTotal, 'magenta', null],
            [calendar[`${this.state.currentMonth}`][3], this.state.weekFourTotal, 'green', null]
          ]}
          options={{
            title: 'Total Expenses by Week',
            width: 1000,
            height: 400,
            bar: { groupWidth: '95%' },
            legend: { position: 'none' },
            hAxis: {title:'Week'},
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

export default connect(mapStateToProps)(ExpensesPerWeek);