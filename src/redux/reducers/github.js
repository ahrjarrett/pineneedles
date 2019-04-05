import {
  INIT_QUERY,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_ALL_REPOS_SUCCESS,
  FETCH_ALL_REPOS_FAILURE,
  FETCH_REPO_SUCCESS,
  FETCH_REPO_FAILURE,
  FETCH_COMMITS_SUCCESS,
  FETCH_COMMITS_FAILURE,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE
  // POST_COMMENT_SUCCESS,
  // POST_COMMENT_FAILURE
} from "../actions/types";

const defaultState = {
  students: JSON.parse(window.localStorage.getItem("students")) || [],
  repo: {},
  repos: [],
  commits: [],
  comments: [],
  pending: false,
  error: null
};

export const githubReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INIT_QUERY:
      return { ...state, pending: true };

    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        students: action.payload
      };

    case FETCH_STUDENTS_FAILURE:
      return { ...state, pending: false, error: action.payload };

    case FETCH_ALL_REPOS_SUCCESS:
      return { ...state, pending: false, error: null, repos: action.payload };

    case FETCH_ALL_REPOS_FAILURE:
      return { ...state, pending: false, error: action.payload };

    case FETCH_REPO_SUCCESS:
      return { ...state, pending: false, error: null, repo: action.payload };

    case FETCH_REPO_FAILURE:
      return { ...state, pending: false, error: action.payload };

    case FETCH_COMMITS_SUCCESS:
      return { ...state, pending: false, error: null, commits: action.payload };

    case FETCH_COMMITS_FAILURE:
      return { ...state, pending: false, error: action.payload };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        comments: action.payload
      };

    case FETCH_COMMENTS_FAILURE:
      return { ...state, pending: false, error: action.payload };

    // case POST_COMMENT_SUCCESS:
    //   return { ...state };

    // case POST_COMMENT_FAILURE:
    //   return { ...state };

    default:
      return state;
  }
};
