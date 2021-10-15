import React, { Component } from 'react';
import { startEditBucket } from '../../Actions/buckets'
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { BsFillTrashFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import BucketModal, {send} from './bucketModal'

class BucketItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: props.id,
      title: props.title,
      startDate : props.startDate,
      endDate : props.endDate,
      goalAmount: props.goalAmount,
      savedAmount: props.savedAmount,
      notes: props.notes,
      openModal: false,
      closeModal: false
    }

    this.bucket = null
  }

  openModal = () => {
    this.setState(() => ({ openModal: true}))
  }

  show = () => {
    this.setState(() => ({}))
  }

  componentDidMount = () => {
    this.props.buckets.map((currentBucket) => {
      if (currentBucket.id === this.state.id) {
        this.bucket = currentBucket
      }
    })
  }

    render() {
        if (send === false && this.state.openModal === true) {
            this.setState(()=> ({openModal:send}))
        }

        return (
            <div style={{marginBottom:'50px', border: '3px solid lightgray'}} onClick={this.openModal}>
                <div>
                    <div style={{display: 'flex'}}>
                        <div style={{width: '50%'}}>
                            <p>{this.state.title}</p>
                        </div>
                        <div style={{width:'50%'}}>
                            <p style={{marginLeft:'80%'}}>{this.state.endDate}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <ProgressBar max={this.state.goalAmount/100} now={this.state.savedAmount/100} label={`$${this.state.savedAmount/100}`} />
                    <p style={{marginLeft:'90%'}}>Total: ${this.state.goalAmount/100}</p>
                </div>
                {
                    this.state.openModal === true ?
                        <div onMouseOut={this.show}>
                            <BucketModal bucket={this.state} />
                        </div>
                    :
                        <div></div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    buckets: state.buckets
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditBucket: (id, bucket) => dispatch(startEditBucket(id, bucket))
});

export default connect(mapStateToProps, mapDispatchToProps)(BucketItem);