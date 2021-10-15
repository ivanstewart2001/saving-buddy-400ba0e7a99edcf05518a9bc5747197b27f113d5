import React from 'react';
import { connect } from 'react-redux';
import IncomeForm from './incomeForm';
import { startEditIncome, startRemoveIncome } from '../../Actions/income'

export class EditIncomePage extends React.Component {
  onSubmit = (income) => {
    this.props.startEditIncome(this.props.income.id, income);
    this.props.history.push('/income');
  }

  onRemove = () => {
    this.props.startRemoveIncome({ id: this.props.income.id });
    this.props.history.push('/income');
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Update Income</h1>
          </div>
        </div>
        <div>
          <IncomeForm
            income={this.props.income}
            onSubmit={this.onSubmit}
          />
          <button onClick={this.onRemove}>Remove Income</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  income: state.income.find((income) => income.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditIncome: (id, income) => dispatch(startEditIncome(id, income)),
  startRemoveIncome: (data) => dispatch(startRemoveIncome(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditIncomePage);
