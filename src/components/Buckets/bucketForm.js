import React, {Component} from "react";
import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

class BucketForm extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
          title : props.bucket ? props.bucket.title : '',
          startDate : props.bucket ? moment(props.bucket.startDate) : '',
          endDate : props.bucket ? moment(props.bucket.endDate) : '',
          goalAmount: props.bucket ? (props.bucket.goalAmount / 100).toString() : '',
          savedAmount: props.bucket ? (props.bucket.savedAmount / 100).toString() : '',
          reminderFrequency: props.bucket ? props.bucket.reminderFrequency : '',
          notes: props.bucket ? props.bucket.notes : '',
          error: '',
          startCalanderFocused: false,
          endCalanderFocused: false
        }
    }

    onTitleChange = (e) => {
        const title = e.target.value
        this.setState(() => ({ title: title }))
    }

    onStartFocusChange = ({ focused }) => {
        this.setState(() => ({ startCalanderFocused: focused }))
    }

    onEndFocusChange = ({ focused }) => {
        this.setState(() => ({ endCalanderFocused: focused }))
    }

    onNotesChange = (e) => {
        const notes = e.target.value
        this.setState(() => ({ notes: notes }))
    }

    onGoalAmountChange = (e) => {
        const amount= e.target.value
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ goalAmount: amount }))
        }   
    }

    onSavedAmountChange = (e) => {
        const amount= e.target.value
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ savedAmount: amount }))
        }   
    }

    onStartDateChange = (startDate) => {
        if (startDate) {
            this.setState(() => ({ startDate : startDate }))
        }
    }

    onEndDateChange = (endDate) => {
        if (endDate) {
            this.setState(() => ({ endDate : endDate }))
        }
    }

    onReminderFrequencyChange = (e) => {
        const reminderFrequency = e.target.value
        this.setState(() => ({ reminderFrequency: reminderFrequency }))
    }

    onSubmit = (e) => {
        e.preventDefault()
    
        if (!this.state.title || !this.state.startDate || !this.state.goalAmount) {
            this.setState(() => ({ error: 'Plase provide title, start date, and goal amount.'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                title: this.state.title,
                startDate : this.state.startDate._d.toDateString(),
                endDate : this.state.endDate._d.toDateString(),
                goalAmount: parseFloat(this.state.goalAmount, 10) * 100,
                savedAmount: parseFloat(this.state.savedAmount, 10) * 100,
                reminderFrequency: this.state.reminderFrequency,
                notes: this.state.notes,
                createdAt: moment().format().slice(0,10)
            })
        }
    }

    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" onChange={this.onTitleChange} value={this.state.title} />
                    <br />
                    <label for="startDateDate">Start Date:</label>
                    <SingleDatePicker
                        date={this.state.startDate}
                        onDateChange={this.onStartDateChange}
                        focused={this.state.startCalanderFocused}
                        onFocusChange={this.onStartFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <br />
                    <label for="endDate">End Date:</label>
                    <SingleDatePicker
                        date={this.state.endDate}
                        onDateChange={this.onEndDateChange}
                        focused={this.state.endCalanderFocused}
                        onFocusChange={this.onEndFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <br />
                    <label for="goalAmount">Goal Amount:</label>
                    <input type="number" id="goalAmount" name="goalAmount" onChange={this.onGoalAmountChange} value={this.state.goalAmount}/>
                    <br />
                    <label for="savedAmount">Saved Amount:</label>
                    <input type="number" id="savedAmount" name="savedAmount" onChange={this.onSavedAmountChange} value={this.state.savedAmount}/>
                    <br />
                    <label for="reminderFrequency">Reminder Frequency:</label>
                    <select name="reminderFrequency" id="reminderFrequency" onChange={this.onReminderFrequencyChange} value={this.state.reminderFrequency}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biWeekly">Bi Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                    <br />
                    <label for="notes">Notes:</label>
                    <textarea type="text" id="notes" name="notes" onChange={this.onNotesChange} value={this.state.notes}/>
                    <br />
                    <button>Save Bucket</button>
                </form>
            </div>
        )
    }
}

export default BucketForm