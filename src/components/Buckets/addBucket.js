import React, { Component } from 'react';
import { connect } from 'react-redux';
import BucketForm from './bucketForm';
import { startAddBucket } from '../../Actions/buckets';

export class AddBucketPage extends Component {
  onSubmit = (bucket) => {
    this.props.startAddBucket(bucket);
    this.props.history.push('/buckets');
  }
  
  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Add Bucket</h1>
          </div>
        </div>
        <div>
          <BucketForm onSubmit={this.onSubmit} />
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddBucket: (bucket) => dispatch(startAddBucket(bucket))
});

export default connect(undefined, mapDispatchToProps)(AddBucketPage);