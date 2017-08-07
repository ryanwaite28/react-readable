import {
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  //
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,

  POST_PAGE_LOAD,
  BUILD_COMMENTS,
  LOAD_CATEGORIES
} from '../actions'

// Reducer Functions

export function posts(state = null, action) {
  switch(action.type) {
    case LOAD_POSTS:
      var posts = {}
      for(let num in action.posts) {
        posts[ action.posts[num].id ] = action.posts[num]
      }
      return posts

    case ADD_POST:
      var new_posts = state;
      new_posts[action.id] = {};

      new_posts[action.id].id = action.id;
      new_posts[action.id].author = action.author;
      new_posts[action.id].title = action.title;
      new_posts[action.id].body = action.body;
      new_posts[action.id].timestamp = action.timestamp;
      new_posts[action.id].category = action.category;
      new_posts[action.id].deleted = action.deleted;
      new_posts[action.id].voteScore = action.voteScore;

      return new_posts

    case EDIT_POST:
      var new_posts = state;
      new_posts[action.id].title = action.title;
      new_posts[action.id].body = action.body;

      return new_posts

    case DELETE_POST:
      var new_posts = state;
      new_posts[action.id].deleted = action.deleted;

      return new_posts

    case UPVOTE_POST:
      var new_posts = state;
      new_posts[action.id].voteScore = action.voteScore;

      return new_posts

    case DOWNVOTE_POST:
      var new_posts = state;
      new_posts[action.id].voteScore = action.voteScore;

      return new_posts

    default:
      return state
  }
}

export function comments(state = null, action) {
  switch(action.type) {
    case BUILD_COMMENTS:
      var comments = state == null ? {} : state;
      if(Array.isArray(action.comments) && action.comments.length > 0) {
        for(let comment of action.comments) {
          comments[ comment.id ] = comment
        }
      }

      return comments

    case POST_PAGE_LOAD:
      var comments = {}
      for(let num in action.comments) {
        comments[ action.comments[num].id ] = action.comments[num]
      }
      return comments
      break;

    case ADD_COMMENT:
      var new_comments = state == null ? {} : state;
      new_comments[action.id] = {};

      new_comments[action.id].id = action.id;
      new_comments[action.id].author = action.author;
      new_comments[action.id].title = action.title;
      new_comments[action.id].parentId = action.parentId;
      new_comments[action.id].timestamp = action.timestamp;
      new_comments[action.id].parentdeleted = action.parentdeleted;
      new_comments[action.id].deleted = action.deleted;
      new_comments[action.id].voteScore = action.voteScore;

    return new_comments

    case EDIT_COMMENT:
      var new_comments = state;
      new_comments[action.id].body = action.body;

      return new_comments

    case DELETE_COMMENT:
      var new_comments = state;
      new_comments[action.id].deleted = action.deleted;
      new_comments[action.id].parentDeleted = action.parentDeleted;

      return new_comments

    case UPVOTE_COMMENT:
      var new_comments = state;
      new_comments[action.id].voteScore = action.voteScore;

      return new_comments

    case DOWNVOTE_COMMENT:
      var new_comments = state;
      new_comments[action.id].voteScore = action.voteScore;

      return new_comments

    default:
      return state
  }
}

export function categories(state = null, action){
  switch(action.type) {
    case LOAD_CATEGORIES:
      var categories = action.categories.map((category) => (category.name));
      return categories
      break;

    default:
      return state
  }
}
