const billsReducersDefaultState = []

const billsReducer = (state = billsReducersDefaultState, action) => {
    switch(action.type){
        case 'ADD_BILL':
            return [
                ...state,
                action.bill
            ]
        case 'REMOVE_BILL':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_BILL':
            return state.map((bill) => {
                if (bill.id === action.id) {
                    return {
                        ...bill,
                        ...action.updates
                    }
                } else {
                    return bill
                }
            })
        case 'SET_BILLS':
            return action.bills
        default:
            return state
    }
}

export default billsReducer