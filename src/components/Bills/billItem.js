import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { startEditBill } from '../../Actions/bills'
import { connect } from 'react-redux';

class BillItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: props.id,
      dueDate: props.dueDate,
      title: props.title,
      amount: props.amount,
      category: props.category,
      paid: props.paid ? this.props.paid : ''
    }

    this.bill = null
  }

  componentDidMount = () => {
    this.props.bills.map((currentBill) => {
      if (currentBill.id === this.state.id) {
        this.bill = currentBill
      }
    })
  }

  onPaidChange = (e) => {
    const paid = e.target.checked === true ? 'yes' : 'no'
    this.setState(() => ({ paid: paid }))
    let bill = Object.assign({}, this.bill)
    bill.paid = paid
    this.props.startEditBill(this.state.id, bill);
  }

  render() {
    return (
      <div>
        <Link to={`/updateBill/${this.state.id}`}>
          <div style={{display:'inline-flex'}}>
            <p>{moment(this.state.dueDate).format('MMMM Do, YYYY')}</p>
            <p>{this.state.title}</p>
            <p>{numeral(this.state.amount / 100).format('$0,0.00')}</p>
            <p>{this.state.category}</p>
          </div>
        </Link>
        <input type="checkbox" id={this.state.id} checked={this.state.paid === 'yes' ? true : false} onChange={this.onPaidChange} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.bills
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditBill: (id, bill) => dispatch(startEditBill(id, bill))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillItem);