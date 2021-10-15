import React, { Component } from "react";
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import ExpenseItem from "../expenseItem";

export class None extends Component {
    constructor(){
        super()


    }
    
    render(){


        return (
            <div>
                {
                    this.props.expenses.map((expense) => {
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
  
export default connect(mapStateToProps)(None);