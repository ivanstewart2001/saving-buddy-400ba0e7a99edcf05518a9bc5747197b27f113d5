import uuid from 'uuid';
import { database } from '../Firebase/firebase'

// ADD_Bill
export const addBill = (bill) => ({
    type: 'ADD_BILL',
    bill
});

export const startAddBill = (billData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            title = '',
            dueDate = '',
            amount = 0,
            frequency = '',
            reminderFrequency = '',
            category = '',
            paid = '',
            notes = '',
            createdAt = ''
        } = billData;

        const bill = { title, dueDate, amount, frequency, reminderFrequency, category, paid, notes, createdAt };

        return database.ref(`users/${uid}/bills`).push(bill).then((ref) => {
            dispatch(addBill({
                id: ref.key,
                ...bill
            }));
        });
    };
};

// REMOVE_Bill
export const removeBill = ({ id } = {}) => ({
    type: 'REMOVE_BILL',
    id
});

export const startRemoveBill = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/bills/${id}`).remove().then(() => {
            dispatch(removeBill({ id }))
        })
    }
}

// EDIT_Bill
export const editBill = (id, updates) => ({
    type: 'EDIT_BILL',
    id,
    updates
});

export const startEditBill = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/bills/${id}`).update(updates).then(() => {
            dispatch(editBill(id, updates))
        })
    }
}

// SET_BILLS
export const setBills = (bills) => ({
    type: 'SET_BILLS',
    bills
});

export const startSetBills = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/bills`).once('value').then((snapshot) => {
        const bill = [];

        snapshot.forEach((childSnapshot) => {
            bill.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        dispatch(setBills(bill));
        });
    };
};