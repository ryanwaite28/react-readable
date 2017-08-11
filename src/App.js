import React, { Component } from 'react';
import './App.css';
import * as actions from './actions'
import { connect } from 'react-redux'

import Post from './components/post'

class App extends Component {
  state = {
    posts: null,
    comments: null
  }

  ComponentDidMount() {
    console.log("admit One");
    console.log(this);
  }

  render() {
    var keys = Object.keys(this.props.posts);
    return (
      <div className="App">
        <div className="Main">
          {keys.map((key) => (
            <Post key={key} post={this.props.posts[key]} />
          ))}
          </div>
      </div>

    );
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    add_post: (data) => dispatch(actions.add_post(data)),
    edit_post: (data) => dispatch(actions.edit_post(data)),
    delete_post: (data) => dispatch(actions.delete_post(data)),
    upvote_post: (data) => dispatch(actions.upvote_post(data)),
    downvote_post: (data) => dispatch(actions.downvote_post(data)),
    add_comment: (data) => dispatch(actions.add_comment(data)),
    edit_comment: (data) => dispatch(actions.edit_comment(data)),
    delete_comment: (data) => dispatch(actions.delete_comment(data)),
    upvote_comment: (data) => dispatch(actions.upvote_comment(data)),
    downvote_comment: (data) => dispatch(actions.downvote_comment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
