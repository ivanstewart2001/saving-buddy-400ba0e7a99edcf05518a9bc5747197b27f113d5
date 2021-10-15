import React, {Component} from "react";
import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

class BillForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
          title : props.bill ? props.bill.title : '',
          dueDate : props.bill ? moment(props.bill.dueDate) : '',
          amount: props.bill ? (props.bill.amount / 100).toString() : '',
          frequency: props.bill ? props.bill.frequency : '',
          reminderFrequency: props.bill ? props.bill.reminderFrequency : '',
          category: props.bill ? props.bill.category : '',
          notes: props.bill ? props.bill.notes : '',
          paid: props.bill ? props.bill.paid : 'no',
          error: '',
          calanderFocused: false,
        }
    }

    onTitleChange = (e) => {
        const title = e.target.value
        this.setState(() => ({ title: title }))
    }

    onPaidChange = (e) => {
        const paid = e.target.value
        this.setState(() => ({ paid: paid }))
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calanderFocused: focused }))
    }

    onNotesChange = (e) => {
        const notes = e.target.value
        this.setState(() => ({ notes: notes }))
    }

    onFrequencyChange = (e) => {
        const frequency = e.target.value
        this.setState(() => ({ frequency: frequency }))
    }

    onReminderFrequencyChange = (e) => {
        const reminderFrequency = e.target.value
        this.setState(() => ({ reminderFrequency: reminderFrequency }))
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

    onDateChange = (dueDate) => {
        if (dueDate) {
            this.setState(() => ({ dueDate : dueDate }))
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
    
        if (!this.state.title || !this.state.amount || !this.state.dueDate) {
            this.setState(() => ({ error: 'Plase provide title, amount, and due date.'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                title: this.state.title,
                dueDate : this.state.dueDate._d.toDateString(),
                amount: parseFloat(this.state.amount, 10) * 100,
                frequency: this.state.frequency,
                reminderFrequency: this.state.reminderFrequency,
                category: this.state.category,
                paid: this.state.paid,
                notes: this.state.notes,
                createdAt: moment().format().slice(0,10)
            })
        }
    }

    render () {
        return (
        <div>
            <form onSubmit={this.onSubmit}>
                {this.state.error && <p>{this.state.error}</p>}
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" onChange={this.onTitleChange} value={this.state.title}/>
                <br />
                <label for="dueDate">Due Date:</label>
                <SingleDatePicker
                    date={this.state.dueDate}
                    onDateChange={this.onDateChange}
                    focused={this.state.calanderFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <br />
                <label for="amount">Amount:</label>
                <input type="number" id="amount" name="amount" onChange={this.onAmountChange} value={this.state.amount}/>
                <br />
                <label for="frequency">Payment Frequency:</label>
                <select name="frequency" id="frequency" onChange={this.onFrequencyChange} value={this.state.frequency}>
                    <option value="none">None</option>
                    <option value="weekly">Weekly</option>
                    <option value="biWeekly">Bi Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <br />
                <label for="reminderFrequency">Reminder Frequency:</label>
                <select name="reminderFrequency" id="reminderFrequency" onChange={this.onReminderFrequencyChange} value={this.state.reminderFrequency}>
                    <option value="none">None</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biWeekly">Bi Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <br />
                <label for="category">Category:</label>
                <select name="category" id="category" onChange={this.onCategoryChange} value={this.state.category}>
                    <option value="none">None</option>
                    <option value="Rent/Mortgage">Rent/Mortgage</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Phone">Phone</option>
                    <option value="Other">Other</option>
                </select>
                <br />
                <label for="paid">Paid:</label>
                <select name="paid" id="paid" onChange={this.onPaidChange} value={this.state.paid}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <br />
                <label for="notes">Notes:</label>
                <textarea type="text" id="notes" name="notes" onChange={this.onNotesChange} value={this.state.notes} />
                <br />
                <button>Save Expense</button>
            </form>
        </div>
        )
    }
}

export default BillForm