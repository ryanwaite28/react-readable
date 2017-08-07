import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions'
import { connect } from 'react-redux'
import * as api from '../api'
import { Link, Route, Router } from 'react-router-dom'

import Comment from '../components/comment'

class Post extends Component {
  constructor(props) {
    super(props);
    this.buildComments();
  }

  state = {
    displayEditor: 'none'
  }

  buildComments() {
    fetch("http://localhost:5001/posts/" + this.props.post.id + "/comments",
    {method: "GET", headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        if(data.length > 0) {
          var obj = {
            type: actions.BUILD_COMMENTS,
            posts: this.props.posts,
            comments: data
          }
          this.props.build_comments(obj);
          this.setState({
            titleInput: this.props.post.title,
            bodyInput: this.props.post.body
          });
        }
      })
    })
  }

  getCommentsLength() {
    var num;

    if(Array.isArray(this.props.comments)){
      var array = this.props.comments.filter((comment) => {
        return comment.parentId === this.props.post.id && comment.deleted === false;
      });
      num = array.length;
    }
    else {
      var keys = Object.keys(this.props.comments);
      var array = keys.filter((comment_id) => {
        return this.props.comments[comment_id].parentId === this.props.post.id && this.props.comments[comment_id].deleted === false;
      });
      num = array.length;
    }

    return num;
  }

  toggleEditor() {
    var value = this.state.displayEditor == 'none' ? "block" : "none";
    this.setState({displayEditor: value});
  }

  updateTitleInput(input) {
    if(input.length < 5) {
      alert("Title Must Be At Least 5 Characters");
      return;
    }
    this.setState({titleInput: input});
  }

  updateBodyInput(input) {
    if(input.length < 5) {
      alert("Body Must Be At Least 5 Characters");
      return;
    }
    this.setState({bodyInput: input});
  }

  confirmPostEdits() {
    fetch("http://localhost:5001/posts/" + this.props.post.id,
    {method: "PUT", body:JSON.stringify({title: this.state.titleInput.trim(), body: this.state.bodyInput.trim()}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.EDIT_POST,
          id: this.props.post.id,
          title: data.title,
          body: data.body
        }

        this.props.edit_post(obj);
        this.toggleEditor();
      })
    })
  }

  upvotePost() {
    fetch("http://localhost:5001/posts/" + this.props.post.id,
    {method: "POST", body:JSON.stringify({option: "upVote"}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.UPVOTE_POST,
          id: this.props.post.id,
          voteScore: data.voteScore
        }

        this.props.upvote_post(obj);
        this.forceUpdate();
      })
    })
  }

  downvotePost() {
    fetch("http://localhost:5001/posts/" + this.props.post.id,
    {method: "POST", body:JSON.stringify({option: "downVote"}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.DOWNVOTE_POST,
          id: this.props.post.id,
          voteScore: data.voteScore
        }

        this.props.downvote_post(obj);
        this.forceUpdate();
      })
    })
  }

  deletePost() {
    var ask = window.confirm("Delete This Post?");
    if(ask == false) {
      return;
    }

    fetch("http://localhost:5001/posts/" + this.props.post.id,
    {method: "DELETE", headers: api.headers_one()})
    .then((resp) => {
      console.log(resp);
      resp.json().then((data) => {
        var obj = {
          type: actions.DELETE_POST,
          id: data.id,
          deleted: data.deleted
        }

        this.props.delete_post(obj);
        if(this.props.alertParent){
          this.props.alertParent();
        }
      })
    })
  }

  childChanged(){
    this.forceUpdate();
  }

  getRenderKeys() {
    if(this.props.comments) {
      var array = [];
      Object.keys(this.props.comments).forEach((item, index) => {
        if( this.props.comments[item].parentId === this.props.post.id && this.props.comments[item].deleted == false ) {
          array.push(this.props.comments[item]);
        }
      });
      return array.length > 0 ? array : false;
    }
    else {
      return false;
    }
  }

  render(){
    var keys = this.getRenderKeys();
    return (
      <div className="post">
        <h3><Link to={"/posts/" + this.props.post.id}>{this.props.post.title}</Link></h3>
        <p>{this.props.post.body}</p>
        <br/>
        <p>
          Vote Score: {this.props.post.voteScore}<br />
          Comments: {this.props.comments && this.getCommentsLength()}<br />
          Category: <Link to={"/" + this.props.post.category}>{this.props.post.category}</Link>
        </p>
        <br/>
        <p>
          By: <em>{this.props.post.author}</em><br />
          {"Date"}: {new Date(this.props.post.timestamp).toString().substr(0,16)}<br/><br />
        </p>
        <button className="post-buttons btn btn-info btn-sm transition"><Link to={"/posts/" + this.props.post.id + "/create_comment"}>Create Comment</Link></button>

        <div style={{display: this.state.displayEditor}}>
        <p className="text-center">Title</p>
        <textarea className="editor" value={this.state.titleInput}
          onChange={(event) => this.updateTitleInput(event.target.value)}></textarea>

        <p className="text-center">Body</p>
        <textarea className="editor" value={this.state.bodyInput}
          onChange={(event) => this.updateBodyInput(event.target.value)}></textarea>

          <button className="middlr btn btn-success btn-sm transition" onClick={() => {this.confirmPostEdits()}}>Confirm Edit</button>
          <br />
        </div>

        <div className="post-buttons-div">
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.toggleEditor()}}>Edit</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.deletePost()}}>Delete</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.upvotePost()}}>UpVote</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.downvotePost()}}>DownVote</button>
        </div>
        <hr />
        <br />
        {this.props.showComments && keys && keys.length > 0 && keys.map((comment) => (
          <Comment key={comment.id} alertParent={this.childChanged.bind(this)} comment={comment} />
        ))}
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
    build_comments: (data) => dispatch(actions.build_comments(data)),
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
)(Post)