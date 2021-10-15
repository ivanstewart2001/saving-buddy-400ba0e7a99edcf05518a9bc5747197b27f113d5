import React, { Component } from 'react';
import { connect } from 'react-redux';
import BillForm from './billForm';
import { startEditBill, startRemoveBill } from '../../Actions/bills'

export class EditBillPage extends Component {
  onSubmit = (bill) => {
    this.props.startEditBill(this.props.bill.id, bill)
    this.props.history.push('/bills')
  }

  onRemove = () => {
    this.props.startRemoveBill({ id: this.props.bill.id })
    this.props.history.push('/bills')
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Edit Bill</h1>
          </div>
        </div>
        <div>
          <BillForm
            bill={this.props.bill}
            onSubmit={this.onSubmit}
          />
          <button onClick={this.onRemove}>Remove Bill</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  bill: state.bills.find((bill) => bill.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditBill: (id, bill) => dispatch(startEditBill(id, bill)),
  startRemoveBill: (data) => dispatch(startRemoveBill(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBillPage);
