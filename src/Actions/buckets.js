import uuid from 'uuid';
import { database } from '../Firebase/firebase'

// ADD_BUCKET
export const addBucket = (bucket) => ({
    type: 'ADD_BUCKET',
    bucket
});

export const startAddBucket = (bucketData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            title = '',
            startDate = '',
            endDate = '',
            goalAmount = 0,
            savedAmount = 0,
            reminderFrequency = '',
            notes = '',
            createdAt = ''
        } = bucketData;

        const bucket = { title, startDate, endDate, goalAmount, savedAmount, reminderFrequency, notes, createdAt };

        return database.ref(`users/${uid}/buckets`).push(bucket).then((ref) => {
        dispatch(addBucket({
            id: ref.key,
            ...bucket
        }));
        });
    };
};

// REMOVE_BUCKET
export const removeBucket = ({ id } = {}) => ({
    type: 'REMOVE_BUCKET',
    id
});

export const startRemoveBucket = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/buckets/${id}`).remove().then(() => {
            dispatch(removeBucket({ id }))
        })
    }
}

// EDIT_BUCKET
export const editBucket = (id, updates) => ({
    type: 'EDIT_BUCKET',
    id,
    updates
});

export const startEditBucket = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/buckets/${id}`).update(updates).then(() => {
            dispatch(editBucket(id, updates))
        })
    }
}

// SET_BUCKETS
export const setBuckets = (buckets) => ({
    type: 'SET_BUCKETS',
    buckets
});

export const startSetBuckets = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/buckets`).once('value').then((snapshot) => {
        const buckets = [];

        snapshot.forEach((childSnapshot) => {
            buckets.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        dispatch(setBuckets(buckets));
        });
    };
};