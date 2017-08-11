import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions'
import { connect } from 'react-redux'
import * as api from '../api'
import { Link } from 'react-router-dom'

import Post from '../components/post'

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
        return this.props.posts.length > 0 ? this.props.posts.filter(post => post.id === this.props.match.params.id)[0] : false;
      }
      else {
        var array = [];
        Object.keys(this.props.posts).forEach((key, index) => {
          if(this.props.posts[key].deleted === false) {
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
    load_posts: (data) => dispatch(actions.load_posts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)
