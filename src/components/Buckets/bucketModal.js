import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link } from 'react-router-dom';
import { startEditBucket, startSetBuckets } from '../../Actions/buckets'
import { connect } from 'react-redux';

class BucketModal extends Component {
  constructor(props){
    super(props)

    console.log(this.props)

    this.state = {
      id: this.props.bucket.id,
      title: this.props.bucket.title,
      startDate : this.props.bucket.startDate,
      endDate : this.props.bucket.endDate,
      goalAmount: this.props.bucket.goalAmount,
      savedAmount: this.props.bucket.savedAmount,
      tempAddAmount: 0,
      tempRemoveAmount: 0,
      notes: this.props.bucket.notes,
      open: this.props.bucket.openModal,
      error: ''
    }

    this.bucket = null
  }

  handleOpen = () => {
    this.setState(() => ({ open: true }))
  };

  handleClose = () => {
    this.setState(() => ({ open: false }))
    window.location = "./buckets" //Should probaby find a better way to get the bucket item amount to change eventually
  };

  onAddChange = (e) => {
    const add = e.target.value
    this.setState(() => ({ tempAddAmount: add }))
  }

  onAddSubmit = () => {
    if ((Number(this.state.tempAddAmount) + (Number(this.state.savedAmount)/100)) > (Number(this.state.goalAmount)/100)) {
      this.setState(() => ({ error: 'Saved amount cannot be higher than goal amount.'}))
    } else {
      this.setState(() => ({ error: '' }))
      let bucket = Object.assign({}, this.bucket)
      const newBucketTotal = ((Number(this.state.tempAddAmount) + (Number(this.state.savedAmount)/100))*100)
      this.setState(() => ({savedAmount:newBucketTotal}))
      bucket.savedAmount = newBucketTotal
      this.props.startEditBucket(this.state.id, bucket);
    }
  }

  onRemoveChange = (e) => {
    const remove = e.target.value
    this.setState(() => ({ tempRemoveAmount: remove }))
  }

  onRemoveSubmit = () => {
    if ((((Number(this.state.savedAmount)/100) - (Number(this.state.tempRemoveAmount))) < 0)) {
      this.setState(() => ({ error: 'Saved amount cannot be lower than 0.'}))
    } else {
      this.setState(() => ({ error: '' }))
      let bucket = Object.assign({}, this.bucket)
      const newBucketTotal = ((Number(this.state.savedAmount)/100) - (Number(this.state.tempRemoveAmount))) * 100
      this.setState(() => ({savedAmount:newBucketTotal}))
      bucket.savedAmount = newBucketTotal
      this.props.startEditBucket(this.state.id, bucket);
    }
  }

  render(){
    send = this.state.open
    return (
      <div>
        <Modal
          style={{display:'inline-flex',alignItems:'center', justifyContent:'center'}}
          open={this.state.open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div style={{backgroundColor:'lightgray', border:'2px solid #000', boxShadow:'2px 2px 2px', padding:'3%', width:'70%', height:'60%'}}>
                {this.state.error ? <p>{this.state.error}</p> : <p></p>}
                <div style={{display: 'flex'}}>
                    <div style={{width: '50%'}}>
                        <h2>{this.state.title}</h2>
                    </div>
                    <div style={{width:'50%'}}>
                        <p style={{marginLeft:'70%'}}>{this.state.endDate}</p>
                    </div>
                </div>
                <div>
                  <ProgressBar max={this.state.goalAmount/100} now={this.state.savedAmount/100} label={`$${this.state.savedAmount/100}`} />
                  <p style={{marginLeft:'90%'}}>Total: ${this.state.goalAmount/100}</p>
                </div>
                <div style={{display:'flex', height:'75%'}}>
                  <div style={{border:'1px solid blue', width:'50%', height:'75%'}}>
                    <h4>Add To Bucket</h4>
                    <input type="number" min="0" onChange={this.onAddChange} />
                    <button onClick={this.onAddSubmit}>Add</button>
                  </div>
                  <div style={{border:'1px solid blue', width:'50%', height:'75%'}}>
                    <h4>Remove from Bucket</h4>
                    <input type="number" min="0" onChange={this.onRemoveChange}/>
                    <button onClick={this.onRemoveSubmit}>Remove</button>
                  </div>
                </div>
                <div style={{display: 'flex'}}>
                  <div style={{width: '50%'}}>
                    <Link to={`/updateBucket/${this.props.bucket.id}`}>
                      <button style={{marginLeft:'70%',width:'30%'}}>Edit Bucket</button>
                    </Link>
                  </div>
                  <div style={{width:'50%'}}>
                    <button style={{marginLeft:'70%',width:'30%'}} onClick={this.handleClose}>Close</button>
                  </div>
                </div>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }
}

export let send = null

const mapDispatchToProps = (dispatch, props) => ({
  startEditBucket: (id, bucket) => dispatch(startEditBucket(id, bucket))
});

export default connect(null, mapDispatchToProps)(BucketModal)