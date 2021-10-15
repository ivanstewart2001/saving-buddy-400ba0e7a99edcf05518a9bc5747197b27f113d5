import uuid from 'uuid';
import { database } from '../Firebase/firebase'

// ADD_INCOME
export const addIncome = (income) => ({
    type: 'ADD_INCOME',
    income
});
  
export const startAddIncome = (incomeData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            description = '',
            date = '',
            amount = 0,
        } = incomeData;

        const income = {description, date, amount };

        return database.ref(`users/${uid}/income`).push(income).then((ref) => {
        dispatch(addIncome({
            id: ref.key,
            ...income
        }));
        });
    };
};

// REMOVE_INCOME
export const removeIncome = ({ id } = {}) => ({
    type: 'REMOVE_INCOME',
    id
});

export const startRemoveIncome = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/income/${id}`).remove().then(() => {
            dispatch(removeIncome({ id }))
        })
    }
}

// EDIT_INCOME
export const editIncome = (id, updates) => ({
    type: 'EDIT_INCOME',
    id,
    updates
});

export const startEditIncome = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/income/${id}`).update(updates).then(() => {
            dispatch(editIncome(id, updates))
        })
    }
}

// SET_INCOME
export const setIncome = (income) => ({
    type: 'SET_INCOME',
    income
});

export const startSetIncome = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/income`).once('value').then((snapshot) => {
        const income = [];

        snapshot.forEach((childSnapshot) => {
            income.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        dispatch(setIncome(income));
        });
    };
};