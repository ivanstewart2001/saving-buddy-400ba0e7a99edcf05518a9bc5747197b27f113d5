import React, { Component } from 'react';
import { connect } from 'react-redux';
import BillForm from './billForm';
import { startAddBill } from '../../Actions/bills';

export class AddBillPage extends Component {
  onSubmit = (bill) => {
    this.props.startAddBill(bill);
    this.props.history.push('/bills');
  }
  
  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Add Bill</h1>
          </div>
        </div>
        <div>
          <BillForm onSubmit={this.onSubmit} />
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddBill: (bill) => dispatch(startAddBill(bill))
});

export default connect(undefined, mapDispatchToProps)(AddBillPage);