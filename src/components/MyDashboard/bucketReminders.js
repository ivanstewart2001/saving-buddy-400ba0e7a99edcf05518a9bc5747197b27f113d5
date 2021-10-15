import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReminderItem from "./reminderItem";

class BucketReminders extends Component{
    constructor(props){
        super(props)
    }

    isMultiple = (num, multiple) => {
        return num % multiple === 0 ? true : false
    }

    checkFrequency = (bucketFrequency, createdDate) => {
        const currentDate = moment()
        const daysPassed = currentDate.diff(createdDate, 'days')

        if (bucketFrequency === 'daily') {
            return true
        } else if (bucketFrequency === 'weekly') {
            return this.isMultiple(daysPassed, 7)
        } else if (bucketFrequency === 'biWeekly') {
            return this.isMultiple(daysPassed, 14)
        } else if (bucketFrequency === 'monthly') {
            return this.isMultiple(daysPassed, 30)
        }
    }

    filterBuckets = () => {
        const filteredBuckets = []
        this.props.buckets.map((bucket) => {
            if (this.checkFrequency(bucket.reminderFrequency, bucket.startDate)) {
                filteredBuckets.push(bucket)
            }
        })

        return filteredBuckets
    }

    render(){
        return (
            <div>
                <h5>Bucket Reminders</h5>
                {
                    this.props.buckets.length === 0 ? (
                        <p>No reminders</p>
                    ) : (
                        this.filterBuckets().map((bucket) => {
                            const endDate = moment(bucket.endDate)
                            const amountLeft = (bucket.goalAmount/100) - (bucket.savedAmount/100)
                            const today = moment().format()
                            const daysUntilOver = endDate.diff(today, 'days')
                            return <ReminderItem type="bucket" daysUntilOver={daysUntilOver} title={bucket.title} amountLeft={amountLeft} />
                        })
                    )
                }
            </div>
        )

        
    }

}

const mapStateToProps = (state) => {
    return{
        buckets: state.buckets
    }
}
export default connect(mapStateToProps)(BucketReminders)