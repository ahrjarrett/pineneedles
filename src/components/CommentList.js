import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import { githubUrl } from "./StudentList";
import CommentCard from "./CommentCard";

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    const { login, repo } = this.props.match.params;
    this.fetchRepoComments(login, repo);
  }

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
    const { data } = await Promise.resolve(promise);
    this.setState({
      comments: data.sort((a, b) =>
        new Date(a.created_at) < new Date(b.created_at) ? 1 : -1
      )
    });
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

  render() {
    const { comments } = this.state;
    const { login, repo, sha } = this.props.match.params;
    const shortSha = sha.slice(0, 7);
    return (
      <CommentListStyles>
        <div className="comment-list-header">
          <div className="comment-list-breadcrumbs">
            <Link
              to={`/students/${login}`}
              className="comment-list-breadcrumbs-login"
            >
              {login}
            </Link>{" "}
            <span className="comment-list-breadcrumbs-divider">/</span>{" "}
            <Link
              to={`/students/${login}/repos/${repo}`}
              className="comment-list-breadcrumbs-repo"
            >
              {repo}
            </Link>{" "}
            <span className="comment-list-breadcrumbs-divider">/</span>
            <Link
              to={`/students/${login}/repos/${repo}/commit/${sha}/comments`}
              className="comment-list-breadcrumbs-commit"
            >
              {shortSha}
            </Link>{" "}
          </div>
          <div className="comment-list-total">
            <h4>
              {comments.length} comments on commit{" "}
              <code className="comment-list-sha">{shortSha}</code>
            </h4>
          </div>
        </div>
        <div className="comment-list">
          {comments.length > 0 &&
            comments.map(c => <CommentCard comment={c} key={c.id} />)}
        </div>
      </CommentListStyles>
    );
  }
}

const CommentListStyles = styled.div`
  .comment-list-breadcrumbs {
    font-size: 26px;
    margin-bottom: 28px;
  }
  .comment-list-breadcrumbs-login,
  .comment-list-breadcrumbs-repo {
    font-weight: 300;
    color: #0366d6;
  }
  .comment-list-breadcrumbs-divider {
    margin: 0 0.25em;
    color: #586069;
  }

  .comment-list-breadcrumbs-commit {
    font-weight: 600;
    color: #0366d6;
  }

  .comment-list-total {
    h4 {
      font-size: 16px;
      font-weight: 600;
    }
  }
  code.comment-list-sha {
    background-color: #f6f8fa;
    color: #24292e;
    border: 1px solid #eaecef;
    border-radius: 0.2em;
    font-size: 90%;
    font-weight: 400;
    padding: 0.2em 0.4em;
  }
`;

const mapStateToProps = state => ({
  token: state.auth.token
});

export default withRouter(connect(mapStateToProps)(CommentList));
