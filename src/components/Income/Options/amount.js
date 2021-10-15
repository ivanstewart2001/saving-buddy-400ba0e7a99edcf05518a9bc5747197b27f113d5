import React, { Component } from "react";
import { connect } from 'react-redux';
import IncomeItem from "../incomeItem";
import filterIncome from '../../../Filters/income'
import ProgressBar from 'react-bootstrap/ProgressBar'


export class Amount extends Component {
    constructor (props){
        super(props)

        this.state = {
            filter : this.props.filterBy,
        }
    }

    render() {
        const income = filterIncome(['amount', this.props.x], this.props.income)
        console.log(income)

        
        return (
            <div>
                {
                    income.length === 0 ? 
                        <div>No Income Match this Filter</div>
                    
                    : 
                        income.map((income) => {
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
  
export default connect(mapStateToProps)(Amount);