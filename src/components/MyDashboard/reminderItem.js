import React from "react";

const conditions = (daysUntilDue, title) => {
    if (daysUntilDue === 0) {
        return <p>{title} is due today</p>
    } else if (daysUntilDue < 0) {
        return <p>{title} is past due by {Math.abs(daysUntilDue)} day(s)</p>
    } else {
        return <p>{title} is due in {daysUntilDue} day(s)</p>
    }
}

const bucketconditions = (daysUnitlOver, title, amountLeft) =>{
    if (daysUnitlOver === 0){
        return <p>You have ${amountLeft } left and today is the last day to contribute to {title}</p>
    } else if (daysUnitlOver < 0) {
        return <p>{title} is over</p>
    } else {
        return <p>{title} has ${amountLeft} to contribute and ends in {daysUnitlOver}</p>
    }
}

const ReminderItem = (props) => {
    console.log(props)
    return (
        <div>
            {
                props.type === 'bill' ? (
                    conditions(props.daysUntilDue, props.title)
                ) : (
                    bucketconditions(props.daysUnitlOver, props.title, props.amountLeft)
                )
            }
        </div>
    )
}

export default ReminderItem
