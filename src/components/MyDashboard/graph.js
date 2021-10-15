import React, {Component} from "react";
import PaidVsNotPaid from './GraphOptions/Bills/paidVsNotPaid'
import TotalSavingsAllBuckets from './GraphOptions/Buckets/totalSavingsAllBuckets'
import TotalSavingsPerBucket from './GraphOptions/Buckets/totalSavingsPerBucket'
import ExpensesPerDay from './GraphOptions/Expenses/expensesPerDay'
import ExpensesPerWeek from './GraphOptions/Expenses/expensesPerWeek'
import ExpensesPerMonth from './GraphOptions/Expenses/expensesPerMonth'

class DashBoardGraph extends Component {
  constructor(props){
    super(props)

    this.state = {
      graphOption: 'bills',
      graphSelect: 'paidVsNotPaid'
    }
  }

  onGraphOptionChange = (e) => {
    const graphOption = e.target.value
    this.setState(() => ({ graphOption: graphOption }))
    this.selectGraph(this.state.graphOption)
  }

  onGraphSelectChange = (e) => {
    const graphSelect = e.target.value
    this.setState(() => ({ graphSelect: graphSelect }))
  }

  selectGraph = (graphOption) => {
    if (graphOption === 'bills'){
      return (
        <div>
          <label for="billOptions">Bill Options</label>
            <select name="billOptions" id="billOptions" onChange={this.onGraphSelectChange} value={this.state.graphSelect}>
                <option value="none">None</option>
                <option value="paidVsNotPaid">Paid VS Not Paid</option>
            </select>
        </div>        
      )
    } else if (graphOption === 'buckets'){
      return (
        <div>
          <label for="bucketOptions">Bucket Options</label>
            <select name="bucketOptions" id="bucketOptions" onChange={this.onGraphSelectChange} value={this.state.graphSelect}>
                <option value="none">None</option>
                <option value="totalSavingsAllBuckets">Total Savings for All Buckets</option>
                <option value="totalSavingsPerBucket">Total Savings for Individual Buckets</option>
            </select>
        </div>        
      )
    } else if (graphOption === 'expenses') {
      return (
        <div>
          <label for="expenseOptions">Expense Options</label>
            <select name="expenseOptions" id="expenseOptions" onChange={this.onGraphSelectChange} value={this.state.graphSelect}>
                <option value="none">None</option>
                <option value="expensesPerDay">Expenses Per Day</option>
                <option value="expensesPerWeek">Expenses Per Week</option>
                <option value="expensesPerMonth">Expenses Per Month</option>
            </select>
        </div>        
      )
    }
  }

  displayGraph = (graphSelect) => {
    if (graphSelect === 'paidVsNotPaid') {
      return <PaidVsNotPaid />
    } else if (graphSelect === 'totalSavingsAllBuckets') {
      return <TotalSavingsAllBuckets />
    } else if (graphSelect === 'totalSavingsPerBucket') {
      return <TotalSavingsPerBucket />
    } else if (graphSelect === 'expensesPerDay') {
      return <ExpensesPerDay />
    } else if (graphSelect === 'expensesPerWeek') {
      return <ExpensesPerWeek />
    } else if (graphSelect === 'expensesPerMonth') {
      return <ExpensesPerMonth />
    }
  }


  render(){
    return (
      <center>
        <div>
          <label for="graphOption">Graph Option</label>
            <select name="graphOption" id="graphOption" onChange={this.onGraphOptionChange} value={this.state.graphOption}>
                <option value="bills">Bills</option>
                <option value="buckets">Buckets</option>
                <option value="expenses">Expenses</option>
            </select>
        </div>
        <div>
          {this.selectGraph(this.state.graphOption)}
        </div>
        <div style={{fontSize: '150px', marginTop:'3%', overflowX:'scroll', height:'400px', border:'1px solid black'}}>
          {this.displayGraph(this.state.graphSelect)}
        </div>
      </center>
    )
  }
}

export default DashBoardGraph