import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies2 from './components/movies/vidMovies';
import Rentals from './components/movies/rentals';
import Customers from './components/movies/customers';
import NotFound from './components/common/notFound';
import NavigationBar from './components/common/navBar/navBar';
// import Movie from './components/movies/movie';
import Login from './components/movies/loginForm';
import RegistrationForm from './components/movies/registrationForm';
import NewMovieForm from './components/movies/newMovieForm';
import Logout from './components/movies/logout';
import { getCurrentUser } from './services/authService';
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import './App.css';


class App extends Component {
  state = {}

  componentDidMount() {
  const user = getCurrentUser()
  this.setState({ user })
  }
  render() {
    return (
      <Fragment>
        <ToastContainer />
        <NavigationBar user={this.state.user}/>
        <main className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/movieForm" component={NewMovieForm} />
          <ProtectedRoute path="/movies/:id" component={NewMovieForm} />
          <Route path="/customers" component={Customers} /> 
          <Route path="/rentals" component={Rentals} /> 
          <Route path="/logout" component={Logout} /> 
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" render= {props => (<Movies2 {...props} user={this.state.user} />)} /> 
          <Redirect to="/not-found" />
        </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
