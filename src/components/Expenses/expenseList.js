import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './expenseItem';
import None from './Options/none';
import Date from './Options/date';
import Category from './Options/category';
import Amount from './Options/amount';
// import selectExpenses from '../../Selectors/expenses';

class ExpenseList extends Component {
  constructor(props){
    super(props)

    this.state = {
      filterOption: 'none',
      filterSelect: 'none'
    }
  }

  onFilterOptionChange = (e) => {
    const filterOption = e.target.value
    this.setState(() => ({ filterOption: filterOption }))
    this.selectFilter(this.state.filterOption)
  }

  onFilterSelectChange = (e) => {
    const filterSelect = e.target.value
    this.setState(() => ({ filterSelect: filterSelect }))
  }

  selectFilter = (filterOption) => {
    if (filterOption === 'amount'){
      return (
        <div>
            <label for="amountOptions">Amount Options</label>
            <select name="amountOptions" id="amountOptions" onChange={this.onFilterSelectChange} value={this.state.filterSelect}>
                <option value="none">None</option>
                <option value="increasing">Increasing</option>
                <option value="decreasing">Decreasing</option>
            </select>
        </div>        
      )
    } else if (filterOption === 'Date') {
      return (
        <div>
            <label for="DateOptions">Date Options</label>
            <select name="DateOptions" id="DateOptions" onChange={this.onFilterSelectChange} value={this.state.filterSelect}>
                <option value="none">None</option>
                <option value="increasing">Increasing</option>
                <option value="decreasing">Decreasing</option>
            </select>
        </div>        
      )
    } else if (filterOption === 'category') {
      return (
        <div>
            <label for="categoryOptions">Category Options</label>
            <select name="categoryOptions" id="categoryOptions" onChange={this.onFilterSelectChange} value={this.state.filterSelect}>
                <option value="none">None</option>
                <option value="Food">Food</option>
                <option value="Groceries">Groceries</option>
                <option value="Shopping">Shopping</option>
                <option value="Auto">Auto</option>
                <option value="Transport">Transport</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Health/Fitness">Health/Fitness</option>
                <option value="other">Other</option>
            </select>
        </div>        
      )
    }
  }

  displayFilter = (filterOption, filterSelect) => {
    if (filterOption === 'none') {
      return <None />
    } else if (filterOption === 'category') {
        return <Category filterBy={filterSelect} x={filterSelect}/>
    } else if (filterOption === 'amount') {
        return <Amount filterBy={filterSelect} x={filterSelect}/>
    } else if (filterOption === 'Date') {
        return <Date filterBy={filterSelect} x={filterSelect}/>
    }  
  }

  render(){
    return (
      <div>
        <div style={{display:'inline-flex', width:'100%'}}>
          <h5>Day</h5>
          <h5>Title</h5>
          <h5>Amount</h5>
          <h5>Category</h5>
        </div>
        <div>
          <label for="filterOption">Filter Option</label>
            <select name="filterOption" id="filterOption" onChange={this.onFilterOptionChange} value={this.state.filterOption}>
                <option value="none">None</option>
                <option value="amount">Amount</option>
                <option value="Date">Due Date</option>
                <option value="category">Category</option>
            </select>
        </div>
        <div>
          {this.selectFilter(this.state.filterOption)}
        </div>
        <div>
          {
            this.props.expenses.length === 0 ? (
              <div>
                <span>No expenses</span>
              </div>
              
            ) : (
              <div>
                {this.displayFilter(this.state.filterOption, this.state.filterSelect)}
              </div>
              )
          }
        </div>
      </div>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(ExpenseList);