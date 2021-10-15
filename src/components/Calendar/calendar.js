import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {connect} from "react-redux"

import {
    Scheduler,
    DayView,
    Appointments,
    MonthView,
    WeekView,
    TodayButton,
    ViewSwitcher,
    Toolbar,
    DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui'
import moment from "moment"

class Calendar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: this.format(),
          currentDate: moment().format()
        }
    }

    format = () => {
        const x = []
        let count = 0
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        this.props.bills.map((bill) => {
            const splitted = bill.dueDate.split(' ')
            const year = splitted[3]
            const month = months.indexOf(splitted[1])
            const day = splitted[2]
            x.push({id:count, title: bill.title, startDate: new Date(year, month, day, 8,30), endDate: new Date(year, month, day, 11, 30), ownerId: 1})
            count += 1
        })

        this.props.buckets.map((bucket) => {
            const splitted = bucket.endDate.split(' ')
            const year = splitted[3]
            const month = months.indexOf(splitted[1])
            const day = splitted[2]
            x.push({id:count, title: bucket.title, startDate: new Date(year, month, day, 11,45), endDate: new Date(year, month, day, 12, 0), ownerId: 2}) 
            count += 1 
        })

        return x
    }

    render(){
        const { data, currentDate } = this.state;

        return(
            <div>
                <h3>Calendar Page</h3>
                <Paper>
                    <Scheduler
                        data={data}
                   // height={660}
                    >
                    <ViewState
                        defaultCurrentDate={currentDate}
                        onCurrentDateChange={this.onCurrentDateChange}
                    />
                    <DayView
                        startDayHour={0}
                        endDayHour={25}
                     />
                    <WeekView
                        startDayHour={0}
                        endDayHour={24}
                    />
                    <MonthView
                        startDayHour={9}
                        endDayHour={14}
                    />
                    <Appointments />
                    <Toolbar/>
                    <ViewSwitcher/>
                    <DateNavigator/>
                    </Scheduler>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       buckets : state.buckets, bills: state.bills
    }
}

export default connect(mapStateToProps)(Calendar)
