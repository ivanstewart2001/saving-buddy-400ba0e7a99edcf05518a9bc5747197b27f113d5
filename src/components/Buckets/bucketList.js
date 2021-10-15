import React from 'react';
import { connect } from 'react-redux';
import BucketItem from './bucketItem';
import selectExpenses from '../../Selectors/expenses';

export const BucketList = (props) => {
  return (
    <div>
      <div>
        {
          props.buckets.length === 0 ? (
            <div>
              <span>No Buckets</span>
            </div>
            
          ) : (
              props.buckets.map((bucket) => {
                return <BucketItem key={bucket.id} {...bucket} />;
              })
            )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    buckets: state.buckets
  };
};

export default connect(mapStateToProps)(BucketList);