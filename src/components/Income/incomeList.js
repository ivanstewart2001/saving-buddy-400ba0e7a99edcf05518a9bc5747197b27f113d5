import React, { Component } from 'react';
import { connect } from 'react-redux';
import IncomeItem from './incomeItem';
import None from "./Options/none"
import Amount from './Options/amount';
import Date from './Options/date'

//import selectIncome from '../../Selectors/income';

class IncomeList extends Component {
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
    } else if (filterOption === 'date') {
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
    } 
  }

  displayFilter = (filterOption, filterSelect) => {
    console.log(filterOption, filterSelect)
    if (filterOption === 'none') {
      console.log('NONE')
      return <None />
    }  else if (filterOption === 'amount') {
      console.log('AMOUNT')
        return <Amount filterBy={filterSelect} x={filterSelect}/>
    } else if (filterOption === 'date') {
      console.log('DATE')
        return <Date filterBy={filterSelect} x={filterSelect}/>
    } 
  }
  render(){
    return (
      <div>
        <div style={{display:'inline-flex', width:'100%'}}>
          <h5>Day</h5>
          <h5>Description</h5>
          <h5>Amount</h5>
        </div>
        <div>
          <label for="filterOption">Filter Option</label>
            <select name="filterOption" id="filterOption" onChange={this.onFilterOptionChange} value={this.state.filterOption}>
                <option value="none">None</option>
                <option value="amount">Amount</option>
                <option value="date">Due Date</option>
            </select>
        </div>
        <div>
          {this.selectFilter(this.state.filterOption)}
        </div>
        <div>
          {
            this.props.income.length === 0 ? (
              <div>
                <span>No income</span>
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
    income: state.income
  };
};

export default connect(mapStateToProps)(IncomeList);