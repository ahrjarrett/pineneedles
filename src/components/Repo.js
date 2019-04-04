import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Comment from "./Comment";
import AddComment from "./AddComment";

const githubUrl = "https://api.github.com";

class Repo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      repo: {},
      commits: [],
      sha: ""
    };
  }

  componentDidMount = () => {
    const { login, repoName } = this.props;
    this.fetchRepoComments(login, repoName);
    this.fetchRepoCommits(repoName);
    this.fetchRepo(repoName);
  };

  fetchRepo = async function(repoName) {
    const token = this.props.token || localStorage.token;
    const { login } = this.props;
    const promise = await axios({
      method: "GET",
      url: `${githubUrl}/repos/${login}/${repoName}`,
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    const repo = await Promise.resolve(promise);
    this.setState({ repo: repo.data });
  };

  fetchRepoCommits = async function(repo) {
    const token = this.props.token || localStorage.token;
    const { login, repoName } = this.props;
    const promise = await axios({
      method: "GET",
      url: `${githubUrl}/repos/${login}/${repoName}/commits`,
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    const commits = await Promise.resolve(promise);
    this.setState({ commits: commits.data });
  };

  fetchRepoComments = async function(login, repoName) {
    const token = this.props.token || localStorage.token;
    const promise = await axios({
      method: "GET",
      url: `${githubUrl}/repos/${login}/${repoName}/comments`,
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    const comments = await Promise.resolve(promise);
    this.setState({ comments: comments.data });
  };

  updateCommitSha = e => {
    console.log("updating active commit!");
    console.log(e);
  };

  propogateSha = sha => e => {
    console.log("SHA:", sha);
    this.setState({ sha });
  };

  render() {
    const { comments, repo, commits, sha } = this.state;
    const { login, token } = this.props;

    // DELETE:
    console.log("comments:", comments);
    console.log("repo:", repo);

    return (
      <RepoStyles>
        <div className="Repo-breadcrumbs">
          <Link to={`/students/${login}`} className="Repo-breadcrumbs-login">
            {login}
          </Link>
          <span className="Repo-breadcrumbs-divider">/</span>
          <Link
            to={`/students/${login}/repos/${repo.name}`}
            className="Repo-breadcrumbs-repo"
          >
            {repo.name}
          </Link>
        </div>
        <div className="row">
          <div className="Repo-commits col-sm-9">
            <div className="Repo-commits-title">Recent commits:</div>
            {commits.length > 0
              ? commits.map(commit => (
                  <Commit
                    commit={commit}
                    key={commit.sha}
                    sha={commit.sha}
                    activeSha={sha}
                    token={token}
                    repo={repo}
                    propogateSha={this.propogateSha(commit.sha)}
                  />
                ))
              : "No comments yet"}
          </div>
          <div className="Repo-comments col-sm-3">
            {/* {comments.length > 0 &&
              comments.map(comment => (
                <Comment comment={comment} key={comment.id} />
              ))}
            {comments.length === 0 && "No comments yet"} */}
          </div>
        </div>
      </RepoStyles>
    );
  }
}

const mapStateToProps = state => ({ token: state.auth.token });

export default connect(mapStateToProps)(Repo);

const Commit = ({ commit, propogateSha, sha, activeSha, repo, token }) => {
  return (
    <CommitStyles className={sha === activeSha ? "Commit-active-commit" : ""}>
      <div className="Commit-message">
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            className="Commit-message-url"
            href={commit.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            See on GitHub
          </a>
          <span className="Commit-message-text">
            {commit.commit.message.length > 80
              ? commit.commit.message.slice(0, 80) + "..."
              : commit.commit.message}
          </span>
        </div>
        <div>
          <button className="Commit-select-button" onClick={propogateSha}>
            Comment on {sha.slice(0, 4)}...
          </button>
        </div>
      </div>

      {activeSha === sha && (
        <AddComment
          token={token}
          repoName={repo.name}
          owner={repo.owner}
          sha={sha}
        />
      )}
    </CommitStyles>
  );
};

const RepoStyles = styled.div`
  .Repo-breadcrumbs {
    font-size: 26px;
    margin-bottom: 28px;
  }
  .Repo-breadcrumbs-login {
    font-weight: 300;
    color: #0366d6;
  }
  .Repo-breadcrumbs-repo {
    font-weight: 600;
    color: #0366d6;
  }
  .Repo-breadcrumbs-divider {
    margin: 0 0.25em;
    color: #586069;
  }
  .Repo-commits {
    font-size: 14px;
  }
  .Repo-commits-title {
    padding: 8px;
    padding-left: 10px;
    background-color: #f1f8ff;
    border: 1px solid #c8e1ff;
    color: #6a737d;
    margin-bottom: -1px;
    font-weight: 600;
  }
  .Repo-comments {
    position: relative;
    z-index: -1;
  }
`;

const CommitStyles = styled.div`
  font-size: 14px;
  background: #fff;
  border: 1px solid #c8e1ff;
  color: #6a737d;
  border-radius: 2px;
  padding: 6px 3px 6px 10px;
  line-height: 20px;
  overflow: hidden;

  &.Commit-active-commit {
    position: relative;
    overflow: visible;
    background-color: #fff9ea;
    border: 1px solid #dfd8c2;
    border-radius: 3px;
    color: #4c4a42;
  }

  .Commit-message {
    display: flex;
    justify-content: space-between;
  }
  .Commit-message-text {
  }
  .Commit-message-url {
    color: #0366d6;
    min-width: 120px;
  }
  .Commit-select-button {
    width: 146px;
    margin-right: 4px;

    padding: 3px 10px;
    height: 100%;
    line-height: 20px;
    background-color: #eff3f6;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#fafbfc),
      color-stop(90%, #eff3f6)
    );
    background-image: -webkit-linear-gradient(top, #fafbfc 0%, #eff3f6 90%);
    background-image: -o-linear-gradient(top, #fafbfc 0%, #eff3f6 90%);
    background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%);
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-radius: 3px;
    font-size: 12px;
    font-weight: 600;
    color: #24292e;
  }
`;
