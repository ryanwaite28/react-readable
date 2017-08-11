import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions'
import { connect } from 'react-redux'
import * as api from '../api'
import { Link } from 'react-router-dom'
import * as tools from '../tools'

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.setState({component: "Create Comment"});
  }

  state = {
    body: '',
    owner: 'thingthree'
  }

  updateFormBody(value) {
    this.setState({body: value});
    //console.log(this);
  }

  validateNewCommentInputs() {
    if(this.state.body.length < 5) {
      return null;
    }

    var obj = {
      id: tools.randomValue(),
      timestamp: Date.now(),
      body: this.state.body.trim(),
      author: this.state.owner,
      parentId: this.props.match.params.id
    }
    console.log(obj);

    return JSON.stringify(obj);
  }

  createComment() {
    var body = this.validateNewCommentInputs();
    if(body === null) {
      alert("Check All Input Fields.\nBody Must Be a Minimum of 5 Characters.");
      return;
    }

    fetch("http://localhost:5001/comments",
    {method: "POST", body: body, headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        // console.log(data, this);
        var obj = {
          type: actions.ADD_COMMENT,
          id: data.id,
          timestamp: data.timestamp,
          body: data.body,
          author: this.state.owner,
          parentId: data.parentId,
          deleted: data.deleted,
          voteScore: data.voteScore,
          parentDeleted: data.parentDeleted
        }

        this.props.add_comment(obj);
        window.location.href = "/posts/" + this.props.match.params.id;
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="main-banner">
          <h1><Link to="/">Home</Link></h1>
        </div>
        <div className="Main">
        <div className="new-post-div text-center">
          <br />
          <Link to={"/posts/" + this.props.match.params.id}>Back To Post</Link>
          <br/><br/><br/><br/>
          <label >
            <span style={{marginRight: "10px"}}>Body:</span></label>
            <textarea className="input-s1" value={this.state.body} onChange={(event) => this.updateFormBody(event.target.value)}></textarea>

          <br/><br/>
          <button className="btn btn-success btn-sm transition" onClick={() => {this.createComment()}}>Submit</button>
        </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps ({ posts, comments, categories }) {
  return {
    posts,
    comments,
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    add_comment: (data) => dispatch(actions.add_comment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComment)
