import React, { Component } from 'react';
import Counter from './counter';
import ModalForm from './modal';

class Counters extends Component {
  render() {
    let styles = this.props.modalVisible
    ? { display: "block" }
    : { display: "none" };
    return (
      <div>
        <button
          onClick={this.props.handleReset}
          className="btn btn-primary btn-lg"
          style={{ margin: '20px' }}>
          Reset
        </button>

        <button
          onClick={this.props.handleModalVisible}
          className="btn btn-primary btn-lg"
          style={{margin: "20px"}}
        >
          Add Item
        </button> 

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={styles}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Item</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

        {this.props.counters.map(counter => (
          <Counter
            key={counter.id}
            onDelete={this.props.handleDelete}
            counter={counter}
            handleDecrement={this.props.handleDecrement}
            handleIncrement={this.props.handleIncrement}
          />
        ))}
        </div>
    );
  }
}

export default Counters;
