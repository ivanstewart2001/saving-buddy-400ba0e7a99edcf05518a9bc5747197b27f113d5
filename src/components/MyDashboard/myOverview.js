import React, {Component} from "react";
import BillReminders from "./billReminders";
import BucketReminders from "./bucketReminders";

class MyOverview extends Component {
  render(){
    return (
      <div>
          <h4>My Overview</h4>
          <div>
            <BillReminders />
            <BucketReminders/>
            <p><strong>Cash Flow</strong></p>
          </div>
      </div>
    )
  }
}

export default MyOverview