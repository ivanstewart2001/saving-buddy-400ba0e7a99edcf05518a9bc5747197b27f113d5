import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { startEditBill, startRemoveBill } from '../../Actions/bills'
import None from './Options/none';
import Category from './Options/category';
import Amount from './Options/amount';
import DueDate from './Options/dueDate'
import Paid from './Options/paid';
import NotPaid from './Options/notPaid'

class BillList extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentDate: moment().format().slice(0,10),
      filterOption: 'none',
      filterSelect: 'none'
    }
  }

  formatDueDate(dueDate){
    return moment(dueDate).format().slice(0,10)
  }

  hasSevenDaysPassed(billDueDate){
    const dayDifference = moment(this.state.currentDate).diff(billDueDate, 'days')
    if (dayDifference > 7){
      return true
    } else {
      return false
    }
  }

  hasFourteenDaysPassed(billDueDate){
    const dayDifference = moment(this.state.currentDate).diff(billDueDate, 'days')
    if (dayDifference > 14){
      return true
    } else {
      return false
    }
  }

  hasThirtyDaysPassed(billDueDate){
    const dayDifference = moment(this.state.currentDate).diff(billDueDate, 'days')
    if (dayDifference > 30){
      return true
    } else {
      return false
    }
  }

  deleteAfterSevenDaysAndPaid(){
    this.props.bills.map((bill) => {
      if ((bill.paid === 'yes') && (this.hasSevenDaysPassed(this.formatDueDate(bill.dueDate))) && (bill.frequency === '' || "none")){
        this.props.startRemoveBill({ id: bill.id })
      }
    })
  }

  updatePaidIfSetToRecur(){
    this.props.bills.map((bill) => {
      if ((bill.paid === 'yes') && (bill.frequency !== '' || 'none')){
        if((bill.frequency === 'weekly') && (this.hasSevenDaysPassed(this.formatDueDate(bill.dueDate)))){
          let tempBill = Object.assign({}, bill)
          tempBill.paid = 'no'
          tempBill.dueDate = moment(tempBill.dueDate).add(7, 'days')
          this.props.startEditBill(bill.id, tempBill)
        }
        if((bill.frequency === 'biWeekly') && (this.hasFourteenDaysPassed(this.formatDueDate(bill.dueDate)))){
          let tempBill = Object.assign({}, bill)
          tempBill.paid = 'no'
          tempBill.dueDate = moment(tempBill.dueDate).add(14, 'days')
          this.props.startEditBill(bill.id, tempBill)
        }
        if((bill.frequency === 'monthly') && (this.hasThirtyDaysPassed(this.formatDueDate(bill.dueDate)))){
          let tempBill = Object.assign({}, bill)
          tempBill.paid = 'no'
          tempBill.dueDate = moment(tempBill.dueDate).add(30, 'days')
          this.props.startEditBill(bill.id, tempBill)
        }
      }
    })
  }

  componentDidMount(){
    this.deleteAfterSevenDaysAndPaid()
    this.updatePaidIfSetToRecur()
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
    } else if (filterOption === 'dueDate') {
      return (
        <div>
            <label for="dueDateOptions">Due Date Options</label>
            <select name="dueDateOptions" id="dueDateOptions" onChange={this.onFilterSelectChange} value={this.state.filterSelect}>
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
                <option value="rent">Rent/Mortagage</option>
                <option value="utilities">Utilities</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="phone">Phone</option>
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
    } else if (filterOption === 'dueDate') {
        return <DueDate filterBy={filterSelect} x={filterSelect}/>
    } else if (filterOption === 'paid') {
      return <Paid filterBy={['paid', 'none']}/>
    } else if (filterOption === 'notPaid') {
      return <NotPaid filterBy={['notPaid', 'none']}/>
    }
  }

  render() {
    return (
      <div>
        <div style={{display:'inline-flex', width:'100%'}}>
          <h5>Due Date</h5>
          <h5>Title</h5>
          <h5>Amount</h5>
          <h5>Category</h5>
          <h5>Paid</h5>
        </div>
        <div>
          <label for="filterOption">Filter Option</label>
            <select name="filterOption" id="filterOption" onChange={this.onFilterOptionChange} value={this.state.filterOption}>
                <option value="none">None</option>
                <option value="amount">Amount</option>
                <option value="paid">Paid</option>
                <option value="notPaid">Not Paid</option>
                <option value="dueDate">Due Date</option>
                <option value="category">Category</option>
            </select>
        </div>
        <div>
          {this.selectFilter(this.state.filterOption)}
        </div>
        <div>
          {
            this.props.bills.length === 0 ? (
              <div>
                <span>No Bills</span>
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
    bills: state.bills
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditBill: (id, bill) => dispatch(startEditBill(id, bill)),
  startRemoveBill: (data) => dispatch(startRemoveBill(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillList);
