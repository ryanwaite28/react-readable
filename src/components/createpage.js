import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions'
import { connect } from 'react-redux'
import * as api from '../api'
import { Link, Route, Router } from 'react-router-dom'
import * as tools from '../tools'

import Post from '../components/post'

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.getCategories();
  }

  state = {
    displayEditor: 'none',
    title: '',
    body: '',
    owner: 'thingthree',
    category: ''
  }

  toggleEditor() {
    var value = this.state.displayEditor == 'none' ? "block" : "none";
    this.setState({displayEditor: value});
  }

  getCategories() {
    fetch("http://localhost:5001/categories/", {method: "GET", headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        // console.log(data, this);
        var obj = {
          type: actions.LOAD_POSTS,
          categories: data.categories
        }
        this.props.load_categories(obj);
      })
    })
  }

  updateFormTitle(value) {
    this.setState({title: value});
    //console.log(this);
  }

  updateFormBody(value) {
    this.setState({body: value});
    //console.log(this);
  }

  updateFormCategory(value) {
    this.setState({category: value});
    //console.log(this);
  }

  validateNewPostInputs() {
    if(this.state.title.length < 5) {
      return null;
    }
    if(this.state.body.length < 5) {
      return null;
    }
    if(this.state.category === '') {
      return null;
    }

    var obj = {
      id: tools.randomValue(),
      timestamp: Date.now(),
      title: this.state.title.trim(),
      body: this.state.body.trim(),
      author: this.state.owner,
      category: this.state.category
    }
    console.log(obj);

    return JSON.stringify(obj);
  }

  createPost() {
    var body = this.validateNewPostInputs();
    if(body === null) {
      alert("Check All Input Fields.\nTitle And Body Must Be a Minimum of 5 Characters.\nCategory Must Be Selected");
      return;
    }

    fetch("http://localhost:5001/posts/",
    {method: "POST", body: body, headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        // console.log(data, this);
        var obj = {
          type: actions.ADD_POST,
          id: data.id,
          timestamp: data.timestamp,
          title: data.title,
          body: data.body,
          author: this.state.owner,
          category: data.category,
          deleted: data.deleted,
          voteScore: data.voteScore
        }

        this.props.add_post(obj);
        window.location.href = "/";
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
          <label >
            <span style={{marginRight: "10px"}}>Title:</span></label>
            <input type="text" className="input-s1" value={this.state.title} onChange={(event) => this.updateFormTitle(event.target.value)}/>

          <br /><br /><br/>
          <label >
            <span style={{marginRight: "10px"}}>Body:</span></label>
            <textarea type="text" className="input-s1" value={this.state.body} onChange={(event) => this.updateFormBody(event.target.value)}></textarea>

          <br /><br /><br/>
          <label >
            <span style={{marginRight: "10px"}}>Category:</span></label>
            <select value={this.state.category} className="input-s1" onChange={(event) => this.updateFormCategory(event.target.value)}>
              <option disabled>Select...</option>
              {this.props.categories && this.props.categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

          <br/><br/><br/>
          <button className="btn btn-success btn-sm transition" onClick={() => {this.createPost()}}>Submit</button>
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
    load_categories: (data) => dispatch(actions.load_categories(data)),
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
)(CreatePage)
