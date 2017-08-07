import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions'
import { connect } from 'react-redux'
import * as api from '../api'
import { Link, Route, Router } from 'react-router-dom'

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    displaySidebar: 'none'
  }

  render(){
    // console.log(this);
    return (
      <div className="sidebar-containner">
        <a className="menu-link"></a>
        <div style={{display: this.state.displaySidebar}} className="sidebar">

        </div>
      </div>
    )
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
)(Sidebar)
