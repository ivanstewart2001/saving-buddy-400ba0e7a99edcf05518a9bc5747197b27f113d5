import React, { Component } from "react";
import { connect } from 'react-redux';
import ExpenseItem from "../expenseItem";
import filterExpenses from '../../../Filters/expenses'
import ProgressBar from 'react-bootstrap/ProgressBar'

export class Date extends Component {
    constructor (props){
        super(props)

        this.state = {
            filter : this.props.filterBy,
        }
    }

    render() {
        const expenses = filterExpenses(['Date', this.props.x], this.props.expenses)


        return (
            <div>
                {
                    expenses.length === 0 ? 
                        <div>No Expenses Match this Filter</div>
                    
                    : 
                        expenses.map((expense) => {
                            return <ExpenseItem key={expense.id} {...expense} />;
                        })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      expenses: state.expenses
    }
  }
  
export default connect(mapStateToProps)(Date);