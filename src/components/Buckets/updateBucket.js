import React, { Component } from 'react';
import { connect } from 'react-redux';
import BucketForm from './bucketForm';
import { startEditBucket, startRemoveBucket } from '../../Actions/buckets'

export class EditBucketPage extends Component {
  onSubmit = (bucket) => {
    this.props.startEditBucket(this.props.bucket.id, bucket);
    this.props.history.push('/buckets');
  }

  onRemove = () => {
    this.props.startRemoveBucket({ id: this.props.bucket.id });
    this.props.history.push('/buckets');
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Edit Bucket</h1>
          </div>
        </div>
        <div>
          <BucketForm
            bucket={this.props.bucket}
            onSubmit={this.onSubmit}
          />
          <button onClick={this.onRemove}>Remove Bucket</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  bucket: state.buckets.find((bucket) => bucket.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditBucket: (id, bucket) => dispatch(startEditBucket(id, bucket)),
  startRemoveBucket: (data) => dispatch(startRemoveBucket(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBucketPage);
