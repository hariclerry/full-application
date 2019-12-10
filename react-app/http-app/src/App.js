import React, { Component } from "react";
import { ToastContainer } from 'react-toastify'
import http from "./services/httpService";
import config from "./config.json"
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };
async componentDidMount() {
  const {data: posts} = await http.get(config.apiEndpoint);
  // const result = response.data;

  this.setState({
    posts
  })
  
}
  handleAdd = async () => {
    const obj = { title: 'first', body: 'first post'};
    const { data: post} = await http.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({
      posts
    });
    // console.log("Add");
  };

  handleUpdate = async post => {
    post.title = 'UPDATED';

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({
      posts
    })
    
    await http.put(config.apiEndpoint + "/" + post.id, post)
  };

  handleDelete = async post => {
    const originalPost = this.state.posts;
    const posts = this.state.posts.filter( p => p.id !== post.id);
    this.setState ({ posts });
    try {
      await delete(config.apiEndpoint + post.id);
      // throw new Error('')
      console.log('deleted')
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert('This post has already been deleted')
      }
      this.setState({
        posts: originalPost
      })
      
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
