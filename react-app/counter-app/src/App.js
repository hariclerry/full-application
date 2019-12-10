import React, { Component } from 'react';
import Counters from "./components/counters";
import './App.css';
import NavBar from './components/navBar';

class App extends Component {
  state = {
    modalVisible: false,
    counters: [
      {id: 1, value: 3},
      {id: 2, value: 4},
      {id: 3, value: 2},
      {id: 4, value: 8}
    ]
  };

  handleIncrement = (counter) => {
 
   const counters = [...this.state.counters];
   const index = counters.indexOf(counter);
   counters[index] = {...counter}
   counters[index].value++;
   this.setState({counters});
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = {...counter}
    counters[index].value--;
    this.setState({counters});
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter(c => c.id !== counterId)
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => { c.value = 0;
      return c; })
    this.setState({ counters });
  };

  handleModalVisible = () => {
    console.log("Open modal called ", this.state.modalVisible);
    const modalVisible = !this.state.modalVisible;
    this.setState({
      modalVisible
    });
  }
  render() {
    const { counters, modalVisible } = this.state
    return (
      <React.Fragment>
      <NavBar counters={counters}/>
      <main className="container">
        <Counters handleDelete={this.handleDelete} counters={counters} handleDecrement={this.handleDecrement} handleIncrement={this.handleIncrement} handleReset={this.handleReset} handleModalVisible={this.handleModalVisible}
        modalVisible={modalVisible}/>
      </main>
      </React.Fragment>
    );
  }
}

export default App;
