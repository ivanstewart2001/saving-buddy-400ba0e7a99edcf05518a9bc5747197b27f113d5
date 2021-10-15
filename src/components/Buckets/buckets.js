import React, {Component} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import BucketList from "./bucketList";
import { connect } from 'react-redux';

class Buckets extends Component {
    render() {
        return(
            <div>
                <h1>Buckets</h1>
                <h3>Month:</h3>
                <BucketList />
                <a href="/addBucket">Add Bucket</a>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      bills: state.bills
    };
};
  
export default connect(mapStateToProps)(Buckets);
