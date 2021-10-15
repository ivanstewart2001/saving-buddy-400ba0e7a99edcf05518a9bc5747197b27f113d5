import React, {Component} from "react";
import MissionStatement from "./missionStatement";
import DashboardGraph from './graph'
import MyOverview from './myOverview'

class MyDashboard extends Component {
  render(){
    return (
      <div>
        <MissionStatement/>
        <DashboardGraph />
        <hr />
        <MyOverview />
      </div>
    )
  }
}

export default MyDashboard