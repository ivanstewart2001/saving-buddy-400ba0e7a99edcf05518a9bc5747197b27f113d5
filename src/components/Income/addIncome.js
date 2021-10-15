import React from 'react';
import { connect } from 'react-redux';
import IncomeForm from './incomeForm';
import { startAddIncome } from '../../Actions/income';

export class AddIncomePage extends React.Component {
  onSubmit = (income) => {
    this.props.startAddIncome(income);
    this.props.history.push('/income');
  }
  
  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Add Income</h1>
          </div>
        </div>
        <div>
          <IncomeForm onSubmit={this.onSubmit} />
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddIncome: (income) => dispatch(startAddIncome(income))
});

export default connect(undefined, mapDispatchToProps)(AddIncomePage);