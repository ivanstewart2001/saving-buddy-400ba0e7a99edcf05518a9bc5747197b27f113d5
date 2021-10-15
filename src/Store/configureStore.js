import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from '../Reducers/auth'
import expensesReducer from '../Reducers/expenses'
import billsReducer from '../Reducers/bills'
import bucketsReducer from '../Reducers/buckets'
import incomeReducer from '../Reducers/income'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            bills: billsReducer,
            buckets: bucketsReducer,
            expenses: expensesReducer,
            income: incomeReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store
}

