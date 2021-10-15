import React, { Component } from 'react'
import {connect} from 'react-redux'
import unpaidBills from '../../Filters/bills'
import moment from 'moment'
import ReminderItem from './reminderItem'

class BillReminders extends Component {
    constructor(props){
        super(props)
    }

    isMultiple = (num, multiple) => {
        return num % multiple === 0 ? true : false
    }

    checkFrequency = (billFrequency, createdDate) => {
        const currentDate = moment()
        const daysPassed = currentDate.diff(createdDate, 'days')

        if (billFrequency === 'daily') {
            return true
        } else if (billFrequency === 'weekly') {
            return this.isMultiple(daysPassed, 7)
        } else if (billFrequency === 'biWeekly') {
            return this.isMultiple(daysPassed, 14)
        } else if (billFrequency === 'monthly') {
            return this.isMultiple(daysPassed, 30)
        }
    }

    filterBills = () => {
        const filteredBills = []
        const unpaid = unpaidBills(['notPaid'],this.props.bills)
        unpaid.map((bill) => {
            if (this.checkFrequency(bill.reminderFrequency, bill.createdAt)) {
                filteredBills.push(bill)
            }
        })

        return filteredBills
    }

    render(){
        return (
            <div>
                <h5>Bill Reminders</h5>
                {
                    this.props.bills.length === 0 ? (
                        <p>No reminders</p>
                    ) : (
                        this.filterBills().map((bill) => {
                            const dueDate = moment(bill.dueDate)
                            const today = moment().format()
                            const daysUntilDue = dueDate.diff(today, 'days')
                            return <ReminderItem type="bill" daysUntilDue={daysUntilDue} title={bill.title} />
                        })
                    )
                }
            </div>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        bills: state.bills
    }
}
export default connect(mapStateToProps)(BillReminders)