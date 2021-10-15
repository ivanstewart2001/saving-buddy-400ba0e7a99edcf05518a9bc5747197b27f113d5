import React, {Component} from "react";
import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

class IncomeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: props.income ? moment(props.income.date) : '',
            description: props.income ? props.income.description : '',
            amount: props.income ? (props.income.amount/100).toString() : '',
            error: '',
            calanderFocused: false,
        }
    }


    onDateChange = (date) => {
        if (date) {
          this.setState(() => ({ date : date }))
        }
      }

    onDescriptionChange = (i) => {
        const description = i.target.value
        this.setState(() => ({ description: description }))
      }
      
    onAmountChange = (i) => {
        const amount= i.target.value
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount: amount }))
        }
      }

      onFocusChange = ({ focused }) => {
        this.setState(() => ({ calanderFocused: focused }))
      }
    
      onSubmit = (i) => {
        i.preventDefault()

        if (!this.state.description || !this.state.amount || !this.state.date) {
            this.setState(() => ({ error: 'Plase provide the description and amount.'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                description: this.state.description,
                date : this.state.date._d.toDateString(),
                amount: parseFloat(this.state.amount, 10) * 100,
            })
        }
      }

      render(){
        return (
          <div>
            <form onSubmit={this.onSubmit}>
              {this.state.error && <p>{this.state.error}</p>}
              <label for="description">Description:</label>
              <input autoFocus type="text" id="description" name="description" value={this.state.description} onChange={this.onDescriptionChange}/>
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
              <button>Save Income</button>
            </form>
          </div>
        )
      }

      
}
export default IncomeForm