import React, { Component } from "react";
import { connect } from 'react-redux';
import BillItem from "../billItem";
import filterBills from '../../../Filters/bills'
import ProgressBar from 'react-bootstrap/ProgressBar'

export class Paid extends Component {
    constructor (props){
        super(props)

        this.state = {
            filter : this.props.filterBy,
            currentBillTotal : 0,
            currentPaidBillTotal : 0
        }
    }

    render() {
        const bills = filterBills(this.state.filter, this.props.bills)

        this.state.currentBillTotal = 0
        this.state.currentPaidBillTotal = 0

        bills.map((bill) => {
            this.state.currentBillTotal += (bill.amount /100)
            if (bill.paid === 'yes') {
                this.state.currentPaidBillTotal += (bill.amount /100)
            }
        })

        return (
            <div>
                {
                    bills.length === 0 ? 
                        <div>No Bills Match this Filter</div>
                    
                    : 
                        bills.map((bill) => {
                            return <BillItem key={bill.id} {...bill} />;
                        })
                }
                {
                    this.props.bills.length > 0 ? 
                        <div>
                            <ProgressBar now={this.state.currentPaidBillTotal} max={this.state.currentBillTotal} label={`$${this.state.currentPaidBillTotal}`} />
                            <p style={{marginLeft:'90%'}}>Total: ${this.state.currentBillTotal}</p>
                        </div>
                    :
                        <p></p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      bills: state.bills
    }
  }
  
export default connect(mapStateToProps)(Paid);