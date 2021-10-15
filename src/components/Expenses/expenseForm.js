import React, {Component} from "react";
import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

class ExpenseForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title : props.expense ? props.expense.title : '',
      date : props.expense ? moment(props.expense.date) : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      category: props.expense ? props.expense.category : '',
      notes: props.expense ? props.expense.notes : '',
      error: '',
      calanderFocused: false,
    }
  }
  
  onTitleChange = (e) => {
    const title = e.target.value
    this.setState(() => ({ title: title }))
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calanderFocused: focused }))
  }

  onNotesChange = (e) => {
    const notes = e.target.value
    this.setState(() => ({ notes: notes }))
  }

  onCategoryChange = (e) => {
    const category = e.target.value
    this.setState(() => ({ category: category }))
  }

  onAmountChange = (e) => {
    const amount= e.target.value
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState(() => ({ amount: amount }))
    }
  }

  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ date : date }))
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    if (!this.state.title || !this.state.amount || !this.state.date) {
        this.setState(() => ({ error: 'Plase provide title and amount.'}))
    } else {
        this.setState(() => ({ error: '' }))
        this.props.onSubmit({
            title: this.state.title,
            date : this.state.date._d.toDateString(),
            amount: parseFloat(this.state.amount, 10) * 100,
            category: this.state.category,
            notes: this.state.notes
        })
    }
  }

  render(){
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p>{this.state.error}</p>}
          <label for="title">Title:</label>
          <input autoFocus type="text" id="title" name="title" value={this.state.title} onChange={this.onTitleChange}/>
          <br />
          <label for="date">Date:</label>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={this.onDateChange}
            focused={this.state.calanderFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <br />
          <label for="amount">Amount:</label>
          <input type="number" id="amount" name="amount" value={this.state.amount} onChange={this.onAmountChange}/>
          <br />
          <label for="category">Category:</label>
          <select name="category" id="category" value={this.state.category} onChange={this.onCategoryChange}>
            <option value="none">None</option>
            <option value="Food">Food</option>
            <option value="Groceries">Groceries</option>
            <option value="Shopping">Shopping</option>
            <option value="Auto">Auto</option>
            <option value="Transport">Transport</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Health/Fitness">Health/Fitness</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <label for="notes">Notes:</label>
          <textarea type="text" id="notes" name="notes" value={this.state.notes} onChange={this.onNotesChange}/>
          <br />
          <button>Save Expense</button>
        </form>
      </div>
    )
  }
}

export default ExpenseForm