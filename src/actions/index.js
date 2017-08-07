function ArgumentError(msg){
  this.name = 'ArgumentError';
  this.msg = msg;
}

// Action Strings
export const LOAD_POSTS = 'LOAD_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'

export const POST_PAGE_LOAD = 'POST_PAGE_LOAD'
export const BUILD_COMMENTS = 'BUILD_COMMENTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export function load_posts({ posts }) {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export function load_categories({ categories }) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}

export function add_post ({ id, timestamp, title, body, author, category, voteScore, deleted }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}
export function edit_post ({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}
export function delete_post ({ id, deleted }) {
  return {
    type: DELETE_POST,
    id,
    deleted
  }
}
export function upvote_post ({ id, voteScore }) {
  return {
    type: UPVOTE_POST,
    id,
    voteScore
  }
}
export function downvote_post ({ id, voteScore }) {
  return {
    type: DOWNVOTE_POST,
    id,
    voteScore
  }
}



export function add_comment ({ id, parentid, timestamp, body, author, voteScore, deleted, parentdeleted }) {
  return {
    type: ADD_COMMENT,
    id,
    parentid,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentdeleted
  }
}
export function edit_comment ({ id, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    body
  }
}
export function delete_comment ({ id, deleted, parentDeleted }) {
  return {
    type: DELETE_COMMENT,
    id,
    deleted,
    parentDeleted
  }
}
export function upvote_comment ({ id, voteScore }) {
  return {
    type: UPVOTE_COMMENT,
    id,
    voteScore
  }
}
export function downvote_comment ({ id, voteScore }) {
  return {
    type: DOWNVOTE_COMMENT,
    id,
    voteScore
  }
}

//

export function post_page_load ({ posts, comments }) {
  return {
    type: POST_PAGE_LOAD,
    posts,
    comments
  }
}

export function build_comments ({ posts, comments }) {
  return {
    type: BUILD_COMMENTS,
    posts,
    comments
  }
}
