import React from 'react'
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Bills from '../Bills/bills'
import Buckets from '../Buckets/buckets'
import Calendar from '../Calendar/calendar'
import Expenses from '../Expenses/expenses'
import MyDashboard from '../MyDashboard/myDashboard'
import Tips from '../Tips/tips'
import AddBucket from '../Buckets/addBucket'
import UpdateBucket from '../Buckets/updateBucket'
import AddExpense from '../Expenses/addExpense'
import UpdateExpense from '../Expenses/updateExpense'
import AddBill from '../Bills/addBill'
import UpdateBill from '../Bills/updateBill'
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import LoginPage from '../Authentication/loginPage'
import AddIncome from '../Income/addIncome'
import UpdateIncome from '../Income/updateIncome'
import Income from '../Income/income'

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
      <div>
        <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true} />
            <PrivateRoute path="/myDashboard" exact component={MyDashboard} />
            <PrivateRoute path="/bills" exact component={Bills} />
            <PrivateRoute path="/buckets" exact component={Buckets} />
            <PrivateRoute path="/calendar" exact component={Calendar} />
            <PrivateRoute path="/expenses" exact component={Expenses} />
            <PrivateRoute path="/tips" exact component={Tips} />
            <PrivateRoute path="/addBucket" exact component={AddBucket} />
            <PrivateRoute path="/updateBucket/:id" exact component={UpdateBucket} />
            <PrivateRoute path="/addExpense" exact component={AddExpense} />
            <PrivateRoute path="/updateExpense/:id" exact component={UpdateExpense} />
            <PrivateRoute path="/addBill" exact component={AddBill} />
            <PrivateRoute path="/updateBill/:id" exact component={UpdateBill} />
            <PrivateRoute path="/addIncome" exact component={AddIncome} />
            <PrivateRoute path="/updateIncome/:id" exact component={UpdateIncome} />
            <PrivateRoute path="/income" exact component={Income} />
            <Redirect to="/myDashboard" />
        </Switch> 
      </div>
    </Router>
);

export default AppRouter