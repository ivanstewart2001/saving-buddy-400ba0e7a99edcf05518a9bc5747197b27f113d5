const bucketsReducersDefaultState = []

const bucketsReducer = (state = bucketsReducersDefaultState, action) => {
    switch(action.type){
        case 'ADD_BUCKET':
            return [
                ...state,
                action.bucket
            ]
        case 'REMOVE_BUCKET':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_BUCKET':
            return state.map((bucket) => {
                if (bucket.id === action.id) {
                    return {
                        ...bucket,
                        ...action.updates
                    }
                } else {
                    return bucket
                }
            })
        case 'SET_BUCKETS':
            return action.buckets
        default:
            return state
    }
}

export default bucketsReducer