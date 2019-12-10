import React, { Component } from "react";

class Counter extends Component {
  render() {
    const { id } = this.props.counter
    const disableDecrement = this.props.counter.value === 0 
    return (
      <div className="row">
      <div classNmae="col-1">
      <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
      </div>
      <div class="col">
        <button
          onClick={() => this.props.handleIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm "
     
        >
          +
        </button>

        <button
          onClick={ () => this.props.handleDecrement(this.props.counter)}
          className="btn btn-secondary btn-sm m-2"
         
          disabled={disableDecrement}
        >
          -
        </button>  

        <button
          onClick={() => this.props.onDelete(id)}
          className="btn btn-danger btn-sm"
        
        >
          X
        </button>
      </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes +=  this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } =  this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
