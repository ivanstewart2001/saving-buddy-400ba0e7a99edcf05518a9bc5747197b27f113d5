const incomeReducersDefaultState = []

const incomeReducer = (state = incomeReducersDefaultState, action) => {
    switch(action.type){
        case 'ADD_INCOME':
            return [
                ...state,
                action.income
            ]
        case 'REMOVE_INCOME':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_INCOME':
            return state.map((income) => {
                if (income.id === action.id) {
                    return {
                        ...income,
                        ...action.updates
                    }
                } else {
                    return income
                }
            })
        case 'SET_INCOME':
            return action.income
        default:
            return state
    }
}

export default incomeReducer