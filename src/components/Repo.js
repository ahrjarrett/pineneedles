import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddComment from "./AddComment";

import { fetchRepo, fetchRepoCommits } from "../redux/actions/github";

class Repo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sha: ""
    };
  }

  componentDidMount() {
    const { repoName, login } = this.props;
    this.props.fetchRepoCommits(login, repoName);
    this.props.fetchRepo(login, repoName);
  }

  updateCommitSha = e => {
    console.log("updating active commit!");
    console.log(e);
  };

  propogateSha = sha => e => {
    console.log("SHA:", sha);
    this.setState({ sha });
  };

  render() {
    const { sha } = this.state;
    const { commits, login, token, repo } = this.props;

    // DELETE:
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
              : "No commits yet"}
          </div>
          <div className="Repo-comments col-sm-3" />
        </div>
      </RepoStyles>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  repo: state.github.repo,
  commits: state.github.commits
});

export default connect(
  mapStateToProps,
  { fetchRepo, fetchRepoCommits }
)(Repo);

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
          <span className="Commit-message-text">{commit.commit.message}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <button className="Commit-select-button" onClick={propogateSha}>
            Comment on {sha.slice(0, 5)}...
          </button>
          <Link
            to={`/students/${repo.owner.login}/repos/${
              repo.name
            }/commit/${sha}/comments`}
            className="Commit-select-button"
            onClick={propogateSha}
          >
            See Comments
          </Link>
        </div>
      </div>

      {activeSha === sha && <AddComment repoName={repo.name} sha={sha} />}
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
    height: 62px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
  .Commit-message-url {
    color: #0366d6;
    min-width: 120px;
  }
  .Commit-select-button {
    width: 152px;
    margin-right: 4px;
    display: flex;
    align-items: center;
    height: 28px;
    &:hover {
      color: #0056b3;
    }

    padding: 3px 10px;
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
