import React, {Component} from "react";
import BillList from "./billList";

class Bills extends Component {
    render() {
        return(
            <div>
                <h1>Bills</h1>
                <h3>Month:</h3>
                <p>If a Bill is marked as Paid and is not set to recur then it will be deleted 7 days after Bill Due Date</p>
                <BillList />
                <a href="/addBill">Add Bill</a>
            </div>
        )
    }
}

export default Bills
