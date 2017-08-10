import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions'
import { connect } from 'react-redux'
import * as api from '../api'
import { Link, Route, Router } from 'react-router-dom'

import Post from '../components/post'
import Comment from '../components/comment'

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.childChanged = this.childChanged.bind(this);
    this.getPosts();
  }

  getPosts() {
    fetch("http://localhost:5001/posts/", {method: "GET", headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.LOAD_POSTS,
          posts: data
        }
        this.props.load_posts(obj);
      })
    })
  }

  getRenderKey() {
    if(this.props.posts) {
      if(Array.isArray(this.props.posts)) {
        var value =  this.props.posts.length > 0 ? this.props.posts.filter(post => post.id === this.props.match.params.id)[0] : false;
      }
      else {
        var array = [];
        Object.keys(this.props.posts).forEach((key, index) => {
          if(this.props.posts[key].deleted == false) {
            array.push(this.props.posts[key]);
          }
        });
        return array.length > 0 ? array.filter(post => post.id === this.props.match.params.id)[0] : false;
      }
    }
    else {
      return false;
    }
  }

  childChanged(){
    window.location.href = '/';
  }

  render() {
    var key = this.getRenderKey();
    return (
      <div className="App">
      <div className="main-banner">
        <h1><Link to="/">Home</Link></h1>
      </div>
        <div className="Main">
        <br />
          {this.props.match.params.id && this.props.posts && key &&
            <Post showComments={true} alertParent={this.childChanged} post={key} />}
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
    post_page_load: (data) => dispatch(actions.post_page_load(data)),
    load_posts: (data) => dispatch(actions.load_posts(data)),
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
)(PostPage)
