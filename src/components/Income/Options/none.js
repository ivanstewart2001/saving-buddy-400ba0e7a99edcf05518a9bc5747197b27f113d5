import React, { Component } from "react";
import { connect } from 'react-redux';
import IncomeItem from "../incomeItem";
import ProgressBar from 'react-bootstrap/ProgressBar'

export class None extends Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                {
                    this.props.income.map((income) => {
                        return <IncomeItem key={income.id} {...income} />;
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      income: state.income
    }
  }
  
export default connect(mapStateToProps)(None);