import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './expenseForm';
import { startAddExpense } from '../../Actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/expenses');
  }
  
  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Add Expense</h1>
          </div>
        </div>
        <div>
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);