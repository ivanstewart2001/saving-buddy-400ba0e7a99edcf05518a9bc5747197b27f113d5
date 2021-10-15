import React, {Component} from "react";
import IncomeList from './incomeList';
import { connect } from 'react-redux'

class Income extends Component {
    currentTotalIncome = 0

    render(){
        this.props.income.map((income) => {
            this.currentTotalIncome += income.amount
        })
        
        return(
            <div>
                <h1>Income</h1>
                <h3>Month:</h3>
                <IncomeList />
                {
                    this.props.income.length > 0 ?
                        <h3>Total: ${this.currentTotalIncome/100}</h3>
                    :
                        <p></p>
                }
                <a href="/addIncome">Add Income</a>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      income: state.income
    };
  };
  
export default connect(mapStateToProps)(Income);