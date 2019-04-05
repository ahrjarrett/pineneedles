import axios from "axios";
import { trackedStudents } from "../../hardcodedData";

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
  FETCH_COMMENTS_FAILURE,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
} from "./types";

export const githubUrl = "https://api.github.com";

export const sortByUpdatedDesc = (a, b) =>
  new Date(a.updated_at) < new Date(b.updated_at) ? 1 : -1;
export const sortByCreatedDesc = (a, b) =>
  new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;

export const fetchStudents = () => async (dispatch, getState) => {
  if (getState().github.students.length) return;
  dispatch({ type: INIT_QUERY });
  const { token } = getState().auth || localStorage.token;
  const promises = trackedStudents.map(async username => {
    const response = await axios({
      url: `${githubUrl}/users/${username}`,
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    return response;
  });
  try {
    const responses = await Promise.all(promises);
    const students = responses.map(({ data }) => data);
    window.localStorage.setItem("students", JSON.stringify(students));
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: students });
  } catch (error) {
    dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error });
  }
};

export const fetchRepo = (login, repoName) => async (dispatch, getState) => {
  const { token } = getState().auth || localStorage.token;
  dispatch({ type: INIT_QUERY });

  const promise = await axios({
    method: "GET",
    url: `${githubUrl}/repos/${login}/${repoName}`,
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  });
  try {
    const { data } = await Promise.resolve(promise);
    dispatch({ type: FETCH_REPO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_REPO_FAILURE, payload: error });
  }
};

export const fetchRepoCommits = (login, repoName) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth || localStorage.token;
  dispatch({ type: INIT_QUERY });

  const promise = await axios({
    method: "GET",
    url: `${githubUrl}/repos/${login}/${repoName}/commits`,
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  });
  try {
    const { data } = await Promise.resolve(promise);
    dispatch({ type: FETCH_COMMITS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_COMMITS_FAILURE, payload: error });
  }
};

export const fetchAllRepos = login => async (dispatch, getState) => {
  const { token } = getState().auth || localStorage.token;
  dispatch({ type: INIT_QUERY });

  const localRepos = JSON.parse(window.localStorage.getItem(`${login}-repos`));
  if (localRepos) {
    localRepos.sort(sortByUpdatedDesc);
    console.log("skipping API call! localRepos:", localRepos);
    return dispatch({ type: FETCH_ALL_REPOS_SUCCESS, payload: localRepos });
  }

  try {
    const response = await axios({
      url: `${githubUrl}/users/${login}/repos`,
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    const repos = response.data.sort(sortByUpdatedDesc);
    window.localStorage.setItem(`${login}-repos`, JSON.stringify(repos));
    dispatch({ type: FETCH_ALL_REPOS_SUCCESS, payload: repos });
  } catch (error) {
    dispatch({ type: FETCH_ALL_REPOS_FAILURE, payload: error });
  }
};

export const fetchComments = (login, repoName) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth || localStorage.token;
  dispatch({ type: INIT_QUERY });

  const promise = await axios({
    method: "GET",
    url: `${githubUrl}/repos/${login}/${repoName}/comments`,
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  });
  try {
    const { data } = await Promise.resolve(promise);
    dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      payload: data.sort(sortByCreatedDesc)
    });
  } catch (error) {
    dispatch({ type: FETCH_COMMENTS_FAILURE, payload: error });
  }
};
