import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions'
import { connect } from 'react-redux'
import * as api from '../api'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.setState({component: "Comment"});
  }

  state = {
    displayEditor: 'none',
    bodyInput: this.props.comment.body,
    opacity: 0,
    visibility: "hidden"
  }

  toggleEditor() {
    var value = this.state.displayEditor === 'none' ? "block" : "none";
    this.setState({displayEditor: value});
  }

  updateBodyInput(input) {
    this.setState({bodyInput: input});
  }

  confirmCommentEdits() {
    if(this.state.bodyInput < 5) {
      alert("Body Must Be At Least 5 Characters");
      return;
    }

    fetch("http://localhost:5001/comments/" + this.props.comment.id,
    {method: "PUT", body:JSON.stringify({body: this.state.bodyInput.trim()}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.EDIT_COMMENT,
          id: this.props.comment.id,
          body: data.body
        }

        this.props.edit_comment(obj);
        this.toggleEditor();
        this.success();
      })
    })
  }

  success() {
    this.setState({opacity: 1, visibility: "visible"}, () => {
      setTimeout(() => {
        this.setState({opacity: 0, visibility: "hidden"});
      } , 2000);
    })
  }

  upvoteComment() {
    fetch("http://localhost:5001/comments/" + this.props.comment.id + "?option=upVote",
    {method: "POST", body:JSON.stringify({option: "upVote"}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.UPVOTE_COMMENT,
          id: this.props.comment.id,
          voteScore: data.voteScore
        }

        this.props.upvote_comment(obj);
        this.forceUpdate();
        if(this.props.sortChanged){
          this.props.sortChanged();
        }
      })
    })
  }

  downvoteComment() {
    fetch("http://localhost:5001/comments/" + this.props.comment.id,
    {method: "POST", body:JSON.stringify({option: "downVote"}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.DOWNVOTE_COMMENT,
          id: this.props.comment.id,
          voteScore: data.voteScore
        }

        this.props.downvote_comment(obj);
        this.forceUpdate();
        if(this.props.sortChanged){
          this.props.sortChanged();
        }
      })
    })
  }

  deleteComment() {
    var ask = window.confirm("Delete This Comment?");
    if(ask === false) {
      return;
    }

    fetch("http://localhost:5001/comments/" + this.props.comment.id,
    {method: "DELETE", headers: api.headers_one()})
    .then((resp) => {

      resp.json().then((data) => {
        var obj = {
          type: actions.DELETE_COMMENT,
          id: data.id,
          deleted: data.deleted,
          parentDeleted: data.parentDeleted
        }

        this.props.delete_comment(obj);
        if(this.props.alertParent){
          this.props.alertParent();
        }
      })
    })
  }

  render(){
    return (
      <div className="comment transition">
        <img alt="Blue Check Mark" className="blue-check-mark transition" src={require("./blue-check-mark.png")} style={{opacity: this.state.opacity, visibility: this.state.visibility, top: "15px", right: "15px"}}/>
        <h4>{this.props.comment.body}</h4>
        <p>Vote Score: {this.props.comment.voteScore}</p>
        <br/>
        <p>
          By: <em>{this.props.comment.author}</em><br />
          {"Date"}: {new Date(this.props.comment.timestamp).toString().substr(0,16)}<br/><br />
        </p>
        <div style={{display: this.state.displayEditor}}>
          <p className="text-center">Body</p>
          <textarea className="editor" value={this.state.bodyInput}
            onChange={(event) => this.updateBodyInput(event.target.value)}></textarea>
          <button className="middlr btn btn-success btn-sm transition" onClick={() => {this.confirmCommentEdits()}}>Confirm Edit</button>
          <hr />
        </div>
        <div className="post-buttons-div">
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.toggleEditor()}}>Edit</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.deleteComment()}}>Delete</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.upvoteComment()}}>UpVote</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.downvoteComment()}}>DownVote</button>
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
    edit_comment: (data) => dispatch(actions.edit_comment(data)),
    delete_comment: (data) => dispatch(actions.delete_comment(data)),
    upvote_comment: (data) => dispatch(actions.upvote_comment(data)),
    downvote_comment: (data) => dispatch(actions.downvote_comment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
